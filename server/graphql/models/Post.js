const uniqueSlug = require('unique-slug');
const moment = require('moment');

class Post {

  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }

  getAllByTopic(topic) {
    // 这里可以传入topic的id，也可以传入topic全部，mongoose will resolve it
    // 也可以用fullSlug排序  .sort('fullSlug')
    return this.Model
      .find({topic})
      .sort('createdAt')
      .populate('topic')
      .populate('user')
      .populate({path: 'parent', populate: 'user'});// 填充parent中的user字段
  }

  async create(post) {
    if (!this.user) {
      throw new Error('You must be signed in to create a post');
    }
    post.user = this.user;

    const createAt = moment().toISOString(); // now
    const slugPart = uniqueSlug();
    const fullSlugPart = createAt + ':' + slugPart;

    if (post.parent) {
      const parent = await this.Model.findById(post.parent);
      post.slug = parent.slug + '/' + slugPart;
      post.fullSlug = parent.fullSlug + '/' + fullSlugPart;
    } else {
      post.slug = slugPart;
      post.fullSlug = fullSlugPart;
    }

    const createdPost = await this.Model.create(post);
    return this.Model
      .findById(createdPost._id)
      .populate('topic')
      .populate('user')
      .populate({path: 'parent', populate: 'user'});
  }


}

module.exports = Post;