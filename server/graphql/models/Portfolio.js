class Portfolio {

  constructor(model, user) {
    // model是 mongoose model，把mongoose model parse进来，似乎不区分类和对象
    // this.Model === Portfolio
    this.Model = model;
    this.user = user;
  }

  getAll() {
    return this.Model.find({});
  }

  getById(id) {
    return this.Model.findById(id);
  }

  create(data) {
    if (!this.user) {
      throw new Error('Not authorized!!!')
    }
    data.user = this.user;
    return this.Model.create(data);
  }

  findAndUpdate(id, data) {
    return this.Model.findOneAndUpdate({_id: id}, data, {new: true});
  }

  findAndDelete(id) {
    return this.Model.findOneAndRemove({_id: id})
  }
}

module.exports = Portfolio;