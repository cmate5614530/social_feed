import React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { GET_TWEETS } from "../Feed/Tweetsheet/index";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import { Context } from "../usercontext";
import Loading from "./loading";
import Error from "./Error";
import Success from "./success";

const useStyles = makeStyles(theme => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));

export default function Createlike({
  expanded,
  isTweet,
  userid,
  setExpanded,
  updateLikeFunction,
  likes,
  tweetid,
  refetch,
  setLikesLoading,
  CREATE_LIKE_MUTATION,
  refetchQuery,
  username,
  page
}) {
  const cuser = React.useContext(Context);

  const classes = useStyles();
  let handleLikeCreate = async createLike => {
    setExpanded("likes");
    if (cuser && isTweet) {
      if (userid != cuser.id) {
        const res = await createLike();
      }
    }
    if (!isTweet) {
      const res = await createLike();
    }
  };
  const handleIconColor = () => {
    let isLiked = false;
    likes.map(ietm => {
      if (ietm.user.username == cuser.username) isLiked = true;
    });
    if (isLiked) return <FavoriteIcon style={{ color: "indigo" }} />;
    else return <FavoriteIcon />;
  };
  return (
    <Mutation
      mutation={CREATE_LIKE_MUTATION}
      variables={{ tweetid: tweetid }}
      onCompleted={data => {
        // console.log(data)
      }}
      update={(cache, data) => {
        if (refetch) {
          refetch();
        } else {
          updateLikeFunction(cache, data);
        }
      }}

      /*  refetchQueries={() =>{
          if (username)
          return [{ query: refetchQuery, variables:{username:username, page:page} }]
          else
          return [{ query: refetchQuery, variables:{page:page}}]
        }}
         */
    >
      {(createLike, { loading, error }) => {
        if (loading) {
          setLikesLoading(true);
        } else {
          setLikesLoading(false);
        }

        if (error) setLikesLoading(false);

        return (
          <>
            {error && <Error error={error} />}

            <span className="likeIcon">
              {likes.length}
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded == "likes"
                })}
                onClick={e => {
                  e.stopPropagation();
                  handleLikeCreate(createLike);
                }}
                aria-expanded={expanded}
                aria-label="Show more"
                style={{ paddingLeft: "5px" }}
                aria-label="Share"
              >
                {handleIconColor()}
              </IconButton>
            </span>
          </>
        );
      }}
    </Mutation>
  );
}
