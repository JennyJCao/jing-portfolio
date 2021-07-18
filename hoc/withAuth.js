
import {useGetUser} from "@/apollo/actions";
import Redirect from "@/components/shared/Redirect";

// 简写为：高阶函数 返回值仍为函数
export default (WrappedComponent) => (props) => {
  // fetchPolicy 规定了不从cache中获取user，我们只从请求数据库的network中获取user
  // {user} = {}  给user赋一个初值，即便没获取到，也不会undefined
  const {data: {user} = {}, loading, error} = useGetUser({fetchPolicy: 'network-only'});
  if (
    !loading &&
    (!user || error) &&
    typeof window !== 'undefined'
  ) {
    return <Redirect to="/login"/>
  }

  if (user) {
    return <WrappedComponent {...props} />
  }
  return <p>'Authenticating...'</p>;

}