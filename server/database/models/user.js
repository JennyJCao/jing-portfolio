const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  avatar: String,
  email: {
    type: String,
    required: 'Email is required!',
    lowercase: true,
    index: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  name: {
    type: String,
    minlength: [6, 'Minimum length is 6 characters!']
  },
  username: {
    type: String,
    required: true,
    minlength: [6, 'Minimum length is 6 characters!']
  },
  password: {
    type: String,
    minlength: [6, 'Minimum length is 6 characters!'],
    maxlength: [32, 'Maximum length is 32 characters!'],
    required: true
  },
  role: {
    enum: ['guest', 'admin', 'instructor'],
    type: String,
    required: true,
    default: 'guest'
  },
  info: String,
  createAt: {
    type: Date,
    default: Date.now()
  }
})

// 在create用户之前，会走这个回调，在这里可以进行密码加密
// 这里不能使用箭头函数，因为箭头函数this指向不对
userSchema.pre('save', function (next) {
  const user = this;
  // 加密
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      next(err);
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        next(err);
      }
      user.password = hash;
      next();
    });
  });
})

// 创建model: Portfolio
module.exports = mongoose.model('User', userSchema);