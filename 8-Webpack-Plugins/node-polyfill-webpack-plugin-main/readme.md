# node-polyfill-webpack-plugin

Polyfill Node.js core modules in Webpack.

This module is only needed for [Webpack 5+](https://github.com/webpack/changelog-v5#automatic-nodejs-polyfills-removed).

## Install

```sh
npm install node-polyfill-webpack-plugin
```

## Usage

Add the following to your `webpack.config.js`:

```js
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
	// Other rules...
	plugins: [
		new NodePolyfillPlugin()
	]
};
```

## API

### new NodePolyfillPlugin(options?)

#### options

Type: `object`

`excludeAliases` and `includeAliases` are mutually exclusive.

#### excludeAliases

By default, the modules that were polyfilled in Webpack 4 are mirrored over. However, if you don't want a module like `console` to be polyfilled you can specify alises to be skipped here.

```js
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
	// Other rules...
	plugins: [
		new NodePolyfillPlugin({
			excludeAliases: ['console']
		})
	]
};
```

#### includeAliases

Alternatively, you can choose to only include certain aliases. For example, you can only have `console` polyfilled.

```js
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
	// Other rules...
	plugins: [
		new NodePolyfillPlugin({
			includeAliases: ['console']
		})
	]
};
```

## Aliases

### Globals

- `Buffer`
- `console`
- `process`

### Modules

- `assert`
- `buffer`
- `console`
- `constants`
- `crypto`
- `domain`
- `events`
- `http`
- `https`
- `os`
- `path`
- `punycode`
- `process`
- `querystring`
- `stream`
- `_stream_duplex`
- `_stream_passthrough`
- `_stream_readable`
- `_stream_transform`
- `_stream_writable`
- `string_decoder`
- `sys`
- `timers`
- `tty`
- `url`
- `util`
- `vm`
- `zlib`
