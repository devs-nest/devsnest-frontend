const path = require('path');
module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    // if you are adding a alias here, also add this in tsconfig.paths.json
    alias: {
      ...config.alias,
      '@components': path.resolve(__dirname, 'src/romponents'),
    },
  };
  return config;
};
