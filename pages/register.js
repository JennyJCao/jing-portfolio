import React from "react";

import RegisterForm from "@/components/forms/RegisterForm";
import {Mutation} from "react-apollo";
import {SIGN_UP} from "@/apollo/queries";
import withApollo from "@/hoc/withApollo";


const Register = () => {

  const register = (registerData) => {
    alert(JSON.stringify(registerData));
  }


  return (
    <>
      <div className="bwm-form mt-5">
          <div className="row">
            <div className="col-md-5 mx-auto">
              <h1 className="page-title">Register</h1>
              {/*第二种方式执行mutation，第一种是apollo/actions/index.js */}
              <Mutation mutation={SIGN_UP}>
                { (signUpUser, {data, error}) =>
                  <>
                    <RegisterForm onSubmit={registerData => {
                      signUpUser({variables: registerData});
                    }}/>
                  </>

                }

              </Mutation>

            </div>
          </div>
        </div>
    </>
  )
}



export default withApollo(Register);
