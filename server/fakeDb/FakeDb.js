
const {portfolios} = require('./data');
const Portfolio = require('../database/models/portfolio');


class FakeDb {

  async clean() {
    // 删除所有
    await Portfolio.deleteMany({});
  }

  async addData() {
    await Portfolio.create(portfolios);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

module.exports = new FakeDb();