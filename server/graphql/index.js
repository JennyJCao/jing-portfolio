const {ApolloServer, gql} = require('apollo-server-express'); // gql: graphql
const mongoose = require('mongoose');


const {portfolioQueries, portfolioMutations,
  userQueries, userMutations,
  forumQueries, forumMutations} = require('./resolvers');
const {portfolioTypes, userTypes, forumTypes} = require('./types');
const {buildAuthContext} = require('./context');


// GraphqlModels
const Portfolio = require('./models/Portfolio');
const User = require('./models/User');
const ForumCategory = require('./models/ForumCategory');
const Topic = require('./models/Topic');


exports.createApolloServer = () => {
  const typeDefs = gql`
    ${portfolioTypes},
    ${userTypes},
    ${forumTypes},
    
    type Query {
      portfolio(id: ID): Portfolio,
      portfolios: [Portfolio],
      userPortfolios: [Portfolio],
      
      user: User,
      
      forumCategories: [ForumCategory],
      
      topicsByCategory(category: String): [Topic],
      topicBySlug(slug: String): Topic
      
      
    },
    type Mutation {
      createPortfolio(input: PortfolioInput): Portfolio,
      updatePortfolio(id: ID, input: PortfolioInput): Portfolio,
      deletePortfolio(id: ID): ID,
      
      createTopic(input: TopicInput): Topic,
      
      signUp(input: SignUpInput): String,
      signIn(input: SignInInput): User,
      signOut: Boolean
    }
  `;


  // The root provides a resolver for each API endpoint
  const resolvers = {
    Query: {
      ...portfolioQueries,
      ...userQueries,
        ...forumQueries
    },
    Mutation: {
      ...portfolioMutations,
      ...userMutations,
      ...forumMutations
    }
  }

  const apolloServer = new ApolloServer({
    typeDefs, resolvers,
    context: ({req}) => ({
      ...buildAuthContext(req),
      models: {
        Portfolio: new Portfolio(mongoose.model('Portfolio'), req.user),
        User: new User(mongoose.model('User')),
        ForumCategory: new ForumCategory(mongoose.model('ForumCategory')),
        Topic: new Topic(mongoose.model('Topic'), req.user)
      }})
  });

  return apolloServer;
}