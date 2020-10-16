import React, { useState } from "react";
import { Mutation, Query, ApolloConsumer } from "react-apollo";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Newsfeed from "../../Shared/newsfeeds";
import FormControl from "@material-ui/core/FormControl";
import avatar from "../../../assets/cnnlogo.png";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Slide from "@material-ui/core/Slide";
import Gavel from "@material-ui/icons/Gavel";
import VerifiedUserTwoTone from "@material-ui/icons/VerifiedUserTwoTone";
import orange from "@material-ui/core/colors/orange";
import WorldTweetSingle from "../worldtweets/singletweet";
import Singletweet from "../Tweetsheet/singletweet";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";

import { Context } from "../../usercontext";
import InfiniteScroll from "react-infinite-scroller";

import { MyInstagramLoader } from "../../Shared/initialLoad";
import NetworkError from "../../Shared/NetworkError";
import CreateComment from "../../Shared/createComment";
import Tweetbox from "../tweetbox";
import Randomuser from "../../Shared/Follower";
import TweetHandler from "../../Shared/TweetHandler";
import Paper from "@material-ui/core/Paper";

export default function Share(props) {
  const [id, setId] = React.useState(false);
  const [type, setType] = React.useState("");
  const [error, setError] = React.useState(false);
  React.useEffect(() => {
    const { link } = props.match.params;

    let splittedLink = link.split("-");
    if (splittedLink.length == 2) {
      setId(splittedLink[1]);
      setType(splittedLink[0]);
    } else {
      setError(true);
    }
  }, []);

  if (error) {
    return <p>An error occurred</p>;
  }

  return <Showfeeds type={type} id={id} />;
}

function Showfeeds(props) {
  if (props.type == "cnn") {
    return (
      <Query
        query={GET_CNN_FEEDS}
        variables={{ title: props.id }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data, refetch }) => {
          if (loading) {
            return <MyInstagramLoader />;
          }
          if (error) return <NetworkError error={error} />;
          let item = data.cnnfeedone;

          return (
            <Newsfeed
              DELETE_COMMENT_MUTATION={DELETE_CNN_COMMENT_MUTATION}
              cnn={true}
              key={item.id}
              letter="C"
              id={item.id}
              refetch={refetch}
              refetchQuery={GET_CNN_FEEDS}
              CREATE_COMMENT_MUTATION={CREATE_CNN_COMMENT_MUTATION}
              CREATE_LIKE_MUTATION={CREATE_CNN_LIKE_MUTATION}
              tweetlikes={item.cnnfeedlikes}
              tweetcomments={item.cnnfeedcomments}
              item={item}
              avatar={avatar}
              propsloading={loading}
            />
          );
        }}
      </Query>
    );
  }
  if (props.type == "espn") {
    return (
      <Query
        query={GET_ESPN_FEEDS}
        variables={{ title: props.id }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data, refetch }) => {
          if (loading) {
            return <MyInstagramLoader />;
          }
          if (error) return <NetworkError error={error} />;
          let item = data.espnfeedone;

          return (
            <Newsfeed
              key={item.id}
              DELETE_COMMENT_MUTATION={DELETE_ESPN_COMMENT_MUTATION}
              id={item.id}
              letter="E"
              refetch={refetch}
              CREATE_COMMENT_MUTATION={CREATE_ESPN_COMMENT_MUTATION}
              CREATE_LIKE_MUTATION={CREATE_ESPN_LIKE_MUTATION}
              tweetlikes={item.espnfeedlikes}
              tweetcomments={item.espnfeedcomments}
              item={item}
              avatar={avatar}
            />
          );
        }}
      </Query>
    );
  }
  if (props.type == "fox") {
    return (
      <Query
        query={GET_FOX_FEEDS}
        variables={{ title: props.id }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data, refetch }) => {
          if (loading) {
            return <MyInstagramLoader />;
          }
          if (error) return <NetworkError error={error} />;
          let item = data.foxfeedone;

          return (
            <Newsfeed
              key={item.id}
              fox={true}
              id={item.id}
              DELETE_COMMENT_MUTATION={DELETE_FOX_COMMENT_MUTATION}
              letter="F"
              refetch={refetch}
              CREATE_COMMENT_MUTATION={CREATE_FOX_COMMENT_MUTATION}
              CREATE_LIKE_MUTATION={CREATE_FOX_LIKE_MUTATION}
              tweetlikes={item.foxfeedlikes}
              tweetcomments={item.foxfeedcomments}
              item={item}
              avatar={avatar}
            />
          );
        }}
      </Query>
    );
  }
  if (props.type == "worldtweet") {
    return (
      <Query
        query={GET_WORLD_TWEETS}
        variables={{ title: props.id }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data, refetch }) => {
          if (loading) {
            return <MyInstagramLoader />;
          }
          if (error) return <NetworkError error={error} />;
          let item = data.worldtweetsone;

          return (
            <WorldTweetSingle
              DELETE_COMMENT_MUTATION={DELETE_WORLDTWEET_COMMENT_MUTATION}
              key={item.id}
              refetch={refetch}
              item={item}
              id={item.id}
              propsloading={loading}
            />
          );
        }}
      </Query>
    );
  }
  if (props.type == "tweet") {
    return (
      <Query
        query={GET_TWEETS}
        variables={{ title: props.id }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data, refetch }) => {
          if (loading) {
            return <MyInstagramLoader />;
          }
          if (error) return <NetworkError error={error} />;
          let item = data.tweetone;

          return (
            <Singletweet
              reportabuse={true}
              key={item.id}
              refetch={refetch}
              refetchQuery={GET_TWEETS}
              item={item}
            />
          );
        }}
      </Query>
    );
  }
  return <p>Feed not found</p>;
}

export const GET_TWEETS = gql`
  query($title: String) {
    tweetone(title: $title) {
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

const CHECK_FEED_TYPE = gql`
  query($feedtitle: String!) {
    checkfeedtype(title: $feedtitle)
  }
`;

export const GET_CNN_FEEDS = gql`
  query($title: String) {
    cnnfeedone(title: $title) {
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

const CREATE_CNN_LIKE_MUTATION = gql`
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

const DELETE_CNN_COMMENT_MUTATION = gql`
  mutation($commentid: Int!) {
    deleteCnnComment(commentId: $commentid) {
      commentId
    }
  }
`;
const CREATE_CNN_COMMENT_MUTATION = gql`
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

export const GET_ESPN_FEEDS = gql`
  query($title: String) {
    espnfeedone(title: $title) {
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

const CREATE_ESPN_LIKE_MUTATION = gql`
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

const CREATE_ESPN_COMMENT_MUTATION = gql`
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
const DELETE_ESPN_COMMENT_MUTATION = gql`
  mutation($commentid: Int!) {
    deleteEspnComment(commentId: $commentid) {
      commentId
    }
  }
`;

export const GET_FOX_FEEDS = gql`
  query($title: String) {
    foxfeedone(title: $title) {
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

const CREATE_FOX_LIKE_MUTATION = gql`
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

const CREATE_FOX_COMMENT_MUTATION = gql`
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

const DELETE_FOX_COMMENT_MUTATION = gql`
  mutation($commentid: Int!) {
    deleteFoxComment(commentId: $commentid) {
      commentId
    }
  }
`;

export const GET_WORLD_TWEETS = gql`
  query($title: String) {
    worldtweetsone(title: $title) {
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
      }
    }
  }
`;

const DELETE_WORLDTWEET_COMMENT_MUTATION = gql`
  mutation($commentid: Int!) {
    deleteWorldtweetComment(commentId: $commentid) {
      commentId
    }
  }
`;

const CREATE_WORLDTWEET_LIKE_MUTATION = gql`
  mutation($tweetid: Int!) {
    createWorldtweetLike(tweetId: $tweetid) {
      feed {
        id
      }
      likedordisliked
      likesid
    }
  }
`;

const CREATE_WORLDTWEET_COMMENT_MUTATION = gql`
  mutation($tweetid: Int!, $commenttext: String!) {
    createWorldtweetComment(tweetId: $tweetid, commenttext: $commenttext) {
      feed {
        id
      }
      commentid
      commenttext
    }
  }
`;
