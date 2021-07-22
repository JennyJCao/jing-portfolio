



class BaseModel {
  constructor(model, user = null) {
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
    // 定制不同的populate，用箭头函数
    // return this.Model
    //   .find({})
    //   .populate('user')
    //   .skip(random)
    //   .limit(limit);
    return () => this.Model.find({}).skip(random).limit(limit);
  }

}

module.exports = BaseModel;