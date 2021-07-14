
class User {
  constructor(model) {
    this.Model = model;
  }

  signIn() {
    return 'signing in...';
  }

  signUp() {
    return 'signing up...';
  }

  signOut() {
    return 'sign out...';
  }

}


module.exports = User;