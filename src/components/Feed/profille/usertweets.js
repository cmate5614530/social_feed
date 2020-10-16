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
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";
import Gavel from "@material-ui/icons/Gavel";
import VerifiedUserTwoTone from "@material-ui/icons/VerifiedUserTwoTone";
import InfiniteScroll from "react-infinite-scroller";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import Singletweet from "../Tweetsheet/singletweet";
import { MyInstagramLoader } from "../../Shared/initialLoad";
import { Context } from "../../usercontext";
import Error from "../../Shared/Error";

const Tweetsheet = ({
  classes,
  setCurrentRoute,
  username,
  profile,
  userid
}) => {
  const cuser = React.useContext(Context);
  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [tempid, settempid] = React.useState(200);
  const [firstload, setFirstload] = React.useState(true);

  let updateLikeFunction = (cache, { data: { createLike } }) => {
    const ptweets = cache.readQuery({
      query: GET_CURRENT_USER_TWEETS,
      variables: { username: cuser.username, page: 1 }
    });

    let newtweets = ptweets.tweets.map(item => {
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
      query: GET_CURRENT_USER_TWEETS,
      data: { tweets: newtweets },
      variables: { username: cuser.username }
    });
  };

  let updateCommentFunction = (cache, { data: { createComment } }) => {
    const ptweets = cache.readQuery({
      query: GET_CURRENT_USER_TWEETS,
      variables: { username: cuser.username, page: 1 }
    });
    let newtweets = ptweets.tweets.map(item => {
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
    cache.writeQuery({
      query: GET_CURRENT_USER_TWEETS,
      data: { tweets: newtweets },
      variables: { username: cuser.username, page: page }
    });
  };
  const updateAfterDelete = (cache, { data: { deleteTweet } }) => {
    const tweets = cache.readQuery({
      query: GET_CURRENT_USER_TWEETS,
      variables: { username: cuser.username, page: 1 }
    });

    let newtweets = [];
    tweets.tweets.map(item => {
      if (item.id != deleteTweet.tweetid) newtweets.push(item);
    });

    cache.writeQuery({
      query: GET_CURRENT_USER_TWEETS,
      data: { tweets: newtweets },
      variables: { username: cuser.username, page: page }
    });
  };

  const updateAfterCommentDelete = (cache, data, feeditem) => {
    const feeds = cache.readQuery({
      query: GET_CURRENT_USER_TWEETS,
      variables: { username: cuser.username, page: 1 }
    });

    let newfeeds = feeds.tweets.map(item => {
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
      query: GET_CURRENT_USER_TWEETS,
      data: { tweets: newfeeds },
      variables: { username: cuser.username, page: page }
    });
    settempid(tempid + 1);
  };

  return (
    /*     <ApolloConsumer>

      {client => {
         client.cache.writeQuery({
          query: GET_CURRENT_USER_TWEETS,
          data: { tweets: [] },
          variables:{username:username, page:page}
        });
        return (  */
    <div className={classes.root}>
      <Query
        query={GET_CURRENT_USER_TWEETS}
        fetchPolicy="cache-and-network"
        variables={{ username: username, page: 1 }}
      >
        {({ loading, error, data, fetchMore }) => {
          if (loading && firstload) {
            setFirstload(false);
            return <MyInstagramLoader />;
          }
          if (error) return <Error error={error} />;

          return (
            <div>
              <Grid container spacing={3}>
                <Grid style={{ background: "#eeeeee" }} item xs={12} md={4}>
                  <div>
                    <Typography
                      style={{
                        border: "1px solid indigo",
                        paddingLeft: "10px",
                        borderRightRadius: "50%",
                        borderBottomRightRadius: "1em",
                        borderTopRightRadius: "1em",
                        marginBottom: "16px",
                        fontWeight: "initial",
                        fontSize: "1rem",
                        background: "indigo",
                        color: "white"
                      }}
                      variant="h6"
                      component="p"
                    >
                      @{username} Tweets
                    </Typography>
                  </div>
                </Grid>

                <Grid item xs={12} md={8}>
                  <InfiniteScroll
                    pageStart={1}
                    loadMore={page => {
                      fetchMore({
                        variables: {
                          username: username,
                          page: page
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prev;
                          if (fetchMoreResult.tweets.length == 0) {
                            setHasMore(false);
                            return prev;
                          }

                          return Object.assign({}, prev, {
                            tweets: [...prev.tweets, ...fetchMoreResult.tweets]
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
                      {data.tweets &&
                        data.tweets.map(item => (
                          <Singletweet
                            updateAfterDelete={updateAfterDelete}
                            username={username}
                            DELETE_COMMENT_MUTATION={DELETE_COMMENT_MUTATION}
                            updateCommentFunction={updateCommentFunction}
                            updateLikeFunction={updateLikeFunction}
                            profilePic={profile.profilePic}
                            updateAfterCommentDelete={updateAfterCommentDelete}
                            item={item}
                          />
                        ))}
                    </div>
                  </InfiniteScroll>
                </Grid>
              </Grid>
            </div>
          );
        }}
      </Query>
    </div>
    /*       )
      }}
    </ApolloConsumer>  */
  );
};

const DELETE_COMMENT_MUTATION = gql`
  mutation($commentid: Int!) {
    deleteComment(commentId: $commentid) {
      commentId
    }
  }
`;

export const GET_CURRENT_USER_TWEETS = gql`
  query($username: String!, $page: Int) {
    tweets(username: $username, page: $page) {
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

const styles = theme => ({});

export default withStyles(styles)(Tweetsheet);
