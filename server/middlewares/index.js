const session = require('express-session');

const config = require('../config/dev');
const passport = require('passport');


exports.init = (server, db) => {

  require('./passport').init(passport);

  // cookie 2 hours
  const sess = {
    name: 'portfolio-session',
    secret: config.SESSION_SECRET,
    cookie: {maxAge: 2 * 60 * 60 * 1000},
    resave: false,
    saveUninitialized: false,
    store: db.initSessionStore()
  }

  server.use(session(sess));

  server.use((req, res, next) => {
    req.helloWorld = () => console.log('HELLO WORLD!!!!');
    next();
  });
}