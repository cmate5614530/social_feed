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
import { Context } from "../../usercontext";
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
import Randomuser from "../../Shared/Follower";
import TweetHandler from "../../Shared/TweetHandler";

const Tweetsheet = ({ classes, setCurrentRoute, history }) => {
  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const cuser = React.useContext(Context);
  const [tempid, settempid] = React.useState(200);
  const [firstload, setFirstload] = React.useState(true);
  const [firstpage, setFirstpage] = React.useState(true);

  React.useEffect(() => {
    if (window.navigator.userAgent == "buzzrakerapp")
      window.ReactNativeWebView.postMessage(`componentReady:/feeds/tweet`);
    window.scrollTo(0, 0);
  }, []);

  let updateLikeFunction = (cache, { data: { createFoxLike } }) => {
    const tweets = cache.readQuery({
      query: GET_FOX_FEEDS,
      variables: { page: 1 }
    });

    let newtweets = tweets.foxfeed.map(item => {
      if (createFoxLike.feed.id == item.id) {
        let itemexist = false;
        let templikes = [];
        item.foxfeedlikes.map(likeitem => {
          if (likeitem.user.id != cuser.id) {
            templikes.push(likeitem);
          } else {
            itemexist = true;
          }
        });

        item.foxfeedlikes = templikes;
        if (!itemexist) {
          item.foxfeedlikes.push({
            id: createFoxLike.likesid,
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
      query: GET_FOX_FEEDS,
      data: { foxfeed: newtweets }
    });
  };

  let updateCommentFunction = (cache, { data }) => {
    const feeds = cache.readQuery({
      query: GET_FOX_FEEDS,
      variables: { page: 1 }
    });

    let newfeeds = feeds.foxfeed.map(item => {
      if (data.createFoxComment.feed.id == item.id) {
        item.foxfeedcomments.push({
          id: data.createFoxComment.comment.id,
          comment: data.createFoxComment.comment.comment,
          commenttime: data.createFoxComment.comment.commenttime,
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
      query: GET_FOX_FEEDS,
      data: { foxfeed: newfeeds },
      variables: { page: page }
    });
  };

  const updateAfterCommentDelete = (cache, data, feeditem) => {
    const feeds = cache.readQuery({
      query: GET_FOX_FEEDS,
      variables: { page: 1 }
    });

    let newfeeds = feeds.foxfeed.map(item => {
      if (feeditem.id == item.id) {
        let tempcomments = [];
        item.foxfeedcomments.map(commentitem => {
          if (commentitem.id != data.deleteFoxComment.commentId) {
            tempcomments.push(commentitem);
          }
        });
        item.foxfeedcomments = tempcomments;

        return item;
      }
      return item;
    });

    cache.writeQuery({
      query: GET_FOX_FEEDS,
      data: { foxfeed: newfeeds },
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
              query={GET_FOX_FEEDS}
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
                          if (fetchMoreResult.foxfeed.length == 0) {
                            setHasMore(false);
                            return prev;
                          }

                          return Object.assign({}, prev, {
                            foxfeed: [
                              ...prev.foxfeed,
                              ...fetchMoreResult.foxfeed
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
                        ? data.foxfeed &&
                          data.foxfeed.map((item, index) => {
                            if (index < 2 || index > 2) {
                              return (
                                <Newsfeed
                                  key={item.id}
                                  page={page}
                                  fox={true}
                                  history={history}
                                  updateCommentFunction={updateCommentFunction}
                                  id={item.id}
                                  DELETE_COMMENT_MUTATION={
                                    DELETE_COMMENT_MUTATION
                                  }
                                  letter="F"
                                  updateAfterCommentDelete={
                                    updateAfterCommentDelete
                                  }
                                  updateLikeFunction={updateLikeFunction}
                                  refetchQuery={GET_FOX_FEEDS}
                                  CREATE_COMMENT_MUTATION={
                                    CREATE_COMMENT_MUTATION
                                  }
                                  CREATE_LIKE_MUTATION={CREATE_LIKE_MUTATION}
                                  tweetlikes={item.foxfeedlikes}
                                  tweetcomments={item.foxfeedcomments}
                                  item={item}
                                  avatar={avatar}
                                />
                              );
                            }
                            if (index == 2) {
                              return (
                                <>
                                  {/* <div className={classes.aside}>
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
                                    fox={true}
                                    updateCommentFunction={
                                      updateCommentFunction
                                    }
                                    history={history}
                                    id={item.id}
                                    DELETE_COMMENT_MUTATION={
                                      DELETE_COMMENT_MUTATION
                                    }
                                    letter="F"
                                    updateAfterCommentDelete={
                                      updateAfterCommentDelete
                                    }
                                    updateLikeFunction={updateLikeFunction}
                                    refetchQuery={GET_FOX_FEEDS}
                                    CREATE_COMMENT_MUTATION={
                                      CREATE_COMMENT_MUTATION
                                    }
                                    CREATE_LIKE_MUTATION={CREATE_LIKE_MUTATION}
                                    tweetlikes={item.foxfeedlikes}
                                    tweetcomments={item.foxfeedcomments}
                                    item={item}
                                    avatar={avatar}
                                  />
                                </>
                              );
                            }
                          })
                        : data.foxfeed &&
                          data.foxfeed.map(item => (
                            <Newsfeed
                              fox={true}
                              key={item.id}
                              page={page}
                              updateCommentFunction={updateCommentFunction}
                              id={item.id}
                              DELETE_COMMENT_MUTATION={DELETE_COMMENT_MUTATION}
                              letter="F"
                              history={history}
                              updateAfterCommentDelete={
                                updateAfterCommentDelete
                              }
                              updateLikeFunction={updateLikeFunction}
                              refetchQuery={GET_FOX_FEEDS}
                              CREATE_COMMENT_MUTATION={CREATE_COMMENT_MUTATION}
                              CREATE_LIKE_MUTATION={CREATE_LIKE_MUTATION}
                              tweetlikes={item.foxfeedlikes}
                              tweetcomments={item.foxfeedcomments}
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
export const GET_FOX_FEEDS = gql`
  query($page: Int) {
    foxfeed(page: $page) {
      id
      title
      summary
      link
      published
      media
      foxfeedlikes {
        id
        user {
          id
          username
          profileSet {
            profilePic
          }
        }
      }
      foxfeedcomments {
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
    createFoxLike(tweetId: $tweetid) {
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
    createFoxComment(tweetId: $tweetid, commenttext: $commenttext) {
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
    deleteFoxComment(commentId: $commentid) {
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
