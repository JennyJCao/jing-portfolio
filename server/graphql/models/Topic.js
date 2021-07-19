

class Topic {

  constructor(model) {
    this.Model = model;
  }

  getAllByCategory(forumCategory) {
    // 想要把每条记录里的user的详情查出来，需要用populate('user')
    return this.Model.find({forumCategory}).populate('user').populate('forumCategory');
  }


}

module.exports = Topic;