import {useGetPortfolios, useUpdatePortfolio, useDeletePortfolio, useCreatePortfolio} from "@/apollo/actions";
import Link from "next/link";

import PortfolioCard from "@/components/portfolios/PortfolioCard";
import withApollo from "@/hoc/withApollo";
import { getDataFromTree } from '@apollo/react-ssr';


const Portfolios = () => {
  const {data} = useGetPortfolios();

  const [updatePortfolio] = useUpdatePortfolio();

  const [deletePortfolio] = useDeletePortfolio();

  const [createPortfolio] = useCreatePortfolio();

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
