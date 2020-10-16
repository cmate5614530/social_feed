import React, { useState } from "react";
import { Mutation, Query } from "react-apollo";
import { gql } from "apollo-boost";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Slide from "@material-ui/core/Slide";
import Gavel from "@material-ui/icons/Gavel";
import VerifiedUserTwoTone from "@material-ui/icons/VerifiedUserTwoTone";
import Divider from "@material-ui/core/Divider";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import Showfollower from "./followerlist";
import { withRouter } from "react-router-dom";
import { StickyContainer, Sticky } from "react-sticky";
import { Context } from "../../usercontext";
import Loading from "../loading";
import Error from "../Error";

function Follower(props) {
  const cuser = React.useContext(Context);
  return (
    <div>
      <Query query={GET_RANDOM_FOLLOWERS}>
        {({ loading, error, data }) => {
        
          if (loading) return <Loading />;
          if (error) return <Error error={error} />;

          return (
            <>
              <Typography
                style={{ padding: "16px", opacity: "0.8" }}
                variant="h6"
                noWrap
              >
                Accounts To Follow
              </Typography>
              <Divider />
              <List>
                {data.randomuser.length > 0 ? (
                  data.randomuser.map(item => {
                    if (item.id != cuser.id) {
                      return (
                        <Showfollower
                          key={item.id}
                          refetchQueries={GET_RANDOM_FOLLOWERS}
                          item={item}
                          history={props.history}
                        />
                      );
                    }
                  })
                ) : (
                  <Typography
                    style={{ padding: "16px", opacity: "0.8" }}
                    variant="h6"
                    noWrap
                  >
                    No Users To Follow
                  </Typography>
                )}
              </List>
            </>
          );
        }}
      </Query>
    </div>
  );
}

export const GET_RANDOM_FOLLOWERS = gql`
  {
    randomuser {
      id
      username
      profileSet {
        profilePic
      }
    }
  }
`;

export default withRouter(Follower);
