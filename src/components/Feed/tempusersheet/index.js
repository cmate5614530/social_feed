import React, { useState } from "react";
import { Mutation, Query, ApolloConsumer } from "react-apollo";
import { gql } from "apollo-boost";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import formatTime from "../../Shared/formattime";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Slide from "@material-ui/core/Slide";
import Gavel from "@material-ui/icons/Gavel";
import VerifiedUserTwoTone from "@material-ui/icons/VerifiedUserTwoTone";
import orange from "@material-ui/core/colors/orange";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import Singletweet from "../Tweetsheet/singletweet";
import { Context } from "../../usercontext";
import InfiniteScroll from "react-infinite-scroller";

import { MyInstagramLoader } from "../../Shared/initialLoad";
import NetworkError from "../../Shared/NetworkError";
import CreateComment from "../../Shared/createComment";

import Randomuser from "../../Shared/Follower";
import TweetHandler from "../../Shared/TweetHandler";
import Paper from "@material-ui/core/Paper";
import Tweetbox from "../tweetbox";

const Tweetsheet = ({ classes, setCurrentRoute }) => {
  const cuser = React.useContext(Context);
  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [tempid, settempid] = React.useState(200);
  const [firstload, setFirstload] = React.useState(true);
  const [firstpage, setFirstpage] = React.useState(true);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ApolloConsumer>
      {client => {
        client.writeData({ data: { showProfile: false } });

        return (
          <>
            <div className={classes.root}>
              <Tweetbox client={client} />

              <Query
                query={GET_TEMP_TWEETS}
                variables={{ page }}
                fetchPolicy="cache-and-network"
              >
                {({ loading, error, data, fetchMore }) => {
                  if (loading && firstload) {
                    setFirstload(false);
                    return <MyInstagramLoader />;
                  }
                  if (error) return <NetworkError error={error} />;

                  return (
                    <InfiniteScroll
                      pageStart={1}
                      loadMore={page => {
                        setFirstpage(false);
                        fetchMore({
                          variables: {
                            page: page
                          },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;
                            if (fetchMoreResult.tempusertweet.length == 0) {
                              setHasMore(false);
                              return prev;
                            }

                            return Object.assign({}, prev, {
                              tempusertweet: [
                                ...prev.tempusertweet,
                                ...fetchMoreResult.tempusertweet
                              ]
                            });
                          }
                        });
                      }}
                      hasMore={hasMore}
                      loader={
                        <div className="loader" key={0}>
                          <MyInstagramLoader />
                        </div>
                      }
                    >
                      <div>
                        {data.tempusertweet &&
                          data.tempusertweet.map((item, index) => {
                            return (
                              <Singletweet
                                key={item.id}
                                page={page}
                                refetchQuery={GET_TEMP_TWEETS}
                                username={cuser.username}
                                item={item}
                                reportabuse={false}
                              />
                            );
                          })}
                      </div>
                    </InfiniteScroll>
                  );
                }}
              </Query>
            </div>
          </>
        );
      }}
    </ApolloConsumer>
  );
};

export const GET_TEMP_TWEETS = gql`
  query($page: Int) {
    tempusertweet(page: $page) {
      id
      url
      logo
      wid
      wmedia
      published
      wtext
      wcreatedat
      handlename {
        id
        handlename
      }
      user {
        id
        username
        profileSet {
          profilePic
        }
      }
      tweettext
      tweetcountry
      hashtagsSet {
        id
        hastag
      }
      tweetfile
      tweettime
      likes {
        id
        user {
          id
          username
          profileSet {
            profilePic
          }
        }
      }
      comments {
        id
        user {
          id
          username
          profileSet {
            profilePic
          }
        }
        comment
      }
    }
  }
`;

const styles = theme => ({
  root: {},
  aside: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  }
});

export default withStyles(styles)(Tweetsheet);
