'use strict';

const {join} = require('path');
const outdent = require('outdent');
const compose = require('compose-function');
const {test, layer, fs, env, cwd} = require('test-my-cli');

const {trim} = require('../lib/util');
const {rebaseToCache} = require('../lib/higher-order');
const {all, testDefault, testDebug, testRemoveCR} = require('./common/test');
const {
  buildDevNormal, buildDevNoUrl, buildProdNormal, buildProdNoUrl, buildProdNoDevtool
} = require('./common/exec');
const {assertCssAndSourceMapContent} = require('./common/assert');
const {assertCssContent} = require('../lib/assert');
const {
  assertWebpackOk, assertWebpackNotOk, assertNoErrors, assertNoMessages, assertStdout,
  assertCssSourceMapComment, assertCssFile, assertSourceMapFile
} = require('../lib/assert');

const assertDebugMessages = assertStdout('debug')(1)`
  ^resolve-url-loader:[^:]+:[ ]*${'img.jpg'}
  [ ]+${'./src'} --> ${'./src/img.jpg'}
  [ ]+FOUND$
  `;

// Allow 1-4 errors
//  - known-issue in extract-text-plugin, failed loaders will rerun webpack>=2
//  - webpack may repeat errors with a header line taken from the parent loader
const assertCssError = assertStdout('error')([1, 4])`
  ^[ ]*ERROR[^\n]*
  ([^\n]+\n){0,2}[^\n]*resolve-url-loader:[ ]*error processing CSS
  [ ]+source-map information is not available at url\(\) declaration \(found orphan CR, try removeCR option\)
  `;

module.exports = test(
  'orphan-carriage-return',
  layer('orphan-carriage-return')(
    cwd('.'),
    fs({
      'package.json': rebaseToCache('package.json'),
      'webpack.config.js': rebaseToCache('webpack.config.js'),
      'node_modules': rebaseToCache('node_modules'),
      // NOTE - the CR in the calc() statement induce an offset before the url() statement is hit
      'src/index.scss': outdent`
        .some-class-name {
          font-size: calc(${'\r'}
            (${'\r'}1px${'\r'})${'\r'}
          );
        }
        
        .another-class-name {
          background-image: url('img.jpg');
        }
        `,
      'src/img.jpg': require.resolve('./assets/blank.jpg'),
    }),
    env({
      ENTRY: join('src', 'index.scss')
    }),
    testRemoveCR(false)(
      // IMPORTANT - this test no longer reproduces the orphan-CR problem, is it fixed in SASS?
      testDefault(
        all(buildDevNormal, buildProdNormal, buildDevNoUrl, buildProdNoUrl)(
          assertWebpackOk, // assertWebpackNotOk
          assertNoErrors // assertCssError
        )
      )
    ),
    testRemoveCR(true)(
      testDebug(
        buildDevNormal(
          assertWebpackOk,
          assertNoErrors,
          assertDebugMessages,
          assertCssSourceMapComment(true),
          compose(assertCssContent, outdent)`
            .some-class-name {
              font-size: calc(  ( 1px )); }
            
            .another-class-name {
              background-image: url(9eb57a84abbf8abc636d0faa71f9a800.jpg); }
            `
        ),
        buildDevNoUrl(
          assertWebpackOk,
          assertNoErrors,
          assertDebugMessages,
          assertCssSourceMapComment(true),
          compose(
            assertCssAndSourceMapContent(),
            outdent
          )`
            ./src/index.scss                                                                                   
            ---------------------------------------------------------------------------------------------------
            1:01 .some-class-name {⏎                          1:01 .some-class-name {⏎                         
                   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░        ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
            2:03 ░░font-size: calc(⏎                          2:03 ░░font-size: calc(  ( 1px ))░░░░░░░░░░░░░░░░
                     (⇦1px⇦)⏎                                      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                   )░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
            4:04 ░░░;⏎                                        2:29 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░; }⏎            
                 }⏎                                                ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
            7:01 .another-class-name {⏎                       4:01 .another-class-name {⏎                      
                   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░        ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
            8:03 ░░background-image: url('img.jpg')░░░░░░░░░░ 5:03 ░░background-image: url("./img.jpg")░░░░░░░░
            8:35 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░;⏎         5:37 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░; }⏎    
                 }░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░      ⏎                                           
                 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░      ⏎                                           
                 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░      /*# sourceMappingURL=main.□□□□□□□□□□□□□□□□□□
                 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░      □□.css.map*/░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
            `
        ),
        buildProdNormal(
          assertWebpackOk,
          assertNoErrors,
          assertDebugMessages,
          assertCssSourceMapComment(false),
          compose(assertCssContent, trim)`
            .some-class-name{font-size:1px}.another-class-name{background-image:
            url(9eb57a84abbf8abc636d0faa71f9a800.jpg)}
            `
        ),
        buildProdNoUrl(
          assertWebpackOk,
          assertNoErrors,
          assertDebugMessages,
          assertCssSourceMapComment(false),
          compose(
            assertCssAndSourceMapContent(),
            outdent
          )`
            ./src/index.scss                                                                                   
            ---------------------------------------------------------------------------------------------------
            1:01 .some-class-name {⏎                          1:01 .some-class-name{░░░░░░░░░░░░░░░░░░░░░░░░░░░
                   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
            2:03 ░░font-size: calc(⏎                          1:18 ░░░░░░░░░░░░░░░░░font-size:1px░░░░░░░░░░░░░░
                     (⇦1px⇦)⏎                                      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                   )░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
            4:04 ░░░;⏎                                        1:31 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░}░░░░░░░░░░░░░
                 }░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
            5:02 ░⏎                                           1:32 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░.another-clas
                 ⏎                                                 s-name{░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                 .another-class-name {⏎                            ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
            8:03 ░░background-image: url('img.jpg')░░░░░░░░░░ 1:52 ░░░░░░░background-image:url(img.jpg)░░░░░░░░
            8:35 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░;⏎         1:81 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░}░░░░░░░
                 }░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
            `
        ),
        buildProdNoDevtool(
          assertWebpackOk,
          assertNoErrors,
          assertDebugMessages,
          assertCssFile(true),
          assertCssSourceMapComment(false),
          assertSourceMapFile(false)
        )
      ),
      // ensure build passes but don't bother with detailed assertions
      // ensure no debug messages in normal mode
      testDefault(
        all(buildDevNormal, buildDevNoUrl, buildProdNormal, buildProdNoUrl, buildProdNoDevtool)(
          assertWebpackOk,
          assertNoErrors,
          assertNoMessages
        )
      )
    )
  )
);
