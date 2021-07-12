import React from 'react';

import {useRouter} from 'next/router';

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

const PortfolioDetail = ({query}) => {
  const {id} = query;

  // 这里的router.query.id要和文件名的 [id].js 保持一致，否则不生效
  // 例如： router.query.slug  --- [slug].js
  return (
    <h1>I am the detail page with ID: {id}</h1>
  )
}

PortfolioDetail.getInitialProps = ({query}) => ({query})



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
