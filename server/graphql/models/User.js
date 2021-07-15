
class User {
  constructor(model) {
    this.Model = model;
  }

  signUp(signUpData) {
    if (signUpData.password !== signUpData.passwordConfirmation) {
      throw new Error('Password must be the same as confirmation password!');
    }
    // email is defined unique, if database already has this email, database will throw error
    return this.Model.create(signUpData);
  }

  signIn(signInData, ctx) {
    const isAuthenticated = ctx.authenticate(signInData);
    if (isAuthenticated) {
      console.log('User is Authenticated');
    }
    return 'Sign in output!';
  }

  signOut() {
    return 'sign out...';
  }

}


module.exports = User;