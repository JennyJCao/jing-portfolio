import Pagination from "react-js-pagination";

const AppPagination = ({count, pageNum, pageSize, onPageChange}) => {

  return (
    // activePage: 当前在哪一页
    // pageRangeDisplayed: 页码跳转栏展示的页码数
    // totalItemsCount: 一共多少条数据
    <Pagination
      itemClass="page-item"
      linkClass="page-link"
      activePage={pageNum}
      itemsCountPerPage={pageSize}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      onChange={page => {

        // page是用户选的哪一页
        onPageChange(page, pageSize);
      }}
    />
  )
}

export default AppPagination;