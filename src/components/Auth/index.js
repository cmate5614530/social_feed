import React, { useState, Suspense } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Squareloading from "../Shared/squareloading";
import { gql } from "apollo-boost";
const Register = React.lazy(() => import("./register"));
const Login = React.lazy(() => import("./login"));
const TwoFA = React.lazy(() => import("./2fa"));
const Email = React.lazy(() => import("./email"));
const ForgetPassword = React.lazy(() => import("./forgetPassword"));
const Termsandcondition = React.lazy(() =>
  import("../Feed/terms-and-condition")
);
const Privacypolicy = React.lazy(() => import("../Feed/privacy-policy"));
const Index = React.lazy(() => import("./authindex"));

const Auth = () => {
  console.log("inside auth");
  return (
    <BrowserRouter>
      <Suspense fallback={<Squareloading />}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Register} />
          <Route exact path="/twofa/:username" component={TwoFA} />
          <Route exact path="/email" component={Email} />
          <Route exact path="/forgetPassword" component={ForgetPassword} />

          <Route
            exact
            path="/terms-and-conditions"
            component={Termsandcondition}
          />
          <Route exact path="/privacy-policy" component={Privacypolicy} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </BrowserRouter>
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
