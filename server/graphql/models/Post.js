
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
      .populate('topic')
      .populate('user')
      .populate('parent');
  }


}

module.exports = Post;