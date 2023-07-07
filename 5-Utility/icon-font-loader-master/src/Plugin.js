'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const webfontsGenerator = require('@vusion/webfonts-generator');
const utils = require('./utils');
const { BasePlugin } = require('base-css-image-loader');
const meta = require('./meta');
const { ucs2 } = require('punycode');

class IconFontPlugin extends BasePlugin {
    constructor(options) {
        options = options || {};
        super();
        Object.assign(this, meta);

        this.options = Object.assign(this.options, {
            // @inherit: output: './',
            // @inherit: filename: '[fontName].[ext]?[hash]',
            // @inherit: publicPath: undefined,
            property: 'icon-font',
            fontName: 'icon-font',
            types: ['ttf', 'eot', 'woff', 'svg'], // @bug: webfonts-generator
            localCSSTemplate: fs.readFileSync(path.resolve(__dirname, 'local.css.hbs'), 'utf8'),
            localCSSSelector: '',
            smartSelector: false, // experimental
            auto: true,
            dataURL: false,
            mergeDuplicates: false,
            startCodepoint: 0xF101,
        }, options);

        this.options.fontOptions = Object.assign({
            fontHeight: 1000,
            descent: 140,
            centerHorizontally: true,
        }, options.fontOptions);

        this.fontFacePath = '';
        this.data = {}; // { [id]: { id, filePath, url } }

        this.pathMap = new Map();
        this.cache = null; // cache for last font
    }
    apply(compiler) {
        this.fontFacePath = path.resolve(__dirname, './fontface.css');
        this.plugin(compiler, 'environment', () => {
            if (this.options.auto)
                this.RUNTIME_MODULES.push(this.fontFacePath);
        });
        this.plugin(compiler, 'watchRun', (compiler, callback) => {
            this.watching = true;
            callback();
        });
        this.plugin(compiler, 'thisCompilation', (compilation, params) => {
            const useLegacy = !('processAssets' in compilation.hooks);

            this.plugin(compilation, 'afterOptimizeChunks', (chunks) => this.afterOptimizeChunks(chunks, compilation));
            this.plugin(compilation, 'optimizeTree', (chunks, modules, callback) => this.optimizeTree(compilation, chunks, modules, callback));
            this.plugin(compilation, 'afterOptimizeTree', (chunks, modules) => {
                this.changeReplaceForAfterOptimizeTree();
                this.replaceInModules(chunks, compilation);
            });
            this.plugin(compilation, useLegacy ? 'optimizeChunkAssets' : 'processAssets', (compilationAssets, callback) => {
                // Assets source is different from module source, so set escapedContent to content.
                if (this.data.src)
                    this.data.src.escapedContent = this.data.src.content;
                this.replaceInCSSAssets(compilation.chunks, compilation);
                callback && callback();
            }, !useLegacy && {
                stage: compilation.PROCESS_ASSETS_STAGE_OPTIMIZE,
            });
        });
        super.apply(compiler);
    }
    afterOptimizeChunks(chunks, compilation) {
        // Reset meta data
        Object.assign(this, meta);

        const startCodepoint = this.options.startCodepoint;
        // When watching, webpack module may be cached, so file list should be kept same as before.
        const keys = Object.keys(this.data);
        !this.watching && keys.sort(); // Make sure same cachebuster in uncertain file loaded order
        const unicodeReg = /_([A-Fa-f0-9]{4})/; // Get specified unicode
        keys.forEach((key, index) => {
            const file = this.data[key];
            let codepoint = startCodepoint + index;
            const unicodeCap = unicodeReg.exec(key);
            let unicodeStr;
            if (unicodeCap) {
                unicodeStr = unicodeCap[1].toUpperCase();
                codepoint = parseInt(`0x${unicodeStr}`);
            } else {
                const unicode = String.fromCharCode(codepoint);
                unicodeStr = ucs2.decode(unicode).map((point) => point.toString(16).toUpperCase()).join('');
            }
            file.codepoint = codepoint;
            file.content = `'\\${unicodeStr}'`;
            file.escapedContent = `\\'\\\\${unicodeStr}'`;
        });
    }
    optimizeTree(compilation, chunks, modules, callback) {
        // If no icons collected, then do not generate fonts.
        if (!this.shouldGenerate)
            return callback();

        let files;
        let md5hash;
        let codepointMap = {};
        try {
            const keys = Object.keys(this.data);
            !this.watching && keys.sort(); // Make sure same cachebuster in uncertain file loaded order
            files = keys.map((key) => this.data[key].filePath);
            const codepoints = keys.map((key) => this.data[key].codepoint);
            const ids = keys.filter((key) => this.data[key].filePath)
                .map((key) => this.data[key].id);
            const result = this.handleSameName(files, codepoints);
            codepointMap = result.codepointMap;
            files = result.files;
            md5hash = crypto.createHash('md5').update(ids.join(',')).digest('hex');
        } catch (e) {
            return callback(e);
        }
        if (!files.length)
            return callback();

        const fontName = this.options.fontName;
        const types = this.options.types;
        const fontOptions = this.options.fontOptions;
        const startCodepoint = this.options.startCodepoint;

        // cache webfontsGenerator result when no change make to svg files
        if (this.cache && this.cache.md5hash === md5hash) {
            this.fontHandler(this.cache.result, compilation);
            callback();
            return;
        }
        this.cache = { md5hash };
        webfontsGenerator(Object.assign({
            files,
            types,
            fontName,
            writeFiles: false,
            dest: 'build', // Required but not used
            startCodepoint,
            codepoints: codepointMap,
        }, fontOptions), (err, result) => {
            if (err)
                return callback(err);
            this.cache.result = result;
            this.fontHandler(result, compilation);
            callback();
        });
    }

    fontHandler(result, compilation) {
        const { webpack = false } = compilation.compiler;
        const { RawSource } = webpack ? webpack.sources : { RawSource: require('webpack-sources').RawSource };

        const {
            fontName, types,
        } = this.options;
        const font = { name: fontName };
        if (this.options.dataURL)
            font.woff = result.woff.toString('base64');
        else {
            types.forEach((type) => {
                const output = this.getOutput({
                    name: fontName,
                    fontName,
                    ext: type,
                    content: result.svg,
                }, compilation);
                font[type] = { url: output.url };

                this.emitAsset(compilation, output.path, new RawSource(result[type]));
            });
        }

        const fontFace = utils.createFontFace(font, this.options.dataURL);
        if (!this.options.auto) {
            // If auto is false, then emit a css file
            this.emitAsset(
                compilation,
                path.join(this.options.output, `${fontName}.css`),
                new RawSource(fontFace.content)
            );
        }

        // Change replace data
        this.fontFace = fontFace;
        this.shouldGenerate = false;
    }

    changeReplaceForAfterOptimizeTree() {
        const fontFace = this.fontFace;
        if (!fontFace)
            return;

        this.data.fontName = {
            content: fontFace.fontName,
            escapedContent: fontFace.fontName,
        };
        this.data.src = {
            content: fontFace.src.join(',\n    '),
            escapedContent: fontFace.src.join(',\\n    '),
        };
        this.REPLACER_RE = /ICON_FONT_LOADER_FONTFACE\(([^)]*)\)/g;
        this.MODULE_MARK = 'isFontFaceModule';
    }
    handleSameName(files, codepoints = []) {
        const names = {};
        const uniqueFiles = [];
        const codepointMap = {};

        const getUniqueName = (name) => {
            let num = 1;
            while (names[`${name}-${num}`])
                num++;
            return `${name}-${num}`;
        };

        files.forEach((file, index) => {
            if (!fs.existsSync(file))
                file = path.resolve(__dirname, 'empty.svg');
            let name = path.basename(file, '.svg');
            if (names[name]) {
                file = fs.createReadStream(file);
                name = getUniqueName(name);
                file.metadata = { name };
            }
            if (codepoints && codepoints.length > index) {
                codepointMap[name] = codepoints[index];
            }
            names[name] = true;
            uniqueFiles.push(file);
        });

        return { files: uniqueFiles, codepointMap };
    }
}

module.exports = IconFontPlugin;
