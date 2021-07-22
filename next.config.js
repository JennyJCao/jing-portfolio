

const path = require('path');

const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  webpack: config => {
    // 将项目路径映射为@，起了个别名，是个绝对路径
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
  env: {
    BASE_URL: dev ? 'http://localhost:3000/graphql' : 'https://jing-portfolio.herokuapp.com/graphql'
  }
}
