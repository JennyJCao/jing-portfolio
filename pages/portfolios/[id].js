import React from 'react';
import {useQuery} from "@apollo/react-hooks";
import {GET_PORTFOLIO} from "@/apollo/queries";


const PortfolioDetail = ({query}) => {

  // variables:  传参
  const {loading, error, data } = useQuery(GET_PORTFOLIO, {variables: {id: query.id}});

  if (loading) {
    return 'Loading...';
  }

  const portfolio = data && data.portfolio || {};

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
  return {query};
}


export default PortfolioDetail;
