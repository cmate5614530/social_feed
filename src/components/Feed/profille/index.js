import React from "react";
import { Query, ApolloConsumer } from "react-apollo";
import { gql } from "apollo-boost";

import withStyles from "@material-ui/core/styles/withStyles";
import { Typography } from "@material-ui/core";
import Showtabs from "./showtabs";
import { STATIC_URL } from "../../../config";
import VerifiedUser from "@material-ui/icons/VerifiedUser";

import { Context } from "../../usercontext";
import Loading from "../../Shared/loading";
import NetworkError from "../../Shared/NetworkError";

import ProfilePaypalDialogbox from "./payments/profilepaypalbox";
import clsx from "clsx";
import "./index.css";

function Profile({ match, classes, history }) {
  const cuser = React.useContext(Context);
  const [open, setOpen] = React.useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = React.useState(false);
  React.useEffect(() => {
    if (match.params.username == undefined) history.goBack();
  }, []);
  return (
    <ApolloConsumer>
      {client => {
        client.writeData({ data: { showProfile: true } });
        return (
          <Query
            query={GET_PROFILE}
            fetchPolicy={"cache-and-network"}
            variables={{ username: match.params.username }}
          >
            {({ loading, error, data }) => {
              if (loading) return <Loading />;
              if (error) {
                history.goBack();
                return null;
                //  return <NetworkError error={error} />;
              }

              return (
                <div>
                  <div className={classes.headerbox}>
                    {data.userprofile.headerPic == "header.png" ? (
                      <div
                        style={{ background: "#E7625F" }}
                        className={classes.headerimage}
                      />
                    ) : (
                      <img
                        className={classes.headerimage}
                        src={`${STATIC_URL}${data.userprofile.headerPic}`}
                      />
                    )}

                    <div className={clsx(classes.avatarbox, "profilepicdiv")}>
                      <img
                        className={clsx(classes.avatarimage, "profilepiccss")}
                        src={`${STATIC_URL}${data.userprofile.profilePic}`}
                      />
                    </div>
                  </div>
                  <div>
                    <div style={{ marginRight: "5%", marginTop: "2%" }}>
                      {data.userprofile.verified ? (
                        <Typography
                          className={classes.headertext}
                          variant="h5"
                          color="textSecondary"
                          component="h5"
                        >
                          {data.userprofile.fullname}
                          <VerifiedUser
                            style={{
                              color: "indigo",
                              marginLeft: "5px",
                              width: "0.8em"
                            }}
                          />
                        </Typography>
                      ) : (
                        <Typography
                          className={classes.headertext}
                          variant="h5"
                          color="textSecondary"
                          component="h5"
                        >
                          {data.userprofile.fullname}
                        </Typography>
                      )}

                      <Typography
                        className={classes.headertext}
                        variant="h6"
                        color="textPrimary"
                        component="h6"
                      >
                        @ {data.userprofile.user.username}
                      </Typography>
                    </div>
                    {cuser ? (
                      data.userprofile.verified == false &&
                      cuser.username == match.params.username ? (
                        <div
                          className="paypalbox"
                          style={{
                            display: "flex",

                            justifyContent: "space-between",
                            padding: "16px",
                            background: "#ddd",
                            margin: "8px",
                            alignItems: "center"
                          }}
                        >
                          <Typography
                            style={{ flex: 1 }}
                            variant="body1"
                            color="textSecondary"
                            component="h6"
                          >
                            Pay $1.49 to www.BuzzRaker.com or $100 to your
                            favority charity to get verified which makes you
                            eligible to participate in upto $50,000 in rewards
                            giveout!!
                          </Typography>

                          {/* <Button
                            color='primary'
                            variant='contained'
                            onClick={() => setPaymentModalOpen(true)}
                            >
                            Get Verified
                          </Button> */}

                          <div style={{ marginTop: "8px" }}>
                            <ProfilePaypalDialogbox
                              refetchQuery={() => [
                                {
                                  query: GET_PROFILE,
                                  variables: { username: match.params.username }
                                }
                              ]}
                            />
                          </div>
                        </div>
                      ) : null
                    ) : null}
                  </div>

                  <div style={{ marginTop: "20px" }}>
                    <Showtabs
                      refetchQueries={() => [
                        {
                          query: GET_PROFILE,
                          variables: { username: match.params.username }
                        }
                      ]}
                      profile={data.userprofile}
                      userid={data.userprofile.user.id}
                      username={data.userprofile.user.username}
                      email={data.userprofile.user.email}
                    />
                  </div>
                </div>
              );
            }}
          </Query>
        );
      }}
    </ApolloConsumer>
  );
}

const styles = theme => ({
  headerbox: {
    position: "relative"
  },
  headerimage: {
    width: "100%",
    height: "240px"
  },
  avatarbox: {
    position: "absolute",
    top: "60%",
    left: "10%"
  },
  avatarimage: {
    width: "60%",
    borderRadius: "50%"
  },
  headertext: {
    textAlign: "right"
  }
});

export const GET_PROFILE = gql`
  query($username: String!) {
    userprofile(username: $username) {
      id
      fullname
      city
      state
      country
      headerPic
      profilePic
      shortdescription
      occupation
      verified
      is2fa
      user {
        id
        username
        email
        tweetSet {
          id
          tweettext
        }
        followers {
          id
          user {
            id
            email
            username
          }
        }
      }
    }
  }
`;

export default withStyles(styles)(Profile);

const PAYMENT_MUTATION = gql`
  mutation($token: String!, $userid: Int!) {
    makePayment(token: $token, userid: $userid) {
      status
      receipturl
    }
  }
`;
