# webpack-stream [![Build Status](http://img.shields.io/travis/shama/webpack-stream.svg)](https://travis-ci.org/shama/webpack-stream)

Run [webpack](https://github.com/webpack/webpack) as a stream to conveniently integrate with gulp.

[![NPM](https://nodei.co/npm/webpack-stream.png?downloads=true)](https://nodei.co/npm/webpack-stream/)


## Installation
If you have `npm` run the following command in the console `npm install --save-dev webpack-stream`


## Usage

```js
const gulp = require('gulp');
const webpack = require('webpack-stream');
gulp.task('default', function() {
  return gulp.src('src/entry.js')
    .pipe(webpack())
    .pipe(gulp.dest('dist/'));
});
```

The above will compile `src/entry.js` into assets with webpack into `dist/` with the output filename of `[hash].js` (webpack generated hash of the build).

You can pass webpack options in with the first argument, including `watch` which will greatly decrease compilation times:

```js
return gulp.src('src/entry.js')
  .pipe(webpack({
    watch: true,
    module: {
      rules: [
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      ],
    },
  }))
  .pipe(gulp.dest('dist/'));
```

Or just pass in your `webpack.config.js`:

```js
return gulp.src('src/entry.js')
  .pipe(webpack( require('./webpack.config.js') ))
  .pipe(gulp.dest('dist/'));
```

If you would like to use a different version of webpack than the one this plugin uses, pass in an optional 2nd argument:

```js
const gulp = require('gulp');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
gulp.task('default', function() {
  return gulp.src('src/entry.js')
    .pipe(gulpWebpack({}, webpack))
    .pipe(gulp.dest('dist/'));
});
```

Pass in 3rd argument if you want to access the stats outputted from webpack when the compilation is done:


```js
const gulp = require('gulp');
const webpack = require('webpack-stream');
gulp.task('default', function() {
  return gulp.src('src/entry.js')
    .pipe(webpack({
      /* config */
    }, null, function(err, stats) {
      /* Use stats to do more things if needed */
    }))
    .pipe(gulp.dest('dist/'));
});
```

#### Usage with gulp watch

To use gulp `watch`, it's required that you explicitly pass webpack in the 2nd argument for a cached `compiler` instance to be used on subsequent runs.

Please note that gulp `watch` and webpack `watch` are mutually exclusive.

```javascript
const gulp = require('gulp');
const compiler = require('webpack');
const webpack = require('webpack-stream');

gulp.task('build', function() {
  return gulp.src('src/entry.js')
    .pipe(webpack({
      /* config */
    }, compiler, function(err, stats) {
      /* Use stats to do more things if needed */
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['build'], function() {
  gulp.watch(['src/**/*.js'], gulp.series('build'));
});

```

#### Multiple Entry Points

A common request is how to handle multiple entry points. You can continue to pass in an `entry` option in your typical webpack config like so:

```js
const gulp = require('gulp');
const webpack = require('webpack-stream');
gulp.task('default', function() {
  return gulp.src('src/entry.js')
    .pipe(webpack({
      entry: {
        app: 'src/app.js',
        test: 'test/test.js',
      },
      output: {
        filename: '[name].js',
      },
    }))
    .pipe(gulp.dest('dist/'));
});
```

Or pipe files through a stream that names the chunks. A convenient library for this is [vinyl-named](https://github.com/shama/vinyl-named):

```js
const gulp = require('gulp');
const webpack = require('webpack-stream');
const named = require('vinyl-named');
gulp.task('default', function() {
  return gulp.src(['src/app.js', 'test/test.js'])
    .pipe(named())
    .pipe(webpack())
    .pipe(gulp.dest('dist/'));
});
```

The above `named()` stream will add a `.named` property to the vinyl files passing through. The `webpack()` stream will read those as entry points and even group entry points with common names together.

#### Source Maps

Source maps are built into webpack, specify a [devtool](https://webpack.github.io/docs/configuration.html#devtool):

```js
const gulp = require('gulp');
const webpack = require('webpack-stream');
const named = require('vinyl-named');
gulp.task('default', function() {
  return gulp.src(['src/app.js', 'test/test.js'])
    .pipe(named())
    .pipe(webpack({
      devtool: 'source-map'
    }))
    .pipe(gulp.dest('dist/'));
});
```

Now the appropriate `.map` files will be emitted. Or set to `inline-source-map`
to inline the source maps into the files.

If you need further special handling of source maps, such as using with
[gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps) then just pipe
to a stream and handle the source map files emitted by webpack:

```js
const gulp = require('gulp');
const webpack = require('webpack-stream');
const named = require('vinyl-named');
const through = require('through2');
const sourcemaps = require('gulp-sourcemaps');
gulp.task('default', function() {
  return gulp.src(['src/app.js', 'test/test.js'])
    .pipe(named())
    .pipe(webpack({
      devtool: 'source-map'
    }))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(through.obj(function (file, enc, cb) {
      // Dont pipe through any source map files as it will be handled
      // by gulp-sourcemaps
      const isSourceMap = /\.map$/.test(file.path);
      if (!isSourceMap) this.push(file);
      cb();
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/'));
});
```

#### Multi-compiler support

Multiple compilers are supported, but instead of passing the webpack configuration directly, you have to wrap it in an object under the key 'config'.

```js
const gulp = require('gulp');
const webpack = require('webpack-stream');
gulp.task('default', function() {
  return gulp.src('src/entry.js')
    .pipe(webpack({
      config : require('./webpack.config.js')
    }))
    .pipe(gulp.dest('dist/'));
});
```

## Release History
* Please check the [commit log](https://github.com/shama/webpack-stream/commits/master) in the future for release history.
* 4.0.0 - Update `webpack` to `^3.4.1`. Update `memory-fs` and `vinyl` dependencies. Emit `compilation-error` instead of `error` when watching (@jeroennoten). Fix error when compiler throws an error (@renminghao). Fix error when stats is undefined (@Simek).
* 3.2.0 - Ability to use multiple compilers (@saschagehlich).
* 3.1.0 - Better error output (@hi-q).
* 3.0.1 - Fix fonts being passed through streams (@mattlewis92).
* 3.0.0 - Remove special handling of source maps. Update dependencies.
* 2.3.0 - Emit stats.compilation.errors as `error` (@JakeChampion).
* 2.2.0 - Add support for source maps (@OliverJAsh).
* 2.1.0 - Avoid modifying options by reference (@shinuza). Replace log with correct package name (@vinnymac).
* 2.0.0 - Rename to webpack-stream and now it's totally not a gulp plugin.
* 1.5.0 - Update webpack to 1.9.x (@nmccready). Update other dependencies.
* 1.4.0 - Update webpack to 1.8.x (@Zolmeister).
* 1.3.2 - Fix another place with ? in name (@raphaelluchini).
* 1.3.1 - Fix for paths with ? in their name (@raphaelluchini).
* 1.3.0 - Updating to webpack >= 1.7.
* 1.2.0 - Updating to webpack >= 1.5, vinyl >= 0.4, memory-fs >= 0.2.
* 1.1.2 - Fixes to default stats for logging (@mdreizin).
* 1.1.1 - Add additional stats to default logging (@mdreizin).
* 1.1.0 - Exposes internal webpack if asked via `require('webpack-stream').webpack`
* 1.0.0 - Support named chunks pipe'd in for multiple entry points.
* 0.4.1 - Fixed regression for multiple entry point support.
* 0.4.0 - Display an error message if there are no input files (@3onyc). Add message on why task is not finishing, Add ability to track compilation progress, Add ability to configure stats output via options (@kompot). Bump webpack version (@koistya).
* 0.3.0 - Update deps (@kompot). Fixes to determining entry (@btipling and @abergs).
* 0.2.0 - Support for `watch` mode (@ampedandwired).
* 0.1.0 - Initial release

## License
Copyright (c) 2021 Kyle Robinson Young
Licensed under the MIT license.
