import React, { Suspense } from "react";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import orange from "@material-ui/core/colors/orange";
import red from "@material-ui/core/colors/red";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { useApolloClient } from "@apollo/react-hooks";
import Squareloading from "./components/Shared/squareloading";
import "./App.css";
import { Context } from "./components/usercontext";
import View from "./components/view";
import { WithApolloClient, withApollo, ApolloConsumer } from "react-apollo";
import Errorshow from "./components/Shared/NetworkError";
import { withRouter } from "react-router-dom";
const Auth = React.lazy(() => import("./components/Auth"));
const Feed = React.lazy(() => import("./components/Feed"));

const IS_LOGGED_IN_QUERY = gql`
  {
    isLoggedIn
    tempuser @client
  }
`;

//
const Tweets = props => {
  console.log("props", props);
  const [tempuser, setTempUser] = React.useState(false);
  const [path, setPath] = React.useState("/");
  //const client = useApolloClient();

  console.log(props);
  React.useEffect(() => {
    let locationPreference = localStorage.getItem("locationPreference");
    if (!locationPreference) localStorage.setItem("locationPreference", "true");

    const cachedata = props.client.readQuery({ query: IS_LOGGED_IN_QUERY });
    const authtoken = localStorage.getItem("authtoken");

    if (
      cachedata.tempuser == "true" ||
      cachedata.tempuser == true ||
      authtoken
    ) {
      if (window.navigator.userAgent == "buzzrakerapp") {
        if (cachedata.tempuser == "true" || cachedata.tempuser == true) {
          window.ReactNativeWebView.postMessage(`setTempuser:true`);
        }
        if (authtoken) {
          window.ReactNativeWebView.postMessage(`setLoggedIn:true`);
        }
      }
    } else {
      if (window.navigator.userAgent == "buzzrakerapp") {
        if (cachedata.tempuser != "true" || cachedata.tempuser != true) {
          window.ReactNativeWebView.postMessage(`setTempuser:false`);
        }
        if (!authtoken) {
          window.ReactNativeWebView.postMessage(`setLoggedIn:false`);
        }
      }
    }

    console.log("cachedata ", cachedata);

    props.history.listen(location => {
      console.log("location", location);
      if (window.navigator.userAgent == "buzzrakerapp")
        window.ReactNativeWebView.postMessage(
          `setLocation:https://buzzraker.com${location.pathname}`
        );
      setPath(location.pathname);
    });
    document.addEventListener("logout", () => {
      localStorage.removeItem("authtoken");
      props.history.push("/login");
      props.client.writeData({
        data: {
          isLoggedIn: false,
          authRoute: "Login"
        }
      });
      setTempUser(false);
    });
    document.addEventListener("setgeolocation", e => {
      if (e.detail == "true" || e.detail == true) {
        localStorage.setItem("locationPreference", "true");
      } else {
        localStorage.setItem("locationPreference", "false");
      }
    });
    document.addEventListener("login", () => {
      props.history.push("/login");
      localStorage.removeItem("authtoken");
      props.client.writeData({
        data: {
          isLoggedIn: false,
          tempuser: false,
          authRoute: "Login"
        }
      });
      setTempUser(false);
    });

    document.addEventListener("setTempToFalseFromRegisterorLogin", () => {
      if (window.navigator.userAgent == "buzzrakerapp")
        window.ReactNativeWebView.postMessage(`setTempuser:false`);
      setTempUser(false);
    });
    document.addEventListener("navigate", e => {
      if (e.detail) {
        props.history.push(e.detail);
      }
    });
    document.addEventListener("goback", () => {
      props.history.goBack();
    });
    document.addEventListener("check", async e => {
      if (e.detail) {
        const token = (await localStorage.getItem("authtoken")) || "";
        if (!token) {
          window.ReactNativeWebView.postMessage(`setTempuser:true`);
          setTempUser(true);
        }

        props.history.push(e.detail);
      }
    });

    async function checkPath() {
      let currentLocation = window.location.href;
      let replacedCurrentLocation = currentLocation.replace(
        "http://192.168.0.103:3000/",
        ""
      );

      if (replacedCurrentLocation == "") {
        console.log("equal to '' ");
        console.log("replacedLocation", replacedCurrentLocation);
        if (window.navigator.userAgent == "buzzrakerapp")
          window.ReactNativeWebView.postMessage(`getNotification:/feeds/tweet`);
      } else {
        console.log("not equal to ''");
        console.log("replacedLocation", replacedCurrentLocation);
        console.log(window.location.pathname);
        const token = (await localStorage.getItem("authtoken")) || "";
        if (!token) {
          if (window.navigator.userAgent == "buzzrakerapp")
            window.ReactNativeWebView.postMessage(`setTempuser:true`);
          setTempUser(true);
          // props.history.push(window.location.pathname);
        }
      }
    }
    checkPath();
  }, []);

  return (
    <Suspense fallback={<Squareloading />}>
      <ApolloConsumer>
        {client => {
          console.log("client", client);
          return (
            <Query query={IS_LOGGED_IN_QUERY}>
              {({ data }) => {
                console.log(data.tempuser);
                console.log(tempuser);
                console.log(data);
                return (
                  <div>
                    {data.tempuser || tempuser ? (
                      <Context.Provider value={false}>
                        <Feed />
                      </Context.Provider>
                    ) : data.isLoggedIn ? (
                      <Query query={GET_CURRENT_USER}>
                        {({ loading, error, data }) => {
                          if (loading) return "Loading...";
                          if (error) return <Errorshow error={error} />;

                          return (
                            <Context.Provider value={data.me}>
                              <Feed currentUser={data.me} />
                            </Context.Provider>
                          );
                        }}
                      </Query>
                    ) : (
                      <Auth />
                    )}
                  </div>
                );
              }}
            </Query>
          );
        }}
      </ApolloConsumer>
    </Suspense>
  );
};

export const GET_CURRENT_USER = gql`
  {
    me {
      id
      username
      profileSet {
        profilePic
        emailverified
      }
    }
  }
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      light: indigo[500],
      main: indigo[700],
      dark: indigo[900]
    },
    secondary: {
      light: orange[300],
      main: orange[500],
      dark: orange[700]
    },
    error: {
      light: red[300],
      main: red[300],
      dark: red[700]
    }
  },
  typography: {
    useNextVariants: true
  }
});

function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        {/* https://material-ui.com/getting-started/usage/#cssbaseline */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot(withRouter(withApollo(Tweets)));
