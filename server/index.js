const express = require('express')
const next = require('next')
const {graphqlHTTP} = require('express-graphql');
// 上面等价为const graphqlHTTP = require('express-graphql').graphqlHTTP;  不要忘记加{}
const {buildSchema} = require('graphql');



const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()


const data = {
  portfolios: [
    {
      _id: "sad87da79",
      title: 'Job in Netcentric',
      company: 'Netcentric',
      companyWebsite: 'www.google.com',
      location: 'Spain, Barcelona',
      jobTitle: 'Engineer',
      description: 'Doing something, programing....',
      startDate: '01/01/2014',
      endDate: '01/01/2016'
    },
    {
      _id: "da789ad1",
      title: 'Job in Siemens',
      company: 'Siemens',
      companyWebsite: 'www.google.com',
      location: 'Slovakia, Kosice',
      jobTitle: 'Software Engineer',
      description: 'Responsoble for parsing framework for JSON medical data.',
      startDate: '01/01/2011',
      endDate: '01/01/2013'
    },
    {
      _id: "sadcxv9",
      title: 'Work in USA',
      company: 'WhoKnows',
      companyWebsite: 'www.google.com',
      location: 'USA, Montana',
      jobTitle: 'Housekeeping',
      description: 'So much responsibility....Overloaaaaaad',
      startDate: '01/01/2010',
      endDate: '01/01/2011'
    }
  ]
}


// 用于对服务器端进行debug
app.prepare().then(() => {
  const server = express()

  // Construct a schema, using Graphql schema language
  // 模板字符串 `` 里面不要写注释
  // !表示不能为空，如果该字段为空，并且前端查询该字段，会报错，查询失败：Cannot return null for non-nullable field Portfolio.content
  // 一般应用会要求id为非空，ID!  non-nullable
  const schema = buildSchema(`
    type Portfolio {
        _id: ID,
        title: String,
        company: String,
        companyWebsite: String,
        location: String,
        jobTitle: String,
        description: String,
        startDate: String,
        endDate: String
    },
    type Query {
      hello: String,
      portfolio(id: ID): Portfolio, 
      portfolios: [Portfolio]
    }
  `);

  // The root provides a resolver for each API endpoint
  const root = {
    hello: () => {
      return 'Hello World!';
    },
    // id是从args中解构出来的：args.id
    portfolio: ({id}) => {
      const portfolio = data.portfolios.find(p => p._id === id);
      return portfolio;
    },
    portfolios: () => {
      return data.portfolios
    }
  }

  server.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    // graphiql不要写成graphql
    graphiql: true
  }));

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})