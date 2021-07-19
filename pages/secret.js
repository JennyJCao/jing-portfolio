import React from "react";
import withApollo from "@/hoc/withApollo";
import withAuth from "@/hoc/withAuth";
import BaseLayout from "@/layouts/BaseLayout";

const Secret = () => {
  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Secret</h1>
            Secret page, only authenticated users allowed!
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}


// 登录的用户中只有instructor身份的才可以看见secret页面
export default withApollo(withAuth(Secret, ['admin', 'instructor']));
