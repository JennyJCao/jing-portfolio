import { useMutation, useQuery} from "@apollo/react-hooks";
import {GET_PORTFOLIOS, CREATE_PORTFOLIO} from "@/apollo/queries";
import Link from "next/link";
import axios from "axios";

import PortfolioCard from "@/components/portfolios/PortfolioCard";
import withApollo from "@/hoc/withApollo";
import { getDataFromTree } from '@apollo/react-ssr';

const graphUpdatePortfolio = (id) => {
  // 如果多行可以用模板字符串 ``；一行用 ''
  // "${id}"  不要写成 ''
  const query = `
      mutation UpdatePortfolio {
      updatePortfolio(id: "${id}", input: {
        title: "Update Job"
        company: "Update Company"
        companyWebsite: "Update Website"
        location: "Update Location"
        jobTitle: "Update Job Title"
        description: "Update Desc"
        startDate: "12/12/2012"
        endDate: "14/11/2013"
      }) {
        _id,
        title,
        company,
        companyWebsite
        location
        jobTitle
        description
        startDate
        endDate
      }
    }`;
  // axios 的返回值都是res.data，所以res.data.data.createPortfolio才是要的portfolios数组
  // 第三层就是resolver名称
  return axios.post('http://localhost:3000/graphql', {query})
    .then(({data: {data: {updatePortfolio}}}) => updatePortfolio);
}

const graphDeletePortfolio = (id) => {
  // 如果多行可以用模板字符串 ``；一行用 ''
  // "${id}"  不要写成 ''
  const query = `
      mutation DeletePortfolio {
      deletePortfolio(id: "${id}")
    }`;
  // axios 的返回值都是res.data，所以res.data.data.createPortfolio才是要的portfolios数组
  // 第三层就是resolver名称
  return axios.post('http://localhost:3000/graphql', {query})
    .then(({data: {data: {deletePortfolio}}}) => deletePortfolio);
}

const Portfolios = () => {
  const {data} = useQuery(GET_PORTFOLIOS);
  const [createPortfolio] = useMutation(CREATE_PORTFOLIO, {
    update(cache, {data: {createPortfolio}}) {
      // data是 createPortfolio; cache是缓存
      // 1. 从缓存中获取老数据 portfolios
      const {portfolios} = cache.readQuery({query: GET_PORTFOLIOS});
      // 2. 把cache中的数据更新到最新
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: {
          portfolios: [...portfolios, createPortfolio]
        }
      });
    }
  });


  const updatePortfolio = async (id) => {
    await graphUpdatePortfolio(id);
  }

  const deletePortfolio = async (id) => {
    await graphDeletePortfolio(id);
  }

  const portfolios = data && data.portfolios || [];

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
        <button className="btn btn-primary" onClick={createPortfolio}>Create Portfolio</button>
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
                <button className="btn btn-warning" onClick={() => updatePortfolio(portfolio._id)}>Update Portfolio</button>
                <button className="btn btn-danger" onClick={() => deletePortfolio(portfolio._id)}>Delete Portfolio</button>

              </div>
            )
          }

        </div>
      </section>
    </>
  )
}





export default withApollo(Portfolios, {getDataFromTree});
