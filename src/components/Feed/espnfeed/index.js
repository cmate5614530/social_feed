import React, { useState } from "react";
import { Mutation, Query, ApolloConsumer } from "react-apollo";
import { gql } from "apollo-boost";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

import Slide from "@material-ui/core/Slide";
import Gavel from "@material-ui/icons/Gavel";
import VerifiedUserTwoTone from "@material-ui/icons/VerifiedUserTwoTone";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import Newsfeed from "../../Shared/newsfeeds";
import avatar from "../../../assets/cnnlogo.png";
import InfiniteScroll from "react-infinite-scroller";
import { MyInstagramLoader } from "../../Shared/initialLoad";
import NetworkError from "../../Shared/NetworkError";
import { Context } from "../../usercontext";

import Randomuser from "../../Shared/Follower";
import TweetHandler from "../../Shared/TweetHandler";

const Tweetsheet = ({ classes, setCurrentRoute, history }) => {
  const cuser = React.useContext(Context);
  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [tempid, settempid] = React.useState(200);
  const [firstload, setFirstload] = React.useState(true);
  const [firstpage, setFirstpage] = React.useState(true);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (window.navigator.userAgent == "buzzrakerapp")
      window.ReactNativeWebView.postMessage(`componentReady:/feeds/tweet`);
  }, []);

  let updateLikeFunction = (cache, { data: { createEspnLike } }) => {
    const tweets = cache.readQuery({
      query: GET_ESPN_FEEDS,
      variables: { page: 1 }
    });

    let newtweets = tweets.espnfeed.map(item => {
      if (createEspnLike.feed.id == item.id) {
        let itemexist = false;
        let templikes = [];
        item.espnfeedlikes.map(likeitem => {
          if (likeitem.user.id != cuser.id) {
            templikes.push(likeitem);
          } else {
            itemexist = true;
          }
        });

        item.espnfeedlikes = templikes;
        if (!itemexist) {
          item.espnfeedlikes.push({
            id: createEspnLike.likesid,
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
      query: GET_ESPN_FEEDS,
      data: { espnfeed: newtweets }
    });
  };

  let updateCommentFunction = (cache, { data }) => {
    const feeds = cache.readQuery({
      query: GET_ESPN_FEEDS,
      variables: { page: 1 }
    });

    let newfeeds = feeds.espnfeed.map(item => {
      if (data.createEspnComment.feed.id == item.id) {
        item.espnfeedcomments.push({
          id: data.createEspnComment.comment.id,
          comment: data.createEspnComment.comment.comment,
          commenttime: data.createEspnComment.comment.commenttime,
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
      query: GET_ESPN_FEEDS,
      data: { espnfeed: newfeeds },
      variables: { page: page }
    });
  };

  const updateAfterCommentDelete = (cache, data, feeditem) => {
    const feeds = cache.readQuery({
      query: GET_ESPN_FEEDS,
      variables: { page: 1 }
    });

    let newfeeds = feeds.espnfeed.map(item => {
      if (feeditem.id == item.id) {
        let tempcomments = [];
        item.espnfeedcomments.map(commentitem => {
          if (commentitem.id != data.deleteEspnComment.commentId) {
            tempcomments.push(commentitem);
          }
        });
        item.espnfeedcomments = tempcomments;

        return item;
      }
      return item;
    });

    cache.writeQuery({
      query: GET_ESPN_FEEDS,
      data: { espnfeed: newfeeds },
      variables: { page: page }
    });
    settempid(tempid + 1);
  };
  return (
    <div className={classes.root}>
      <ApolloConsumer>
        {client => {
          client.writeData({ data: { showProfile: false } });

          return (
            <Query
              fetchPolicy="cache-and-network"
              query={GET_ESPN_FEEDS}
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
                    loadMore={tpage => {
                      setFirstpage(false);
                      fetchMore({
                        variables: {
                          page: tpage
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prev;
                          if (fetchMoreResult.espnfeed.length == 0) {
                            setHasMore(false);
                            return prev;
                          }

                          return Object.assign({}, prev, {
                            espnfeed: [
                              ...prev.espnfeed,
                              ...fetchMoreResult.espnfeed
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
                      {firstpage
                        ? data.espnfeed &&
                          data.espnfeed.map((item, index) => {
                            if (index < 2 || index > 2) {
                              return (
                                <Newsfeed
                                  key={item.id}
                                  page={page}
                                  DELETE_COMMENT_MUTATION={
                                    DELETE_COMMENT_MUTATION
                                  }
                                  updateAfterCommentDelete={
                                    updateAfterCommentDelete
                                  }
                                  updateLikeFunction={updateLikeFunction}
                                  updateCommentFunction={updateCommentFunction}
                                  id={item.id}
                                  letter="E"
                                  history={history}
                                  refetchQuery={GET_ESPN_FEEDS}
                                  CREATE_COMMENT_MUTATION={
                                    CREATE_COMMENT_MUTATION
                                  }
                                  CREATE_LIKE_MUTATION={CREATE_LIKE_MUTATION}
                                  tweetlikes={item.espnfeedlikes}
                                  tweetcomments={item.espnfeedcomments}
                                  item={item}
                                  avatar={avatar}
                                />
                              );
                            }
                            if (index == 2) {
                              return (
                                <>
                                  {/*  <div className={classes.aside}>
                                    <Paper key={1}>
                                      <Randomuser />
                                    </Paper>
                                    <Paper
                                      style={{
                                        marginTop: '10px',
                                        marginBottom: '10px'
                                      }}
                                      key={2}
                                    >
                                      <TweetHandler />
                                    </Paper>
                                  </div> */}
                                  <Newsfeed
                                    key={item.id}
                                    page={page}
                                    DELETE_COMMENT_MUTATION={
                                      DELETE_COMMENT_MUTATION
                                    }
                                    updateAfterCommentDelete={
                                      updateAfterCommentDelete
                                    }
                                    history={history}
                                    updateLikeFunction={updateLikeFunction}
                                    updateCommentFunction={
                                      updateCommentFunction
                                    }
                                    id={item.id}
                                    letter="E"
                                    refetchQuery={GET_ESPN_FEEDS}
                                    CREATE_COMMENT_MUTATION={
                                      CREATE_COMMENT_MUTATION
                                    }
                                    CREATE_LIKE_MUTATION={CREATE_LIKE_MUTATION}
                                    tweetlikes={item.espnfeedlikes}
                                    tweetcomments={item.espnfeedcomments}
                                    item={item}
                                    avatar={avatar}
                                  />
                                </>
                              );
                            }
                          })
                        : data.espnfeed &&
                          data.espnfeed.map(item => (
                            <Newsfeed
                              key={item.id}
                              page={page}
                              DELETE_COMMENT_MUTATION={DELETE_COMMENT_MUTATION}
                              updateAfterCommentDelete={
                                updateAfterCommentDelete
                              }
                              history={history}
                              updateLikeFunction={updateLikeFunction}
                              updateCommentFunction={updateCommentFunction}
                              id={item.id}
                              letter="E"
                              refetchQuery={GET_ESPN_FEEDS}
                              CREATE_COMMENT_MUTATION={CREATE_COMMENT_MUTATION}
                              CREATE_LIKE_MUTATION={CREATE_LIKE_MUTATION}
                              tweetlikes={item.espnfeedlikes}
                              tweetcomments={item.espnfeedcomments}
                              item={item}
                              avatar={avatar}
                            />
                          ))}
                    </div>
                  </InfiniteScroll>
                );
              }}
            </Query>
          );
        }}
      </ApolloConsumer>
    </div>
  );
};
export const GET_ESPN_FEEDS = gql`
  query($page: Int) {
    espnfeed(page: $page) {
      id
      title
      summary
      link
      published
      media
      espnfeedlikes {
        id
        user {
          id
          username
          profileSet {
            profilePic
          }
        }
      }
      espnfeedcomments {
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

const CREATE_LIKE_MUTATION = gql`
  mutation($tweetid: Int!) {
    createEspnLike(tweetId: $tweetid) {
      feed {
        id
      }
      likedordisliked
      likesid
    }
  }
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation($tweetid: Int!, $commenttext: String!) {
    createEspnComment(tweetId: $tweetid, commenttext: $commenttext) {
      feed {
        id
      }
      comment {
        comment
        commenttime
        id
      }
    }
  }
`;
const DELETE_COMMENT_MUTATION = gql`
  mutation($commentid: Int!) {
    deleteEspnComment(commentId: $commentid) {
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
