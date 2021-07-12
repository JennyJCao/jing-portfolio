

const path = require('path');

module.exports = {
  webpack: config => {
    // 将项目路径映射为@，起了个别名，是个绝对路径
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  }
}
