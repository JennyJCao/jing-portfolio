

const GraphqlStrategy = require('./strategies');
const User = require('../../database/models/user');

exports.init = (passport) => {
  passport.use('graphql', new GraphqlStrategy(({email, password}, done) => {
    User.findOne({email}, (error, user) => {
      if (error) {
        return done(error);
      }
      if (!user) {
        return done(null, false);
      }
      // database/models/user.js  userSchema.methods.validatePassword
      user.validatePassword(password, (error, isMatching) => {
        if (error) {
          return done(error);
        }
        if (!isMatching) {
          return done(null, false);
        }
        return done(null, user);
      })
    });
  }));


}