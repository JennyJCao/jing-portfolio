// populate database: 填充数据库

const mongoose = require('mongoose');
const config = require('../config/dev');
const fakeDb = require('./FakeDb');

mongoose.connect(config.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  async () => {
    console.log('starting populating DB...');
    await fakeDb.populate();
    await mongoose.connection.close();
    console.log('DB has been populated');
  });

