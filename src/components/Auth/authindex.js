import React, { useState, Suspense } from "react";

import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import Squareloading from "../Shared/squareloading";
const Register = React.lazy(() => import("./register"));
const Login = React.lazy(() => import("./login"));
const TwoFA = React.lazy(() => import("./2fa"));
const Email = React.lazy(() => import("./email"));

const ForgetPassword = React.lazy(() => import("./forgetPassword"));

const Auth = props => {
  const [currentRoute, setCurrentRoute] = useState("Register");
  const [username, setUsername] = useState("");
  return (
    <div>
      <Suspense fallback={<Squareloading />}>
        <Query query={IS_LOGGED_IN_QUERY}>
          {({ data }) => {
            if (data.authRoute) setCurrentRoute(data.authRoute);
            return (
              <Query query={GENERATE_OTP}>
                {({ loading, error, data }) => (
                  <div>
                    {currentRoute == "Register" ? (
                      <Register
                        history={props.history}
                        setCurrentRoute={setCurrentRoute}
                      />
                    ) : null}

                    {currentRoute == "Email" ? (
                      <Email setCurrentRoute={setCurrentRoute} />
                    ) : null}

                    {currentRoute == "Login" ? (
                      <Login
                        setPropsUsername={setUsername}
                        setCurrentRoute={setCurrentRoute}
                      />
                    ) : null}

                    {currentRoute == "2fa" ? (
                      <TwoFA
                        username={username}
                        setCurrentRoute={setCurrentRoute}
                      />
                    ) : null}
                    {currentRoute == "ForgetPassword" ? (
                      <ForgetPassword setCurrentRoute={setCurrentRoute} />
                    ) : null}
                  </div>
                )}
              </Query>
            );
          }}
        </Query>
      </Suspense>
    </div>
  );
};

const IS_LOGGED_IN_QUERY = gql`
  {
    authRoute @client
  }
`;

const GENERATE_OTP = gql`
  {
    generateotp
  }
`;

export default Auth;
