
const slugify = require('slugify');
const uniqueSlug = require('unique-slug');


class Topic {

  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }

  async getRandoms(limit) {
    const count = await this.Model.countDocuments();
    let randomIndex;

    if (limit > count) {
      randomIndex = 0
    } else {
      randomIndex = count - limit;
    }

    const random = Math.round(Math.random() * randomIndex);
    return this.Model
      .find({})
      .populate('user')
      .skip(random)
      .limit(limit);
  }

  getAllByCategory(forumCategory) {
    // 想要把每条记录里的user的详情查出来，需要用populate('user')
    return this.Model
      .find({forumCategory})
      .populate('user')
      .populate('forumCategory');
  }

  async _create(data) {
    // this.model.create是数据库的增加操作
    // Model 不要写成 model
    const createdTopic = await this.Model.create(data);
    // 返回之前，把user还有forumCategory填充完整
    return this.Model
      .findById(createdTopic._id)
      .populate('user')
      .populate('forumCategory');
  }

  async create(topicData) {
    if (!this.user) {
      throw new Error('You need to authenticate to create a topic!');
    }
    topicData.user = this.user;
    // generate slug
    topicData.slug = slugify(topicData.title, {
      replacement: '-',
      remove: undefined,
      lower: true,
      strict: false
    });
    let topic;
    try {
      topic = await this._create(topicData);
      return topic;
    } catch (e) {
      if (e.code === 11000 && e.keyPattern && e.keyPattern.slug) {
        // duplicate slug  随机生成后缀
        topicData.slug += `-${uniqueSlug()}`;
        topic = await this._create(topicData);
        return topic;
      }
      return null;
    }
  }

  getBySlug(slug) {
    return this.Model
      .findOne({slug})
      .populate('user')
      .populate('forumCategory');
  }

}

module.exports = Topic;