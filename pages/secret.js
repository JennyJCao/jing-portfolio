import React from "react";
import withApollo from "@/hoc/withApollo";
import withAuth from "@/hoc/withAuth";

const Secret = () => {
  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Secret</h1>
            Secret page, only authenticated users allowed!
          </div>
        </div>
      </div>
    </>
  )
}


// 登录的用户中只有admin身份的才可以看见secret页面
export default withApollo(withAuth(Secret, ['instructor']));
