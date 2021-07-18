import React from "react";
import withApollo from "@/hoc/withApollo";
import withAuth from "@/hoc/withAuth";

const Secret = ({displayMessage}) => {
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



export default withApollo(withAuth(Secret));
