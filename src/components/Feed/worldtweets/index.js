import React, { useState } from "react";
import { Mutation, Query, ApolloConsumer } from "react-apollo";
import { gql } from "apollo-boost";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";

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
import Singletweet from "./singletweet";
import { Context } from "../../usercontext";

import { MyInstagramLoader } from "../../Shared/initialLoad";
import NetworkError from "../../Shared/NetworkError";

import InfiniteScroll from "react-infinite-scroller";
import Randomuser from "../../Shared/Follower";
import TweetHandler from "../../Shared/TweetHandler";
import Paper from "@material-ui/core/Paper";

const Tweetsheet = ({ classes, setCurrentRoute, history }) => {
  const cuser = React.useContext(Context);
  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [tempid, settempid] = React.useState(200);
  const [firstload, setFirstload] = React.useState(true);
  const [firstpage, setFirstpage] = React.useState(true);
  React.useEffect(() => {
    if (window.navigator.userAgent == "buzzrakerapp")
      window.ReactNativeWebView.postMessage(`componentReady:/feeds/tweet`);
    window.scrollTo(0, 0);
  }, []);

  let updateLikeFunction = (cache, { data: { createWorldtweetLike } }) => {
    const feeds = cache.readQuery({
      query: GET_WORLD_TWEETS,
      variables: { page: 1 }
    });

    let newfeeds = feeds.worldtweets.map(item => {
      if (createWorldtweetLike.feed.id == item.id) {
        let itemexist = false;
        let templikes = [];
        item.worldtweetlikes.map(likeitem => {
          if (likeitem.user.id != cuser.id) {
            templikes.push(likeitem);
          } else {
            itemexist = true;
          }
        });

        item.worldtweetlikes = templikes;

        if (!itemexist) {
          item.worldtweetlikes.push({
            id: createWorldtweetLike.likesid,
            user: {
              id: cuser.id,
              profileSet: [
                {
                  profilePic: cuser.profileSet[0].profilePic,
                  __typename: "ProfileType"
                }
              ],
              username: cuser.username,
              __typename: "UserType"
            },
            __typename: "CNNLikeType"
          });
        }

        return item;
      }
      return item;
    });
    settempid(tempid + 1);

    cache.writeQuery({
      query: GET_WORLD_TWEETS,
      data: { worldtweets: newfeeds },
      variables: { page: 1 }
    });
  };

  let updateCommentFunction = (cache, { data }) => {
    const feeds = cache.readQuery({
      query: GET_WORLD_TWEETS,
      variables: { page: page }
    });

    let newfeeds = feeds.worldtweets.map(item => {
      if (data.createWorldtweetComment.feed.id == item.id) {
        item.worldtweetcomments.push({
          id: data.createWorldtweetComment.comment.id,
          comment: data.createWorldtweetComment.comment.comment,
          commenttime: data.createWorldtweetComment.comment.commenttime,
          user: {
            id: cuser.id,
            profileSet: [
              {
                profilePic: cuser.profileSet[0].profilePic,
                __typename: "ProfileType"
              }
            ],
            username: cuser.username,
            __typename: "UserType"
          },
          __typename: "CNNCommentType"
        });

        return item;
      }
      return item;
    });

    cache.writeQuery({
      query: GET_WORLD_TWEETS,
      data: { worldtweets: newfeeds },
      variables: { page: page }
    });
  };
  const updateAfterCommentDelete = (cache, data, feeditem) => {
    const feeds = cache.readQuery({
      query: GET_WORLD_TWEETS,
      variables: { page: 1 }
    });

    let newfeeds = feeds.worldtweets.map(item => {
      if (feeditem.id == item.id) {
        let tempcomments = [];
        item.worldtweetcomments.map(commentitem => {
          if (commentitem.id != data.deleteWorldtweetComment.commentId) {
            tempcomments.push(commentitem);
          }
        });
        item.worldtweetcomments = tempcomments;

        return item;
      }
      return item;
    });

    cache.writeQuery({
      query: GET_WORLD_TWEETS,
      data: { cworldtweets: newfeeds },
      variables: { page: page }
    });
    settempid(tempid + 1);
  };
  return (
    <ApolloConsumer>
      {client => {
        client.writeData({ data: { showProfile: false } });

        return (
          <div className={classes.root}>
            <Query
              fetchPolicy="cache-and-network"
              query={GET_WORLD_TWEETS}
              variables={{ page }}
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
                          if (fetchMoreResult.worldtweets.length == 0) {
                            setHasMore(false);
                            return prev;
                          }

                          return Object.assign({}, prev, {
                            worldtweets: [
                              ...prev.worldtweets,
                              ...fetchMoreResult.worldtweets
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
                      {data.worldtweets &&
                        data.worldtweets.map((item, index) => {
                          if (index < 2 || index > 2) {
                            return (
                              <Singletweet
                                page={page}
                                DELETE_COMMENT_MUTATION={
                                  DELETE_COMMENT_MUTATION
                                }
                                updateLikeFunction={updateLikeFunction}
                                updateCommentFunction={updateCommentFunction}
                                key={item.id}
                                page={page}
                                history={history}
                                updateAfterCommentDelete={
                                  updateAfterCommentDelete
                                }
                                item={item}
                                id={item.id}
                                propsloading={loading}
                              />
                            );
                          }
                          if (index == 2) {
                            return (
                              <>
                                <div className={classes.aside}>
                                  {/* <Paper key={1}>
                                      <Randomuser />
                                    </Paper> */}
                                  <Paper
                                    style={{
                                      marginTop: "10px",
                                      marginBottom: "10px"
                                    }}
                                    key={2}
                                  >
                                    <TweetHandler />
                                  </Paper>
                                </div>
                                <Singletweet
                                  page={page}
                                  history={history}
                                  DELETE_COMMENT_MUTATION={
                                    DELETE_COMMENT_MUTATION
                                  }
                                  updateLikeFunction={updateLikeFunction}
                                  updateCommentFunction={updateCommentFunction}
                                  key={item.id}
                                  page={page}
                                  updateAfterCommentDelete={
                                    updateAfterCommentDelete
                                  }
                                  item={item}
                                  id={item.id}
                                  propsloading={loading}
                                />
                              </>
                            );
                          }
                        })}

                      {data.worldtweets ? (
                        data.worldtweets.length == 0 ? (
                          <div className={classes.aside}>
                            <Paper
                              style={{
                                marginTop: "10px",
                                marginBottom: "10px"
                              }}
                              key={2}
                            >
                              <TweetHandler />
                            </Paper>
                          </div>
                        ) : null
                      ) : null}
                    </div>
                  </InfiniteScroll>
                );
              }}
            </Query>
          </div>
        );
      }}
    </ApolloConsumer>
  );
};

export const GET_WORLD_TWEETS = gql`
  query($page: Int) {
    worldtweets(page: $page) {
      id
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
      worldtweetlikes {
        id
        user {
          id
          username
          profileSet {
            profilePic
          }
        }
      }
      worldtweetcomments {
        id
        user {
          id
          username
          profileSet {
            profilePic
          }
        }
        comment
        commenttime
      }
    }
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation($commentid: Int!) {
    deleteWorldtweetComment(commentId: $commentid) {
      commentId
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
