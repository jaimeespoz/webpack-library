# icon-font-loader

- [中文说明](README.zh-CN.md)

A webpack loader to convert svgs into font icons in CSS.

[![CircleCI][circleci-img]][circleci-url]
[![NPM Version][npm-img]][npm-url]
[![Dependencies][david-img]][david-url]
[![NPM Download][download-img]][download-url]

[circleci-img]: https://img.shields.io/circleci/project/github/vusion/icon-font-loader.svg?style=flat-square
[circleci-url]: https://circleci.com/gh/vusion/icon-font-loader
[npm-img]: http://img.shields.io/npm/v/icon-font-loader.svg?style=flat-square
[npm-url]: http://npmjs.org/package/icon-font-loader
[david-img]: http://img.shields.io/david/vusion/icon-font-loader.svg?style=flat-square
[david-url]: https://david-dm.org/vusion/icon-font-loader
[download-img]: https://img.shields.io/npm/dm/icon-font-loader.svg?style=flat-square
[download-url]: https://npmjs.org/package/icon-font-loader

## Example

Import svg file with a custom property called `icon-font` by default where you want to use icon font in CSS:

``` css
.select:after {
    icon-font: url('../icons/arrow-down.svg');
    /* icon-font: url('../icons/arrow-down.svg') '\ff12'; */ /* Specify content unicode */
    color: #666;
}
```

Then `icon-font-loader` will generate corresponding css so web browsers can recognize.

``` css
.select:after {
    font-family: 'icon-font';
    font-style: normal;
    font-weight: normal;
    ...
    content: '\f106';
    /* content: '\ff12'; */ /* Specify content unicode */
    color: #666;
}
```

After packing all these imports, the loader will create font files (eot,svg,ttf,woff), and insert a `<style>` tag into the `<head>` automatically or emit a CSS file containing `@font-face`.

``` css
@font-face {
    font-family: "icon-font";
    src: url("icon-font.eot?4063944d4c3fb8fa7bf4c19ad0f59965?#iefix") format("embedded-opentype"),
         url("icon-font.woff?4063944d4c3fb8fa7bf4c19ad0f59965") format("woff"),
         url("icon-font.ttf?4063944d4c3fb8fa7bf4c19ad0f59965") format("truetype"),
         url("icon-font.svg?4063944d4c3fb8fa7bf4c19ad0f59965#icon-font") format("svg");
}
```

Well, if `dataURL` option enabled, the result is:

``` css
@font-face {
	font-family: "icon-font";
	src:url("data:application/x-font-woff;base64,d09GRgABAAAAAAUkAAsAAAAACQgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAHcAAAC4Ifsmu09TLzIAAAGAAAAAPQAAAFZWTEunY21hcAAAAcAAAADxAAACuqtTRqJnbHlmAAACtAAAAEIAAABwWoXqgmhlYBewAAA=") format("woff");
}
```

## Features

Our loader works in a way different to others:

- CSS only. You can override existing style like this:
    ```
    .select:after {
        icon-font: url('../icons/arrow-down.svg');
        color: #666;
    }

    .select.up:after {
        icon-font: url('../icons/arrow-up.svg');
    }
    ```
- Pseudo elements(`before` or `after`) only. We treat these icon fonts as some certain characters under one font-family by using their property `content`.
- Merge duplicated svgs. We will merge those same svgs into only one to keep slim even they lie in different places in your project.

## Install

``` shell
npm install --save-dev icon-font-loader
```

## Config

You must import plugin below in webpack in addition to adding custom properties in CSS.

```javascript
const IconFontPlugin = require('icon-font-loader').Plugin;

module.exports = {
    ...
    module: {
        rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader', 'icon-font-loader'] }],
    },
    plugins: [new IconFontPlugin()],
};
```

### Loader options

None.

### Plugin options

#### fontName

Name of font family and font files.

- Type: `string`
- Default: `'icon-font'`

#### filename

Output filename format like output.filename of Webpack. The following tokens will be replaced:

- `[ext]` the extension of the resource
- `[name]` the font name
- `[fontName]` the font name, alias of `[name]`
- `[hash]` the hash of svg file (Buffer) (by default it's the hex digest of the md5 hash, and all file will use hash of the svg file)
- `[<hashType>:hash:<digestType>:<length>]` optionally one can configure
    - other `hashType`s, i. e. `sha1`, `md5`, `sha256`, `sha512`
    - other `digestType`s, i. e. `hex`, `base26`, `base32`, `base36`, `base49`, `base52`, `base58`, `base62`, `base64`
    - and `length` the length in chars


- Type: `string`
- Default: `'[name].[ext]?[hash]'`

#### output

Output path of emitted font and css files, relative to webpack output path. **Must be a relative path.**

- Type: `string`
- Default: `'./'`

#### publicPath

Font public path in css url, same as webpack output.publicPath. This option is for overriding it.

- Type: `string`
- Default: `''`

#### localCSSTemplate

Template of virtual property transformed local CSS. It accepts template content instead of a template file path。

If set empty, local CSS won't be generated.

- Type: `string`
- Default: [content of global.css.hbs](https://github.com/vusion/icon-font-loader/blob/master/src/global.css.hbs)

For example, this template generate content inside the following rule:

``` css
.icon-1::before, .icon-2::before .icon-3::before {
    font-family: '{{ fontName }}';
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-decoration: inherit;
    text-rendering: optimizeLegibility;
    text-transform: none;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
}
```

#### localCSSSelector

Font selector of local CSS defaults to selectors concatenation of all icons in a file.

If set this option, selector will be specified as the value.

- Type: `string`
- Default: `''`

For example, if set this option `'.my-icon'`, local CSS will be like this:

``` css
.my-icon {
    font-family: '{{ fontName }}';
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-decoration: inherit;
    text-rendering: optimizeLegibility;
    text-transform: none;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
}
```

#### property

Custom CSS property name.

- Type: `string`
- Default: `'icon-font'`

#### auto

Whether to insert @font-face css in each chunks automatically, or emit a separated css file.

- Type: `boolean`
- Default: `true`

#### dataURL

If true, fonts will be converted into data base64 format embedded in css, instead of emitted as font files.

It's recommanded if there are not many icons because font files need extra requests.

- Type: `boolean`
- Default: `false`

#### startCodepoint

Starting codepoint. Defaults to beginning of unicode private area.

- Type: `number`
- Default: `0xF101`

#### fontOptions

Options that are passed directly to
[svgicons2svgfont](https://github.com/nfroidure/svgicons2svgfont).

The `descent` option is set by default so that for most icons no extra `vertical-align` style needs to be added. It's a best practice.

- Type: `Object`
- Default:
  ``` js
  {
    fontHeight: 1000,
    descent: 140,
    centerHorizontally: true,
  }
  ```

#### entries

Specify the entry that needs to be automatically inserted.
If not specified or an empty array, styles will be inserted for all entries

- Type: `Array`
- Default: `undefined`

## Changelog

See [Releases](https://github.com/vusion/icon-font-loader/releases)

## Contributing

See [Contributing Guide](https://github.com/vusion/DOCUMENTATION/issues/8)

## License

[MIT](LICENSE)

