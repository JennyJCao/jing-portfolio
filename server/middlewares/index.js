const session = require('express-session');

const config = require('../config');
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
  server.use(passport.initialize());
  server.use(passport.session()); // 只有执行了这一步，当用户登录之后，ctx.isAuthenticated()才work
}