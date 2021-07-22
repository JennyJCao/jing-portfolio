
const uniqueSlug = require('unique-slug');


class Post {

  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }

  getAllByTopic(topic) {
    // 这里可以传入topic的id，也可以传入topic全部，mongoose will resolve it
    return this.Model
      .find({topic})
      .sort('createdAt')
      .populate('topic')
      .populate('user')
      .populate({path: 'parent', populate: 'user'});// 填充parent中的user字段
  }


}

module.exports = Post;