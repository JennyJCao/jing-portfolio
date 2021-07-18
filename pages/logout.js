import React, {useEffect} from "react";
import {useRouter} from "next/router";
import withApollo from "@/hoc/withApollo";
import {useSignOut} from '@/apollo/actions';
import BaseLayout from "@/layouts/BaseLayout";


const Logout = ({apollo}) => {

  const [signOut] = useSignOut();
  const router = useRouter();

  useEffect(() => {
    signOut().then(() => {
      // 清空所有cache
      apollo.resetStore().then(() => router.push('/login'));
    });
  }, []);

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Logout</h1>

          </div>
        </div>
      </div>
    </BaseLayout>
  )
}



export default withApollo(Logout);
