

const GraphqlStrategy = require('./strategies');
const User = require('../../database/models/user');

exports.init = (passport) => {

  passport.serializeUser((user, done) => {
    done(null, user.id); // serialize user's id into session
  });

  // 从cookie中获取id，然后deserialize，找到那个用户
  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user);
    });
  });


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