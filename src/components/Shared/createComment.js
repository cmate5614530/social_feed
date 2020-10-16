import React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import avatar from "../../assets/avatar.jpeg";
import { GET_TWEETS } from "../Feed/Tweetsheet/index";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import Send from "@material-ui/icons/Send";
import { Context } from "../usercontext";
import { STATIC_URL } from "../../config";
import Error from "./Error";

const useStyles = makeStyles({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    background: "#bbb",
    marginBottom: "8px"
  },
  input: {
    marginLeft: 8,
    flex: 8
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
});

export default function CreateComment({
  tweetid,
  CREATE_COMMENT_MUTATION,
  setCommentLoading,
  updateCommentFunction,
  refetch
}) {
  const cuser = React.useContext(Context);
  const classes = useStyles();
  const [commenttext, setComment] = React.useState("");
  let handleCommentCreate = async createComment => {
    if (commenttext != "") {
      setComment("");
      const res = await createComment();
      console.log(res);
    }
  };

  return (
    <Mutation
      mutation={CREATE_COMMENT_MUTATION}
      variables={{ tweetid: tweetid, commenttext: commenttext }}
      onCompleted={data => {}}
      update={(cache, data) => {
        if (refetch) {
          refetch();
        } else {
          updateCommentFunction(cache, data);
        }
      }}
      /* refetchQueries={() =>{
          if (username)
          return [{ query: refetchQuery, variables:{username:username, page:page} }]
          else
          return [{ query: refetchQuery, variables:{page:page}}]
        }} 
         */
    >
      {(createComment, { loading, error }) => {
        if (loading) setCommentLoading(true);
        else setCommentLoading(false);
        if (error) {
          setCommentLoading(false);
        }

        return (
          <div className={classes.root} onClick={e => e.stopPropagation()}>
            <IconButton className={classes.iconButton} aria-label="Menu">
              <Avatar
                style={{ width: "32px", height: "32px" }}
                src={`${STATIC_URL}${cuser.profileSet[0].profilePic}`}
              />
            </IconButton>
            <InputBase
              variant="filled"
              className={classes.input}
              onChange={e => setComment(e.target.value)}
              placeholder="Write Something"
              value={commenttext}
              inputProps={{ "aria-label": "Search Google Maps" }}
            />
            <Divider className={classes.divider} />
            <IconButton
              color="primary"
              onClick={e => {
                e.stopPropagation();
                handleCommentCreate(createComment);
              }}
              className={classes.iconButton}
              aria-label="Directions"
            >
              <Send />
            </IconButton>
          </div>
        );
      }}
    </Mutation>
  );
}
