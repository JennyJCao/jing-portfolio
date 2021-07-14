import {useLazyQuery} from "@apollo/react-hooks";
import {GET_PORTFOLIOS} from "@/apollo/queries";
import Link from "next/link";
import {useEffect, useState} from "react";

import PortfolioCard from "@/components/portfolios/PortfolioCard";

const graphCreatePortfolio = () => {
  // 如果多行可以用模板字符串 ``；一行用 ''
  const query = `
      mutation CreatePortfolio {
      createPortfolio(input: {
        title: "New Job"
        company: "New Company"
        companyWebsite: "New Website"
        location: "New Location"
        jobTitle: "New Job Title"
        description: "New Desc"
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
    .then(({data: {data: {createPortfolio}}}) => createPortfolio);
}

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
  // 每次增加操作，需要重新渲染页面
  const [portfolios, setPortfolios] = useState([]);
  const [getPortfolios, {loading, data}] = useLazyQuery(GET_PORTFOLIOS);

  useEffect(() => {
    getPortfolios();
  }, []);

  // 有一种情况：portfolios本来就数量为0
  if (data && portfolios.length === 0 && data.portfolios.length > 0) {
    setPortfolios(data.portfolios);
  }

  if (loading) {
    return 'Loading...';
  }

  const createPortfolio = async () => {
    const newPortfolio = await graphCreatePortfolio();
    const newPortfolios = [...portfolios, newPortfolio];
    setPortfolios(newPortfolios);
  }

  const updatePortfolio = async (id) => {
    // alert 只能输出一句话，但是console.log可以输出多句话
    // alert(`update portfolio: ${id}`);
    // 先更新data.portfolios
    const updatedPortfolio = await graphUpdatePortfolio(id);
    // 再更新组件里的status: portfolios
    const index = portfolios.findIndex(p => p._id === id);
    // const updatedPortfolios = [portfolios, ...updatedPortfolio];
    // 也可以：
    const updatedPortfolios = portfolios.slice(); // 要先复制，不能直接改，不然status没变
    updatedPortfolios[index] = updatedPortfolio;
    setPortfolios(updatedPortfolios);
  }

  const deletePortfolio = async (id) => {
    const deletedId = await graphDeletePortfolio(id);
    // 更新status
    const index = portfolios.findIndex(p => p._id === deletedId);
    const deletePortfolios = portfolios.slice();
    deletePortfolios.splice(index, 1);
    setPortfolios(deletePortfolios);
  }

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





export default Portfolios;
