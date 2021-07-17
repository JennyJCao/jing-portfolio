

const GraphqlStrategy = require('./strategies');

exports.init = (passport) => {
  passport.use('graphql', new GraphqlStrategy((options, done) => {
    console.log('calling verify function of strategy');
    // 1. find user in DB and if user exists, verify user password
    // if user is verified, call done function
    if (true) {
      // first param of done is reserved for "error", second one for "user"
      done();
    }
  }));


}