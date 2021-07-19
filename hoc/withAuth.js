
import {useGetUser} from "@/apollo/actions";
import Redirect from "@/components/shared/Redirect";

// 简写为：高阶函数 返回值仍为函数
// ssr: server side render
export default (WrappedComponent, role, options = {ssr: false}) => {
  function WithAuth(props) {
    // fetchPolicy 规定了不从cache中获取user，我们只从请求数据库的network中获取user
    // {user} = {}  给user赋一个初值，即便没获取到，也不会undefined
    const {data: {user} = {}, loading, error} = useGetUser({fetchPolicy: 'network-only'});
    if (
      !loading &&
      (!user || error) &&
      typeof window !== 'undefined'
    ) {
      return <Redirect to="/login" query={{message: 'NOT_AUTHENTICATED'}} />
    }
    // TODO: Send a message to login page to suggest what's going wrong
    if (user) {
      if (role && !role.includes(user.role)) {
        return <Redirect to="/login" query={{message: 'NOT_AUTHORIZED'}}/>
      }
      return <WrappedComponent {...props} />
    }
    return <p>'loading...'</p>;
  }
  if (options.ssr) {
    const serverRedirect = (res, to) => {
      res.redirect(to);
      res.end();
      return {};
    }

    WithAuth.getInitialProps = async (context) => {
      const {req, res} = context;
      if (req) {
        const { user } = req;

        if (!user) {
          return serverRedirect(res, '/login?message=NOT_AUTHENTICATED');
        }

        if (role && !role.includes(user.role)) {
          return serverRedirect(res, '/login?message=NOT_AUTHORIZED');
        }
      }
      const pageProps = WrappedComponent.getInitialProps && await WrappedComponent.getInitialProps(context);
      return {...pageProps};
    }
  }
  return WithAuth;
}
