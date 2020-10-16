import React, { useState } from "react";
import { Query, ApolloConsumer } from "react-apollo";
import { gql } from "apollo-boost";
import withStyles from "@material-ui/core/styles/withStyles";
import { Context } from "../../usercontext";
import Newsfeed from "../../Shared/newsfeeds";
import avatar from "../../../assets/cnnlogo.png";
// import { MyInstagramLoader } from '../../Shared/initialLoad'
import { VariableSizeList as List } from "react-window";
import NetworkError from "../../Shared/NetworkError";
import InfiniteScroll from "react-infinite-scroller";
import ReactTinyLink from "react-tiny-link";
import Randomuser from "../../Shared/Follower";
import TweetHandler from "../../Shared/TweetHandler";
import Paper from "@material-ui/core/Paper";
import { MyInstagramLoader } from "../../Shared/initialLoad";
const CnnFeed = ({ classes, history }) => {
  const cuser = React.useContext(Context);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [tempid, settempid] = React.useState(200);
  const [firstload, setFirstload] = React.useState(true);
  const [firstpage, setFirstpage] = React.useState(true);

  React.useEffect(() => {
    if (window.navigator.userAgent == "buzzrakerapp")
      window.ReactNativeWebView.postMessage(`componentReady:/feeds/tweet`);
    window.scrollTo(0, 0);
  }, []);

  let updateLikeFunction = (cache, { data: { createCnnLike } }) => {
    const feeds = cache.readQuery({
      query: GET_CNN_FEEDS,
      variables: { page: 1 }
    });

    let newfeeds = feeds.cnnfeed.map(item => {
      if (createCnnLike.feed.id == item.id) {
        let itemexist = false;
        let templikes = [];
        item.cnnfeedlikes.map(likeitem => {
          if (likeitem.user.id != cuser.id) {
            templikes.push(likeitem);
          } else {
            itemexist = true;
          }
        });

        item.cnnfeedlikes = templikes;

        if (!itemexist) {
          item.cnnfeedlikes.push({
            id: createCnnLike.likesid,
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
      query: GET_CNN_FEEDS,
      data: { cnnfeed: newfeeds },
      variables: { page: 1 }
    });
  };

  let updateCommentFunction = (cache, { data }) => {
    const feeds = cache.readQuery({
      query: GET_CNN_FEEDS,
      variables: { page: 1 }
    });

    let newfeeds = feeds.cnnfeed.map(item => {
      if (data.createCnnComment.feed.id == item.id) {
        item.cnnfeedcomments.push({
          id: data.createCnnComment.comment.id,
          commenttime: data.createCnnComment.comment.commenttime,
          comment: data.createCnnComment.comment.comment,
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
      query: GET_CNN_FEEDS,
      data: { cnnfeed: newfeeds },
      variables: { page: page }
    });
  };

  const updateAfterCommentDelete = (cache, data, feeditem) => {
    const feeds = cache.readQuery({
      query: GET_CNN_FEEDS,
      variables: { page: 1 }
    });

    let newfeeds = feeds.cnnfeed.map(item => {
      if (feeditem.id == item.id) {
        let tempcomments = [];
        item.cnnfeedcomments.map(commentitem => {
          if (commentitem.id != data.deleteCnnComment.commentId) {
            tempcomments.push(commentitem);
          }
        });
        item.cnnfeedcomments = tempcomments;

        return item;
      }
      return item;
    });

    cache.writeQuery({
      query: GET_CNN_FEEDS,
      data: { cnnfeed: newfeeds },
      variables: { page: page }
    });
    settempid(tempid + 1);
  };

  const Row = ({ index, style }) => <div style={style}>Row {index}</div>;
  return (
    <div className={classes.root}>
      <ApolloConsumer>
        {client => {
          client.writeData({ data: { showProfile: false } });

          return (
            <Query
              fetchPolicy="cache-and-network"
              query={GET_CNN_FEEDS}
              variables={{ page }}
            >
              {({ loading, error, data, fetchMore }) => {
                if (loading && firstload) {
                  setFirstload(false);
                  return <p>Loadinf</p>;
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
                          if (fetchMoreResult.cnnfeed.length == 0) {
                            setHasMore(false);
                            return prev;
                          }

                          return Object.assign({}, prev, {
                            cnnfeed: [
                              ...prev.cnnfeed,
                              ...fetchMoreResult.cnnfeed
                            ]
                          });
                        }
                      });
                    }}
                    hasMore={hasMore}
                    loader={
                      <div className="loader">
                        <MyInstagramLoader />
                      </div>
                    }
                  >
                    <div>
                      {firstpage
                        ? data.cnnfeed &&
                          data.cnnfeed.map((item, index) => {
                            if (index < 2 || index > 2) {
                              return (
                                <Newsfeed
                                  DELETE_COMMENT_MUTATION={
                                    DELETE_COMMENT_MUTATION
                                  }
                                  updateAfterCommentDelete={
                                    updateAfterCommentDelete
                                  }
                                  history={history}
                                  cnn={true}
                                  page={page}
                                  updateLikeFunction={updateLikeFunction}
                                  key={item.id}
                                  letter="C"
                                  updateCommentFunction={updateCommentFunction}
                                  id={item.id}
                                  refetchQuery={GET_CNN_FEEDS}
                                  CREATE_COMMENT_MUTATION={
                                    CREATE_COMMENT_MUTATION
                                  }
                                  CREATE_LIKE_MUTATION={CREATE_LIKE_MUTATION}
                                  tweetlikes={item.cnnfeedlikes}
                                  tweetcomments={item.cnnfeedcomments}
                                  item={item}
                                  avatar={avatar}
                                  propsloading={loading}
                                />
                              );
                            }
                            if (index == 2) {
                              return (
                                <>
                                  <Newsfeed
                                    DELETE_COMMENT_MUTATION={
                                      DELETE_COMMENT_MUTATION
                                    }
                                    updateAfterCommentDelete={
                                      updateAfterCommentDelete
                                    }
                                    cnn={true}
                                    history={history}
                                    page={page}
                                    updateLikeFunction={updateLikeFunction}
                                    key={item.id}
                                    letter="C"
                                    updateCommentFunction={
                                      updateCommentFunction
                                    }
                                    id={item.id}
                                    refetchQuery={GET_CNN_FEEDS}
                                    CREATE_COMMENT_MUTATION={
                                      CREATE_COMMENT_MUTATION
                                    }
                                    CREATE_LIKE_MUTATION={CREATE_LIKE_MUTATION}
                                    tweetlikes={item.cnnfeedlikes}
                                    tweetcomments={item.cnnfeedcomments}
                                    item={item}
                                    avatar={avatar}
                                    propsloading={loading}
                                  />
                                </>
                              );
                            }
                          })
                        : data.cnnfeed &&
                          data.cnnfeed.map(item => (
                            <Newsfeed
                              DELETE_COMMENT_MUTATION={DELETE_COMMENT_MUTATION}
                              updateAfterCommentDelete={
                                updateAfterCommentDelete
                              }
                              page={page}
                              updateLikeFunction={updateLikeFunction}
                              key={item.id}
                              letter="C"
                              cnn={true}
                              history={history}
                              updateCommentFunction={updateCommentFunction}
                              id={item.id}
                              refetchQuery={GET_CNN_FEEDS}
                              CREATE_COMMENT_MUTATION={CREATE_COMMENT_MUTATION}
                              CREATE_LIKE_MUTATION={CREATE_LIKE_MUTATION}
                              tweetlikes={item.cnnfeedlikes}
                              tweetcomments={item.cnnfeedcomments}
                              item={item}
                              avatar={avatar}
                              propsloading={loading}
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

export const GET_CNN_FEEDS = gql`
  query($page: Int) {
    cnnfeed(page: $page) {
      id
      title
      summary
      link
      published
      media
      cnnfeedlikes {
        id
        user {
          id
          username
          profileSet {
            profilePic
          }
        }
      }
      cnnfeedcomments {
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
    createCnnLike(tweetId: $tweetid) {
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
    createCnnComment(tweetId: $tweetid, commenttext: $commenttext) {
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
    deleteCnnComment(commentId: $commentid) {
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

export default withStyles(styles)(CnnFeed);
