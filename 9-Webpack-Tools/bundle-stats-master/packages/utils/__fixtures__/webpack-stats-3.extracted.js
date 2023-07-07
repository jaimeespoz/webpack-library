module.exports = {
  builtAt: 1546300800000,
  hash: 'abcd1234',
  assets: [
    {
      name: 'main.a1b2c3d.css',
      size: 10000,
    },
    {
      name: 'main.a2b3c4d.js',
      size: 50000,
    },
    {
      name: 'logo.a3b4c5d.png',
      size: 1000,
    },
    {
      name: 'index.html',
      size: 2000,
    },
  ],
  chunks: [
    {
      entry: true,
      id: 1,
      initial: true,
      files: ['main.a1b2c3d.css', 'main.a2b3c4d.js'],
      names: ['main'],
    },
  ],
  modules: [
    {
      chunks: [1],
      name: 'module-a',
      size: 1000,
    },
    {
      chunks: [1],
      name: './module-b + 3 concatenated modules',
      size: 2000,
      modules: [
        {
          name: './module-b',
          size: 500,
        },
        {
          name: './module-b-1',
          size: 400,
        },
        {
          name: './module-b-c.css',
          size: 1000,
        },
        {
          name: './module-b-c.js',
          size: 100,
        },
      ],
    },
    {
      chunks: [2],
      name: './module-c + 3 concatenated modules',
      size: 2000,
      modules: [
        {
          name: './module-c',
          size: 500,
        },
        {
          name: './module-c-1',
          size: 400,
        },
        {
          name: './module-b-c.css',
          size: 1000,
        },
        {
          name: './module-b-c.js',
          size: 100,
        },
      ],
    },
    {
      chunks: [1],
      name: 'node_modules/package-a/index.js',
      size: 1000,
    },
    {
      chunks: [1],
      name: 'node_modules/package-a/node_modules/package-c/index.js',
      size: 1000,
    },
    {
      chunks: [1],
      name: 'node_modules/package-b/index.js',
      size: 1000,
    },
    {
      chunks: [1],
      name: 'node_modules/package-c/index.js',
      size: 1000,
    },
    {
      chunks: [1, 2],
      name: './module-b-c.css',
      size: 500,
    },
  ],
};
