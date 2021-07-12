// import React from "react";
import axios from "axios";

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
          jobTitle description
        }
      }`;
  // axios 的返回值都是res.data，所以res.data.data.portfolios才是要的portfolios数组
  return axios.post('http://localhost:3000/graphql', {query: query})
    .then(({data: {data: portfolios}}) => portfolios);
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
          <div className="col-md-4">
            <div className="card subtle-shadow no-border">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p className="card-text fs-2">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
              <div className="card-footer no-border">
                <small className="text-muted">Last updated 3 mins ago</small>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card subtle-shadow no-border">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p className="card-text fs-2 ">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
              <div className="card-footer no-border">
                <small className="text-muted">Last updated 3 mins ago</small>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card subtle-shadow no-border">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p className="card-text fs-2 ">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
              <div className="card-footer no-border">
                <small className="text-muted">Last updated 3 mins ago</small>
              </div>
            </div>
          </div>
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
