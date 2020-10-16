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
import Tweetbox from "../tweetbox";

const Tweetsheet = ({ classes, setCurrentRoute, match }) => {
  const cuser = React.useContext(Context);
  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [tempid, settempid] = React.useState(200);
  const [firstload, setFirstload] = React.useState(true);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let updateLikeFunction = (cache, { data: { createLike } }) => {
    const tweets = cache.readQuery({
      query: GET_HASHTAG,
      variables: { hashtag: match.params.hashtag, page: 1 }
    });

    let newtweets = tweets.hashtags[0].tweet.map(item => {
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

    tweets.hashtags[0].tweet = newtweets;
    cache.writeQuery({
      query: GET_HASHTAG,
      data: { hashtags: tweets.hashtag },
      variables: { hashtag: match.params.hashtag, page: 1 }
    });
  };

  let updateCommentFunction = (cache, { data: { createComment } }) => {
    const tweets = cache.readQuery({
      query: GET_HASHTAG,
      variables: { hashtag: match.params.hashtag, page: 1 }
    });
    let newtweets = tweets.hashtags[0].tweet.map(item => {
      if (createComment.tweet.id == item.id) {
        item.comments.push({
          id: createComment.comment.id,
          comment: createComment.comment.comment,
          commenttime: createComment.comment.commenttime,
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
    tweets.hashtags[0].tweet = newtweets;
    cache.writeQuery({
      query: GET_HASHTAG,
      data: { hashtags: tweets.hashtags },
      variables: { hashtag: match.params.hashtag, page: page }
    });
  };

  const updateAfterDelete = (cache, { data: { deleteTweet } }) => {
    const tweets = cache.readQuery({
      query: GET_HASHTAG,
      variables: { hashtag: match.params.hashtag, page: 1 }
    });

    let newtweets = [];
    tweets.hashtags[0].tweet.map(item => {
      if (item.id != deleteTweet.tweetid) newtweets.push(item);
    });
    tweets.hashtags[0].tweet = newtweets;

    settempid(tempid + 1);
    cache.writeQuery({
      query: GET_HASHTAG,
      data: { hashtags: tweets.hashtags },
      variables: { hashtag: match.params.hashtag, page: page }
    });
  };

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

  const updateAfterCommentDelete = (cache, data, feeditem) => {
    const feeds = cache.readQuery({
      query: GET_HASHTAG,
      variables: { hashtag: match.params.hashtag, page: 1 }
    });

    let newfeeds = feeds.hashtags[0].tweet.map(item => {
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

    feeds.hashtags[0].tweet = newfeeds;
    cache.writeQuery({
      query: GET_HASHTAG,
      data: { hashtags: feeds.hashtags },
      variables: { hashtag: match.params.hashtag, page: 1 }
    });
    settempid(tempid + 1);
  };
  return (
    <ApolloConsumer>
      {client => {
        client.writeData({ data: { showProfile: false } });

        return (
          <>
            <div className={classes.root}>
              <Query
                query={GET_HASHTAG}
                variables={{ hashtag: match.params.hashtag, page }}
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
                        fetchMore({
                          variables: {
                            hashtag: match.params.hashtag,
                            page: page
                          },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;
                            if (fetchMoreResult.hashtags.length == 0) {
                              setHasMore(false);
                              return prev;
                            }

                            return Object.assign({}, prev, {
                              hashtags: [
                                ...prev.hashtags,
                                ...fetchMoreResult.hashtags
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
                        {data.hashtags &&
                          data.hashtags[0].tweet.map(item => (
                            <Singletweet
                              key={item.id}
                              DELETE_COMMENT_MUTATION={DELETE_COMMENT_MUTATION}
                              page={page}
                              updateAfterCommentDelete={
                                updateAfterCommentDelete
                              }
                              updateAfterDelete={updateAfterDelete}
                              updateLikeFunction={updateLikeFunction}
                              updateCommentFunction={updateCommentFunction}
                              refetchQuery={GET_HASHTAG}
                              username={cuser.username}
                              item={item}
                            />
                          ))}
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

export const GET_HASHTAG = gql`
  query($hashtag: String!, $page: Int) {
    hashtags(hashtag: $hashtag, page: $page) {
      id
      tweet {
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
        tweetfile
        tweettime
        hashtagsSet {
          id
          hastag
        }
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
  root: {
    padding: 20
  }
});

export default withStyles(styles)(Tweetsheet);
