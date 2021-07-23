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

  if (process.env.NODE_ENV === 'production') {
    server.set('trust proxy', 1);
    sess.cookie.secure = true;
    sess.cookie.httpOnly = true;
    sess.cookie.sameSite = true;
    sess.cookie.domain = process.env.DOMAIN // .yourdomain.com
  }

  server.use(session(sess));
  server.use(passport.initialize());
  server.use(passport.session()); // 只有执行了这一步，当用户登录之后，ctx.isAuthenticated()才work
}