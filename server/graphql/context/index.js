
const passport = require('passport');

// options = {email, password}
const authenticateUser = (options) => {
  return new Promise((resolve, reject) => {
    console.log("calling authenticateUser");
    const done = (err, user) => {
      // here we will get user if user is authenticated
      // if we will get user here, we can save session to DB
      console.log('calling done of authenticateUser');
      if (err) {
        return reject(new Error(err));
      }
      if (user) {
        return resolve(user);
      }
    }
    // auth function
    const authFn = passport.authenticate('graphql', options, done);
    authFn();
    // return true; 要用promise不能直接return true，否则就不会等到done()，函数直接结束了
  });

}

exports.buildAuthContext = () => {
  const auth = {
    authenticate: (options) => authenticateUser(options)

  }

  return auth;
}