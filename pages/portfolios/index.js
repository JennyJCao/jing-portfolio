// import React from "react";
import axios from "axios";
import Link from "next/link";

import PortfolioCard from "@/components/portfolios/PortfolioCard";


// const apiCall = () => {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       res({testingData: 'just some testing data'});
//     }, 200);
//   })
// }

const fetchPortfolios = () => {
  // 如果多行可以用模板字符串 ``；一行用 ''
  const query = `
      query Portfolios {
        portfolios {
          _id,
          title, 
          company, 
          companyWebsite, 
          location, 
          jobTitle,
          description,
          startDate,
          endDate
        }
      }`;
  // axios 的返回值都是res.data，所以res.data.data.portfolios才是要的portfolios数组
  return axios.post('http://localhost:3000/graphql', {query: query})
    .then(({data: {data: {portfolios: portfolios}}}) => portfolios);
}


const Portfolios = ({portfolios}) => {



  return (
    <>
      {/*{props.testingData}*/}
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
        {/*<button className="btn btn-primary" onClick={fetchPortfolios}>Fetch Data</button>*/}
      </section>
      {/*测试是否接收到portfolios*/}
      {/*{JSON.stringify(portfolios)}*/}
      <section className="pb-5">
        <div className="row">
          {
            portfolios.map(portfolio =>
              <div className="col-md-4" key={portfolio._id}>
                {/*href  vs.  as*/}
                {/*href - 导航的目标路径或 URL。这是唯一需要的属性*/}
                {/*as - 可选的路径装饰符，用于显示在浏览器的地址栏中。在 Next.js 9.5.3 版本之前，该属性用于动态路由*/}
                <Link
                  href='/portfolios/[id]'
                  as={`/portfolios/${portfolio._id}`}>
                  {/*a链接的作用是将整个卡片变成一个link*/}
                  <a className="card-link">
                    <PortfolioCard portfolio={portfolio}/>
                  </a>
                </Link>

              </div>
            )
          }

        </div>
      </section>
    </>
  )
}

Portfolios.getInitialProps = async () => {
  const portfolios = await fetchPortfolios();
  return {portfolios};
}

// Portfolios.getInitialProps = async () => {
//   const data = await apiCall();
//   return {...data};
// }


// class Portfolios extends React.Component {

//   render() {
//     return (
//       <h1>Hello World</h1>
//     )
//   }
// }


export default Portfolios;
