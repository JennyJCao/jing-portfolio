

const authenticateUser = ({email, user}) => {
  console.log(`Authenticating user: ${email}`);
  return true;
}

exports.buildAuthContext = () => {
  const auth = {
    authenticate: (options) => authenticateUser(options)

  }

  return auth;
}