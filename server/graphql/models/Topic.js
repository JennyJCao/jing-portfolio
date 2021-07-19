

class Topic {

  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }

  getAllByCategory(forumCategory) {
    // 想要把每条记录里的user的详情查出来，需要用populate('user')
    return this.Model
      .find({forumCategory})
      .populate('user')
      .populate('forumCategory');
  }

  async create(topicData) {
    if (!this.user) {
      throw new Error('You need to authenticate to create a topic!');
    }
    topicData.user = this.user;
    // generate slug
    topicData.slug = "doesn't matter2";
    // this.model.create是数据库的增加操作
    // Model 不要写成 model
    const createdTopic = await this.Model.create(topicData);
    // 返回之前，把user还有forumCategory填充完整
    return this.Model
      .findById(createdTopic._id)
      .populate('user')
      .populate('forumCategory');
  }

}

module.exports = Topic;