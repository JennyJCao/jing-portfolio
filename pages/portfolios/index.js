import { useMutation, useQuery} from "@apollo/react-hooks";
import {GET_PORTFOLIOS, CREATE_PORTFOLIO, UPDATE_PORTFOLIO, DELETE_PORTFOLIO} from "@/apollo/queries";
import Link from "next/link";
import axios from "axios";

import PortfolioCard from "@/components/portfolios/PortfolioCard";
import withApollo from "@/hoc/withApollo";
import { getDataFromTree } from '@apollo/react-ssr';


const Portfolios = () => {
  const {data} = useQuery(GET_PORTFOLIOS);

  const [updatePortfolio] = useMutation(UPDATE_PORTFOLIO);

  const [deletePortfolio] = useMutation(DELETE_PORTFOLIO, {
    update(cache, {data: {deletePortfolio}}) {
      // deletePortfolio 返回值是id
      const {portfolios} = cache.readQuery({query: GET_PORTFOLIOS});
      const newPortfolios = portfolios.filter(p => p._id !== deletePortfolio);
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: {
          portfolios: newPortfolios
        }
      });
    }
  });

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
                <button className="btn btn-warning" onClick={() => updatePortfolio({variables: {id: portfolio._id}})}>Update Portfolio</button>
                <button className="btn btn-danger" onClick={() => deletePortfolio({variables: {id: portfolio._id}})}>Delete Portfolio</button>
              </div>
            )
          }

        </div>
      </section>
    </>
  )
}





export default withApollo(Portfolios, {getDataFromTree});
