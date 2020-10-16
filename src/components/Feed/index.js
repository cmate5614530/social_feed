import React, { Suspense } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Header from "../Shared/Header";

import {
  BrowserRouter,
  HashRouter,
  Route,
  withRouter,
  Redirect,
  Switch
} from "react-router-dom";
import { ApolloConsumer } from "react-apollo";
import PushNotification from "./profille/details/pushnotification";
import LocationPreference from "./profille/details/location";
import { Context } from "../usercontext";
import Search from "./search";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Squareloading from "../Shared/squareloading";
const Worldtweets = React.lazy(() => import("./worldtweets/index"));
const Asideitem = React.lazy(() => import("../Shared/asideitem"));
const Tweetsheet = React.lazy(() => import("./Tweetsheet"));
const HashTag = React.lazy(() => import("./hashtag"));
const Share = React.lazy(() => import("../Shared/share"));
const FunScreen = React.lazy(() => import("./homescreen/index"));
const Individual = React.lazy(() => import("./Individual/"));
const CnnFeed = React.lazy(() => import("./cnnfeed"));
const FoxFeed = React.lazy(() => import("./foxfeed"));
const EspnFeed = React.lazy(() => import("./espnfeed"));
const Profile = React.lazy(() => import("./profille"));
const Tempusersheet = React.lazy(() => import("./tempusersheet"));

const UserFeed = props => {
  const cuser = React.useContext(Context);
  const [tempid, settempid] = React.useState(200);

  React.useEffect(() => {
    if (window.navigator.userAgent == "buzzrakerapp")
      window.ReactNativeWebView.postMessage(`componentReady:/feeds/tweet`);
    window.scrollTo(0, 0);
  });
  return (
    <Suspense fallback={<div>Loading...suspense2</div>}>
      <ApolloConsumer>
        {client => {
          client.writeData({ data: { showProfile: false } });

          return (
            <div>
              {!cuser ? (
                <Tempusersheet />
              ) : (
                <div>
                  <Tweetsheet />
                </div>
              )}
            </div>
          );
        }}
      </ApolloConsumer>
    </Suspense>
  );
};

const Feed = props => {
  const [currentAside, setCurrentAside] = React.useState("random");
  const cuser = React.useContext(Context);
  React.useEffect(() => {
    document.addEventListener("profile", () => {
      props.history.push(`/profile/${cuser.username}`);
    });
  }, []);

  let { classes } = props;

  return (
    <>
      <Query query={SHOW_PROFILE_QUERY}>
        {({ data }) => {
          return (
            <>
              {window.navigator.userAgent != "buzzrakerapp" ? (
                <Header setCurrentAside={setCurrentAside} currentUser={cuser} />
              ) : null}

              <Suspense fallback={<Squareloading />}>
                <Container
                  style={
                    window.navigator.userAgent == "buzzrakerapp"
                      ? { marginTop: "1em" }
                      : { marginTop: "5.5em" }
                  }
                  maxWidth="md"
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={data.showProfile ? 12 : 7}>
                      <Paper>
                        <Switch>
                          <Route path="/" exact component={UserFeed} />
                          <Route path="/cnnfeed" component={CnnFeed} />
                          <Route path="/foxfeed" component={FoxFeed} />
                          <Route path="/espnfeed" component={EspnFeed} />
                          <Route path="/worldtweets" component={Worldtweets} />
                          <Route
                            path="/profile/:username"
                            component={Profile}
                          />
                          <Route path="/hashtag/:hashtag" component={HashTag} />
                          <Route path="/fun" exact component={FunScreen} />

                          <Route path="/share" component={Share} />
                          <Route path="/feeds/:link" component={Individual} />
                          <Route path="/search" component={Search} />
                          {window.navigator.userAgent == "buzzrakerapp" ? (
                            <Route
                              path="/pushnotification"
                              component={PushNotification}
                            />
                          ) : null}
                          {window.navigator.userAgent == "buzzrakerapp" ? (
                            <Route
                              path="/locationPreference"
                              component={LocationPreference}
                            />
                          ) : null}
                          <Redirect to="/" />
                        </Switch>
                      </Paper>
                    </Grid>

                    <Asideitem currentAside={currentAside} data={data} />

                    {/*  <Footer /> */}
                  </Grid>
                </Container>
              </Suspense>
            </>
          );
        }}
      </Query>
    </>
  );
};

const styles = theme => ({
  bordered: {
    border: "1px solid black"
  },
  root: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2)
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  icon: {
    padding: "0px 2px 2px 0px",
    verticalAlign: "middle",
    color: "green"
  },
  container: {
    marginTop: "5.5em"
  },
  paypal: {
    marginTop: theme.spacing(1)
  },
  aside: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  }
});

const SHOW_PROFILE_QUERY = gql`
  {
    showProfile @client
  }
`;

export default withRouter(withStyles(styles)(Feed));
