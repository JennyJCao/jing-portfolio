

exports.portfolioQueries = {
  // id是从args中解构出来的：args.id
  portfolio: (root, {id}, ctx) => {
    return ctx.models.Portfolio.getById(id);
  },
  portfolios: (root, args, ctx) => {
    return ctx.models.Portfolio.getAll();
  },
  userPortfolios: (root, args, ctx) => {
    return ctx.models.Portfolio.getAllByUser();
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


exports.forumQueries = {
  forumCategories: (root, args, ctx) => {
    return ctx.models.ForumCategory.getAll();
  },
  topicsByCategory: async (root, {category}, ctx) => {
    // 这里的category是slug
    const forumCategory = await ctx.models.ForumCategory.getBySlug(category);
    if (!forumCategory) { return null; }
    return ctx.models.Topic.getAllByCategory(forumCategory._id);
  },
  topicBySlug: (root, {slug}, ctx) => {
    return ctx.models.Topic.getBySlug(slug);
  },
  postsByTopic: async (root, {slug}, ctx) => {
    // find topic by slug
    const topic = await ctx.models.Topic.getBySlug(slug);
    return ctx.models.Post.getAllByTopic(topic);
  }
}
exports.forumMutations = {
  createTopic: async (root, {input}, ctx) => {
    const category = await ctx.models.ForumCategory.getBySlug(input.forumCategory);
    input.forumCategory = category._id;
    const topic = await ctx.models.Topic.create(input);
    return topic;
  },
  createPost: async (root, {input}, ctx) => {
    const post = await ctx.models.Post.create(input);
    return post;
  }
}
