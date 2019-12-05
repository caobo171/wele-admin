module.exports = {
    plugins: [
      ['module-resolver', {
        'root': ['./'],
        'alias': {
          '@': './src/',
          '@components': './src/components/',
          '@store': './src/store/',
          '@pages': './src/pages'
        }
      }]
    ],
  };
  