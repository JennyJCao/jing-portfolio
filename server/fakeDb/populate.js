// populate database: 填充数据库

const mongoose = require('mongoose');
const config = require('../config/dev');
const fakeDb = require('./FakeDb');

mongoose.connect(config.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log('populating DB...');
    console.log('connect to DB');
  });

