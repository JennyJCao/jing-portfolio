class Portfolio {

  constructor(model, user) {
    // model是 mongoose model，把mongoose model parse进来，似乎不区分类和对象
    // this.Model === Portfolio
    this.Model = model;
    this.user = user;
    this.writeRights = ['instructor', 'admin'];
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

  getAll() {
    return this.Model.find({});
  }

  getAllByUser() {
    return this.Model.find({user: this.user._id}).sort({startDate: 'desc'});
  }

  getById(id) {
    return this.Model.findById(id);
  }

  create(data) {
    if (!this.user || !this.writeRights.includes(this.user.role)) {
      throw new Error('Not Authorized!!!')
    }
    data.user = this.user;
    return this.Model.create(data);
  }

  findAndUpdate(id, data) {
    return this.Model.findOneAndUpdate({_id: id}, data, {new: true, runValidators: true});
  }

  findAndDelete(id) {
    return this.Model.findOneAndRemove({_id: id})
  }
}

module.exports = Portfolio;