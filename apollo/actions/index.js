import {useLazyQuery, useMutation, useQuery} from "@apollo/react-hooks";
import {GET_PORTFOLIO, GET_PORTFOLIOS, GET_USER_PORTFOLIOS,
  CREATE_PORTFOLIO, UPDATE_PORTFOLIO, DELETE_PORTFOLIO,
  SIGN_IN, SIGN_OUT, GET_USER
} from "@/apollo/queries";


export const useGetPortfolio = (options) => useQuery(GET_PORTFOLIO, options);
export const useGetPortfolios = () => useQuery(GET_PORTFOLIOS);
export const useGetUserPortfolios = () => useQuery(GET_USER_PORTFOLIOS);
export const useUpdatePortfolio = () => useMutation(UPDATE_PORTFOLIO);
export const useDeletePortfolio = () => useMutation(DELETE_PORTFOLIO, {
  update(cache, {data: {deletePortfolio}}) {
    // deletePortfolio 返回值是id
    const {userPortfolios} = cache.readQuery({query: GET_USER_PORTFOLIOS});
    const newUserPortfolios = userPortfolios.filter(p => p._id !== deletePortfolio);
    cache.writeQuery({
      query: GET_USER_PORTFOLIOS,
      data: {
        userPortfolios: newUserPortfolios
      }
    });
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
export const useCreatePortfolio = () => useMutation(CREATE_PORTFOLIO, {
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


// Auth actions start---------------------------------------
export const useSignIn = () => useMutation(SIGN_IN, {
  update(cache, {data: {signIn: signInUser}}) {
    cache.writeQuery({
      query: GET_USER,
      data: {user: signInUser}
    })
  }
});

export const useSignOut = () => useMutation(SIGN_OUT);

export const useLazyGetUser = () => useLazyQuery(GET_USER);

export const useGetUser = () => useQuery(GET_USER);

// Auth actions end------------------------------------------
