import React from "react";

import RegisterForm from "@/components/forms/RegisterForm";
import {Mutation} from "react-apollo";
import {SIGN_UP} from "@/apollo/queries";
import withApollo from "@/hoc/withApollo";

import Redirect from "@/components/shared/Redirect";

const Register = () => {

  const errorMessage = (error) => {
    return (error.graphQLErrors && error.graphQLErrors[0].message) || 'something went wrong';
  }

  return (
    <>
      <div className="bwm-form mt-5">
          <div className="row">
            <div className="col-md-5 mx-auto">
              <h1 className="page-title">Register</h1>
              {/*第二种方式执行mutation，在类式组件中只能用这种方式；第一种是apollo/actions/index.js*/}
              <Mutation mutation={SIGN_UP}>
                { (signUpUser, {data, error}) =>
                  <>
                    <RegisterForm onSubmit={registerData => {
                      signUpUser({variables: registerData});
                    }}/>
                    {/*注册成功后(data存在且data注册了），redirect */}
                    {data && data.signUp && <Redirect to="/login"/>}
                    { error && <div className="alert alert-danger">{errorMessage(error)}</div>}

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
