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
import InfiniteScroll from "react-infinite-scroller";

import { MyInstagramLoader } from "../../Shared/initialLoad";
import NetworkError from "../../Shared/NetworkError";
import CreateComment from "../../Shared/createComment";
import Tweetbox from "../tweetbox";
import Randomuser from "../../Shared/Follower";
import TweetHandler from "../../Shared/TweetHandler";
import Paper from "@material-ui/core/Paper";

const Tweetsheet = ({ classes, setCurrentRoute }) => {
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

  let updateLikeFunction = (cache, { data: { createLike } }) => {
    const tweets = cache.readQuery({
      query: GET_TWEETS,
      variables: { username: cuser.username, page: 1 }
    });

    let newtweets = tweets.usertweets.map(item => {
      if (createLike.tweet.id == item.id) {
        let itemexist = false;
        let templikes = [];
        item.likes.map(likeitem => {
          if (likeitem.user.id != cuser.id) {
            templikes.push(likeitem);
          } else {
            itemexist = true;
          }
        });

        item.likes = templikes;

        if (!itemexist) {
          item.likes.push({
            id: createLike.likesid,
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
            __typename: "LikeType"
          });
        }

        return item;
      }
      return item;
    });

    cache.writeQuery({
      query: GET_TWEETS,
      data: { usertweets: newtweets },
      variables: { username: cuser.username }
    });
  };

  let updateCommentFunction = (cache, { data: { createComment } }) => {
    const tweets = cache.readQuery({
      query: GET_TWEETS,
      variables: { username: cuser.username, page: 1 }
    });
    let newtweets = tweets.usertweets.map(item => {
      if (createComment.tweet.id == item.id) {
        item.comments.push({
          id: createComment.comment.id,
          commenttime: createComment.comment.commenttime,
          comment: createComment.comment.comment,
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
          __typename: "CommentType"
        });

        return item;
      }
      return item;
    });

    cache.writeQuery({
      query: GET_TWEETS,
      data: { usertweets: newtweets },
      variables: { username: cuser.username, page: page }
    });
  };
  const updateAfterDelete = (cache, { data: { deleteTweet } }) => {
    const tweets = cache.readQuery({
      query: GET_TWEETS,
      variables: { username: cuser.username, page: 1 }
    });

    let newtweets = [];
    tweets.usertweets.map(item => {
      if (item.id != deleteTweet.tweetid) newtweets.push(item);
    });

    cache.writeQuery({
      query: GET_TWEETS,
      data: { usertweets: newtweets },
      variables: { username: cuser.username, page: page }
    });
  };

  const updateTweets = (cache, { data: { createTweet, hastagset } }) => {
    const { usertweets } = cache.readQuery({
      query: GET_TWEETS,
      variables: { username: cuser.username, page: 1 }
    });

    const newtweets = [createTweet.tweet].concat(usertweets);

    settempid(201);

    cache.writeQuery({
      query: GET_TWEETS,
      data: { usertweets: newtweets },
      variables: { username: cuser.username, page: page }
    });

    /*  let newtweets = tweets.usertweets.map(item => {
          if (createComment.tweet.id == item.id) {
            item.comments.push({id:createComment.commentid,
                    comment:createComment.commenttext,
                    user:{
                    id:cuser.id,
                    profileSet: [{profilePic: cuser.profileSet[0].profilePic, __typename: "ProfileType"}],
                    username: cuser.username,
                    __typename: "UserType"
                    },
                    __typename:"CommentType",
                })
              console.log(item)
              return item
          }
          return item
        })
         */
  };

  const updateAfterCommentDelete = (cache, data, feeditem) => {
    const feeds = cache.readQuery({
      query: GET_TWEETS,
      variables: { username: cuser.username, page: 1 }
    });

    let newfeeds = feeds.usertweets.map(item => {
      if (feeditem.id == item.id) {
        let tempcomments = [];
        item.comments.map(commentitem => {
          if (commentitem.id != data.deleteComment.commentId) {
            tempcomments.push(commentitem);
          }
        });
        item.comments = tempcomments;

        return item;
      }
      return item;
    });

    cache.writeQuery({
      query: GET_TWEETS,
      data: { usertweets: newfeeds },
      variables: { username: cuser.username, page: page }
    });
    settempid(tempid + 1);
  };
  return (
    <ApolloConsumer>
      {client => {
        client.writeData({ data: { showProfile: false } });

        return (
          <>
            <Tweetbox
              updateTweets={updateTweets}
              GET_TWEETS={GET_TWEETS}
              client={client}
              settempid={settempid}
              username={cuser.username}
            />

            <div className={classes.root}>
              <Query
                query={GET_TWEETS}
                variables={{ username: cuser.username, page }}
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
                            username: cuser.username,
                            page: page
                          },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;
                            if (fetchMoreResult.usertweets.length == 0) {
                              setHasMore(false);
                              return prev;
                            }

                            return Object.assign({}, prev, {
                              usertweets: [
                                ...prev.usertweets,
                                ...fetchMoreResult.usertweets
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
                        {data.usertweets &&
                          data.usertweets.map((item, index) => {
                            if (index < 2 || index >= 3) {
                              return (
                                <Singletweet
                                  reportabuse={true}
                                  key={item.id}
                                  DELETE_COMMENT_MUTATION={
                                    DELETE_COMMENT_MUTATION
                                  }
                                  page={page}
                                  updateAfterCommentDelete={
                                    updateAfterCommentDelete
                                  }
                                  updateAfterDelete={updateAfterDelete}
                                  updateLikeFunction={updateLikeFunction}
                                  updateCommentFunction={updateCommentFunction}
                                  refetchQuery={GET_TWEETS}
                                  username={cuser.username}
                                  item={item}
                                />
                              );
                            }
                            if (index == 2) {
                              return (
                                <>
                                  <div className={classes.aside}>
                                    <Paper key={1}>
                                      <Randomuser />
                                    </Paper>
                                  </div>
                                  <Singletweet
                                    reportabuse={true}
                                    key={item.id}
                                    DELETE_COMMENT_MUTATION={
                                      DELETE_COMMENT_MUTATION
                                    }
                                    page={page}
                                    updateAfterCommentDelete={
                                      updateAfterCommentDelete
                                    }
                                    updateAfterDelete={updateAfterDelete}
                                    updateLikeFunction={updateLikeFunction}
                                    updateCommentFunction={
                                      updateCommentFunction
                                    }
                                    refetchQuery={GET_TWEETS}
                                    username={cuser.username}
                                    item={item}
                                  />
                                </>
                              );
                            }
                          })}
                        {data.usertweets ? (
                          data.usertweets.length < 2 ||
                          data.usertweets.length == 0 ? (
                            <div className={classes.aside}>
                              <Paper key={1}>
                                <Randomuser />
                              </Paper>
                            </div>
                          ) : null
                        ) : null}
                      </div>
                    </InfiniteScroll>
                  );
                }}
              </Query>

              {cuser && !cuser.profileSet[0].emailverified ? (
                <div
                  style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 999
                  }}
                >
                  <Paper style={{ background: orange["300"], padding: "10px" }}>
                    <Typography variant="h6" component="h6">
                      Verify your email address to post unlimited tweets.
                      <Button
                        style={{ display: "inline-block" }}
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                          client.writeData({
                            data: { isLoggedIn: false, authRoute: "Email" }
                          })
                        }
                        className={classes.submit}
                      >
                        Verify Now
                      </Button>
                    </Typography>
                  </Paper>
                </div>
              ) : null}
            </div>
          </>
        );
      }}
    </ApolloConsumer>
  );
};

export const GET_TWEETS = gql`
  query($username: String!, $page: Int) {
    usertweets(username: $username, page: $page) {
      id
      url
      logo
      wid
      wmedia
      published
      wtext
      isRetweeted
      isUrlValid
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
        commenttime
      }
    }
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation($commentid: Int!) {
    deleteComment(commentId: $commentid) {
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
