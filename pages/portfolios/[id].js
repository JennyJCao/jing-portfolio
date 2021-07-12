import React from 'react';

import {useRouter} from 'next/router';
import axios from "axios";




const fetchPortfolioById = (id) => {
  // 如果多行可以用模板字符串 ``；一行用 ''
  // id不要忘了加""
  // 参数写在第二层，第一层的Portfolio只是给该操作起的一个名字，叫啥都行，后面如果跟参数就是variables
  const query = `
      query Portfolio {
        portfolio(id: "${id}") {
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
    .then(({data: {data: {portfolio: portfolio}}}) => portfolio);

  // // 如果通过variables传参是一样的，这样写
  // const query = `
  //     query Portfolio($id: ID) {
  //       portfolio(id: $id) {
  //         _id,
  //         title,
  //         company,
  //         companyWebsite,
  //         location,
  //         jobTitle,
  //         description,
  //         startDate,
  //         endDate
  //       }
  //     }`;
  // const variables = {id};
  // return axios.post('http://localhost:3000/graphql', {query, variables})
  //   .then(({data: {data: {portfolio: portfolio}}}) => portfolio);

}

const PortfolioDetail = ({portfolio}) => {

  // 这里的router.query.id要和文件名的 [id].js 保持一致，否则不生效
  // 例如： router.query.slug  --- [slug].js
  return (
    <div className="portfolio-detail">
      <div className="container">

        <div className="jumbotron">
          <h1 className="display-3">{portfolio.title}</h1>
          <p className="lead">{portfolio.jobTitle}</p>
          <p>
            <a className="btn btn-lg btn-success" href={portfolio.companyWebsite} role="button">
              See Company</a>
          </p>
        </div>

        <div className="row marketing">
          <div className="col-lg-6">
            <h4 className="title">Location</h4>
            <p className="text">{portfolio.location}</p>

            <h4 className="title">Start Date</h4>
            <p className="text">{portfolio.startDate}</p>
          </div>

          <div className="col-lg-6">
            {/* TODO: days later... */}
            <h4 className="title">Days</h4>
            <p className="text">44</p>

            <h4 className="title">End Date</h4>
            <p className="text">{portfolio.endDate}</p>
          </div>
          <div className="col-md-12">
            <hr />
            <h4 className="title">Description</h4>
            <p>{portfolio.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

PortfolioDetail.getInitialProps = async ({query}) => {
  const portfolio = await fetchPortfolioById(query.id);
  return {portfolio};
}



// const PortfolioDetail = () => {

//   const router = useRouter();
//   // const id = router.query.id;
//   const {id} = router.query;

//   // 这里的router.query.id要和文件名的 [id].js 保持一致，否则不生效
//   // 例如： router.query.slug  --- [slug].js
//   return (
//     <h1>I am the detail page with ID: {id}</h1>
//   )
// }


// class PortfolioDetail extends React.Component {

//   // called on the server
//   static getInitialProps({query}) {
//     // what you return here will get into this.props
//     return {query, test: 'jing'};
//   }

//   render() {
//     const {id} = this.props.query;
//     return (
//       <h1>I am the detail page with ID: {id}, test is: {this.props.test}</h1>
//     )
//   }
// }

export default PortfolioDetail;
