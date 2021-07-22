import Pagination from "react-js-pagination";
import {useState} from "react";


const AppPagination = ({count = 0}) => {

  const [activePage, setActivePage] = useState(1);



  return (
    // activePage: 当前在哪一页
    // pageRangeDisplayed: 页码跳转栏展示的页码数
    // totalItemsCount: 一共多少条数据
    <Pagination
      itemClass="page-item"
      linkClass="page-link"
      activePage={activePage}
      itemsCountPerPage={5}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      onChange={page => setActivePage(page)}
    />
  )
}

export default AppPagination;