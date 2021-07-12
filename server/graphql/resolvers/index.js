

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


exports.portfolioQueries = {
  hello: () => {
    return 'Hello World!';
  },
  // id是从args中解构出来的：args.id
  portfolio: (root, {id}) => {
    const portfolio = data.portfolios.find(p => p._id === id);
    return portfolio;
  },
  portfolios: () => {
    return data.portfolios
  }

}

exports.portfolioMutations = {
  createPortfolio: (root, {input}) => {
    // 创建id
    const _id = require('crypto').randomBytes(10).toString('hex');
    const newPortfolio = {...input};
    newPortfolio._id = _id;
    data.portfolios.push(newPortfolio);
    return newPortfolio;
  },
  updatePortfolio: (root, {id, input}) => {
    // 找到要修改的元素在数组中的index
    const index = data.portfolios.findIndex(p => p._id === id);
    // 直接修改就是覆盖，没有提到的都设置为null了，如果想要selective update：
    const oldPortfolio = data.portfolios[index];
    const updatePortfolio = {...oldPortfolio, ...input};
    data.portfolios[index] = updatePortfolio;
    return updatePortfolio;
  }
}