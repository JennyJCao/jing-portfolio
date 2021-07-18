
const passport = require('passport');

// options = {email, password}
const authenticateUser = (req, options) => {
  return new Promise((resolve, reject) => {
    const done = (error, user) => {
      if (error) {
        return reject(new Error(error));
      }
      if (user) {
        req.login(user, (error) => {
          if (error) {
            return reject(new Error(error));
          }
          return resolve(user);
        })
      } else {
        return reject(new Error('Invalid password of email'));
      }
    }
    // auth function
    const authFn = passport.authenticate('graphql', options, done);
    authFn();
    // return true; 要用promise不能直接return true，否则就不会等到done()，函数直接结束了
  });

}

exports.buildAuthContext = (req) => {
  const auth = {
    authenticate: (options) => authenticateUser(req, options),
    logout: () => req.logout()

  }

  return auth;
}