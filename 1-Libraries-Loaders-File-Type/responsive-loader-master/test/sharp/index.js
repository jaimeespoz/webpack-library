test('Works with the cache', () => {
  const output = require('../cat-1000.jpg?size=501,cacheDirectory')
  expect(output).toMatchSnapshot()
})

test('creates jpeg extension', () => {
  const output = require('../cat-1000copy.jpeg?size=439')
  expect(output).toMatchSnapshot()
})

test('png to avif', () => {
  const output = require('../cat-transparent.png?format=avif&size=777')
  expect(output).toMatchSnapshot()
})

test('png to avif', () => {
  const output = require('../cat-1000.jpg?format=avif')
  expect(output).toMatchSnapshot()
})

test('preserves rotation', () => {
  const single = require('../cat-rotated-1000.jpg?size=499')
  expect(single).toMatchSnapshot()
})

test('rotates 90', () => {
  const single = require('../cat-1000.jpg?size=599&rotate=90')
  expect(single).toMatchSnapshot()
})

test('progressive image', () => {
  const multi = require('../cat-1000.jpg?sizes[]=760&sizes[]=960&progressive=true')
  expect(multi).toMatchSnapshot()
})

test('multiple sizes', () => {
  const multi = require('../cat-1000.jpg?sizes[]=500&sizes[]=2000')
  expect(multi).toMatchSnapshot()
  expect(multi.toString()).toBe(multi.src)
})

test('parses json notation', () => {
  const multi = require('../cat-1000.jpg?{sizes:[50,100,200], format: "webp"}')
  expect(multi).toMatchSnapshot()
})

test('single size', () => {
  const single = require('../cat-1000.jpg?size=500')
  expect(single).toMatchSnapshot()
})

test('with size defined in webpack.config.js', () => {
  const multi = require('../cat-1000.jpg')
  expect(multi).toMatchSnapshot()
})

test('disable', () => {
  const multi = require('../cat-1000.jpg?disable')
  expect(multi).toMatchSnapshot()
})

test('output should be relative to context', () => {
  const multi = require('../cat-1000.jpg?name=[path][hash]-[width]x[height].[ext]&context=./')
  expect(multi).toMatchSnapshot()
})

test('hash lenght output should be relative to context', () => {
  const multi = require('../cat-1000.jpg?name=[path][contenthash:8]-[width].[ext]&context=./')
  expect(multi).toMatchSnapshot()
})

test('output should be in outputPath dir', () => {
  const multi = require('../cat-1000.jpg?outputPath=img/')
  expect(multi).toMatchSnapshot()
})

test('public path should replace global publicPath', () => {
  const multi = require('../cat-1000.jpg?outputPath=img/&publicPath=public/')
  expect(multi).toMatchSnapshot()
})

test('with placeholder image', () => {
  const output = require('../cat-1000.jpg?placeholder=true')
  expect(output).toMatchSnapshot()
})
test('with placeholder image on image with size', () => {
  const output = require('../cat-1000.jpg?size=400&placeholder=true')
  expect(output).toMatchSnapshot()
})

test('output first resized image height & width', () => {
  const output = require('../cat-1000.jpg?size=500')
  expect(output).toMatchSnapshot()
})

test('png', () => {
  const output = require('../cat-transparent.png')
  expect(output).toMatchSnapshot()
})

test('png to jpeg with background color', () => {
  const output = require('../cat-transparent.png?background=%23FF0000&format=jpg')
  expect(output).toMatchSnapshot()
})

test('with min and max sizes', () => {
  const output = require('../cat-1000.jpg?min=600&max=800&steps=3')
  expect(output).toMatchSnapshot()
})

test('with min and max sizes, and default steps', () => {
  const output = require('../cat-1000.jpg?min=500&max=1000')
  expect(output).toMatchSnapshot()
})

test('with min and max sizes options', () => {
  const output = require('../cat-1000.jpg?minmax')
  expect(output).toMatchSnapshot()
})

test('override min and max with sizes', () => {
  const output = require('../cat-1000.jpg?minmax&sizes[]=100&sizes[]=200')
  expect(output).toMatchSnapshot()
})

test('override min and max with size', () => {
  const output = require('../cat-1000.jpg?minmax&size=100')
  expect(output).toMatchSnapshot()
})

test('jpg to webp', () => {
  const output = require('../cat-1000.jpg?format=webp')
  expect(output).toMatchSnapshot()
})

test('png to webp with transparent background', () => {
  const output = require('../cat-transparent.png?format=webp')
  expect(output).toMatchSnapshot()
})

test("doesn't emit file", () => {
  const multi = require('../cat-1000.jpg?emitFile=false&sizes[]=250')
  expect(multi).toMatchSnapshot()
})
