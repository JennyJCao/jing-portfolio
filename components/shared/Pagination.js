import Pagination from "react-js-pagination";


const AppPagination = () => {

  return (
    // activePage: 当前在哪一页
    // pageRangeDisplayed: 页码跳转栏展示的页码数
    <Pagination
      itemClass="page-item"
      linkClass="page-link"
      activePage={1}
      itemsCountPerPage={10}
      totalItemsCount={500}
      pageRangeDisplayed={10}
      onChange={() => {}}
    />
  )
}

export default AppPagination;