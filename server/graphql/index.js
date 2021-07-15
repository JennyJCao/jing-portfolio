const {ApolloServer, gql} = require('apollo-server-express'); // gql: graphql
const mongoose = require('mongoose');


const {portfolioQueries, portfolioMutations, userMutations} = require('./resolvers');
const {portfolioTypes, userTypes} = require('./types');
const {buildAuthContext} = require('./context');


// GraphqlModels
const Portfolio = require('./models/Portfolio');
const User = require('./models/User');


exports.createApolloServer = () => {
  const typeDefs = gql`
    ${portfolioTypes},
    ${userTypes},
    
    type Query {
      portfolio(id: ID): Portfolio,
      portfolios: [Portfolio]
    },
    type Mutation {
      createPortfolio(input: PortfolioInput): Portfolio,
      updatePortfolio(id: ID, input: PortfolioInput): Portfolio,
      deletePortfolio(id: ID): ID,
      signUp(input: SignUpInput): String,
      signIn(input: SignInInput): String,
      signOut: String
    }
  `;


  // The root provides a resolver for each API endpoint
  const resolvers = {
    Query: {
      ...portfolioQueries
    },
    Mutation: {
      ...portfolioMutations,
      ...userMutations
    }
  }

  const apolloServer = new ApolloServer({
    typeDefs, resolvers,
    context: () => ({
      ...buildAuthContext(),
      models: {
        Portfolio: new Portfolio(mongoose.model('Portfolio')),
        User: new User(mongoose.model('User'))
      }})
  });

  return apolloServer;
}