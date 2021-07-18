

exports.portfolioQueries = {
  // id是从args中解构出来的：args.id
  portfolio: (root, {id}, ctx) => {
    return ctx.models.Portfolio.getById(id);
  },
  portfolios: (root, args, ctx) => {
    return ctx.models.Portfolio.getAll();
  }

}




exports.portfolioMutations = {
  createPortfolio: async (root, {input}, ctx) => {
    const createdPortfolio = await ctx.models.Portfolio.create(input);
    return createdPortfolio;
  },
  updatePortfolio: async (root, {id, input}, ctx) => {
    // new: true  指定返回值是portfolio，否则不返回
    const updatePortfolio = await ctx.models.Portfolio.findAndUpdate(id, input);
    return updatePortfolio;
  },
  deletePortfolio: async (root, {id}, ctx) => {
    const deletedPortfolio = await ctx.models.Portfolio.findAndDelete(id);
    return deletedPortfolio._id;
  }
}

exports.userQueries = {
  user: (root, {id}, ctx) => {
    return ctx.models.User.getAuthUser(ctx);
  }
}

exports.userMutations = {
  signUp: async (root, {input}, ctx) => {
    const registeredUser = await ctx.models.User.signUp(input);
    return registeredUser._id;
  },
  signIn: (root, {input}, ctx) => {
    return ctx.models.User.signIn(input,ctx);
  },
  signOut: (root, args, ctx) => {
    return ctx.models.User.signOut(ctx);
  }
}