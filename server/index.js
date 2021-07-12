const express = require('express')
const next = require('next')

// const {graphqlHTTP} = require('express-graphql');
// // 上面等价为const graphqlHTTP = require('express-graphql').graphqlHTTP;  不要忘记加{}
// const {buildSchema} = require('graphql');
const {ApolloServer, gql} = require('apollo-server-express'); // gql: graphql


const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()


// resolvers
const {portfolioQueries, portfolioMutations} = require('./graphql/resolvers');
// types
const {portfolioTypes} = require('./graphql/types')

// 用于对服务器端进行debug
app.prepare().then(() => {
  const server = express()

  // Construct a schema, using Graphql schema language
  // 模板字符串 `` 里面不要写注释
  // !表示不能为空，如果该字段为空，并且前端查询该字段，会报错，查询失败：Cannot return null for non-nullable field Portfolio.content
  // 一般应用会要求id为非空，ID!  non-nullable
  // 名字是规定死的： typeDefs，不要漏掉s
  const typeDefs = gql`
    ${portfolioTypes},
    type Query {
      hello: String,
      portfolio(id: ID): Portfolio,
      portfolios: [Portfolio]
    },
    type Mutation {
      createPortfolio(input: PortfolioInput): Portfolio,
      updatePortfolio(id: ID, input: PortfolioInput): Portfolio
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

  const apolloServer = new ApolloServer({typeDefs, resolvers});
  apolloServer.applyMiddleware({app: server});

  // server.use('/graphql', graphqlHTTP({
  //   schema,
  //   rootValue: root,
  //   // graphiql不要写成graphql
  //   graphiql: true
  // }));

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})