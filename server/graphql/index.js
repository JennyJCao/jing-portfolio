const {ApolloServer, gql} = require('apollo-server-express'); // gql: graphql
const mongoose = require('mongoose');


const {portfolioQueries, portfolioMutations} = require('./resolvers');
const {portfolioTypes} = require('./types')
// GraphqlModels
const Portfolio = require('./models/Portfolio');


exports.createApolloServer = () => {
  // Construct a schema, using Graphql schema language
  // 模板字符串 `` 里面不要写注释
  // !表示不能为空，如果该字段为空，并且前端查询该字段，会报错，查询失败：Cannot return null for non-nullable field Portfolio.content
  // 一般应用会要求id为非空，ID!  non-nullable
  // 名字是规定死的： typeDefs，不要漏掉s
  const typeDefs = gql`
    ${portfolioTypes},
    type Query {
      portfolio(id: ID): Portfolio,
      portfolios: [Portfolio]
    },
    type Mutation {
      createPortfolio(input: PortfolioInput): Portfolio,
      updatePortfolio(id: ID, input: PortfolioInput): Portfolio,
      deletePortfolio(id: ID): ID
    }
  `;


  // The root provides a resolver for each API endpoint
  const resolvers = {
    Query: {
      ...portfolioQueries
    },
    Mutation: {
      ...portfolioMutations
    }
  }

  const apolloServer = new ApolloServer({
    typeDefs, resolvers,
    context: () => ({
      models: {
        Portfolio: new Portfolio(mongoose.model('Portfolio'))
      }})
  });

  return apolloServer;
}