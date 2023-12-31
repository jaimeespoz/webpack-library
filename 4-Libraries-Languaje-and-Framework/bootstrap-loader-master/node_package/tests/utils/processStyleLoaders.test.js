import test from 'tape';
import processStyleLoaders from '../../../src/utils/processStyleLoaders';

test('processStyleLoaders throws an error if given parameter is not an array', assert => {
  assert.throws(() => {
    processStyleLoaders({ loaders: 3 });
  }, /Specify your loaders as an array/);
  assert.end();
});

test('processStyleLoaders works as expected', assert => {
  assert.deepEquals(
    processStyleLoaders({
      loaders: ['sass?sourceMap', 'resolve-url'],
    }),
    ['sass-loader?sourceMap', 'resolve-url-loader'],
  );

  assert.deepEquals(
    processStyleLoaders({
      loaders: ['other', 'sass'],
    }),
    ['other', 'resolve-url-loader', 'sass-loader'],
  );
  assert.deepEquals(
    processStyleLoaders({
      loaders: ['other', 'sass'],
      disableSassSourceMap: true,
    }),
    ['other', 'resolve-url-loader', 'sass-loader'],
  );
  assert.deepEquals(
    processStyleLoaders({
      loaders: ['other', 'sass'],
      disableResolveUrlLoader: true,
    }),
    ['other', 'sass-loader'],
  );
  assert.deepEquals(
    processStyleLoaders({
      loaders: ['other', 'sass'],
      disableSassSourceMap: true,
      disableResolveUrlLoader: true,
    }),
    ['other', 'sass-loader'],
  );

  assert.deepEquals(
    processStyleLoaders({
      loaders: ['other', 'sass?other'],
    }),
    ['other', 'resolve-url-loader', 'sass-loader?other'],
  );
  assert.deepEquals(
    processStyleLoaders({
      loaders: ['other', 'sass-loader?other'],
      disableSassSourceMap: true,
    }),
    ['other', 'resolve-url-loader', 'sass-loader?other'],
  );
  assert.deepEquals(
    processStyleLoaders({
      loaders: ['other', 'sass?other'],
      disableResolveUrlLoader: true,
    }),
    ['other', 'sass-loader?other'],
  );
  assert.deepEquals(
    processStyleLoaders({
      loaders: ['other', 'sass?other'],
      disableSassSourceMap: true,
      disableResolveUrlLoader: true,
    }),
    ['other', 'sass-loader?other'],
  );

  assert.deepEquals(
    processStyleLoaders({
      loaders: ['sass?sourceMap'],
    }),
    ['resolve-url-loader', 'sass-loader?sourceMap'],
  );

  assert.deepEquals(
    processStyleLoaders({
      loaders: ['sass', 'sass-resources'],
    }),
    ['resolve-url-loader', 'sass-loader', 'sass-resources'],
  );
  assert.deepEquals(
    processStyleLoaders({
      loaders: ['sass-loader', 'sass-resources-loader'],
    }),
    ['resolve-url-loader', 'sass-loader', 'sass-resources-loader'],
  );
  assert.end();
});
