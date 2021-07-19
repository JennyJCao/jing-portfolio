
const {portfolios, users, forumCategories} = require('./data');
const Portfolio = require('../database/models/portfolio');
const User = require('../database/models/user');
const ForumCategory = require('../database/models/forumCategory');


class FakeDb {

  async clean() {
    // 删除所有
    await User.deleteMany({});
    await Portfolio.deleteMany({});
    await ForumCategory.deleteMany({});
  }

  async addData() {
    await User.create(users);
    await Portfolio.create(portfolios);
    await ForumCategory.create(forumCategories);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

module.exports = new FakeDb();