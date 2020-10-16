import React from "react";
import Createcomment from "./createComment";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { FixedSizeList } from "react-window";
import Avatar from "@material-ui/core/Avatar";
import avatar from "../../assets/avatar.jpeg";
import PropTypes from "prop-types";
import { STATIC_URL } from "../../config";
import { Context } from "../usercontext";
import { withRouter } from "react-router-dom";
import Loading from "../Shared/loading";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import "./commentshow.css";
import Error from "./Error";
import { Mutation } from "react-apollo";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: 400,
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  showless: {
    width: "100%",
    mexWidth: 360,
    backgroundColor: "#eee"
  },
  deleteicon: {
    "&:hover": {
      cursor: "pointer"
    }
  }
}));

function Row(props) {
  const { index, style } = props;

  return (
    <ListItem key={props.item.id} button>
      <ListItemAvatar>
        <Avatar src={avatar} />
      </ListItemAvatar>
      <ListItemText id={"1"} primary={"eklwdff"} />
    </ListItem>
  );
}

Row.propTypes = {
  index: PropTypes.number,
  style: PropTypes.object
};

function Commentshow(props) {
  const cuser = React.useContext(Context);
  const classes = useStyles();
  const handleDelete = deleteComment => {
    deleteComment();
  };

  return (
    <div>
      {cuser && (
        <Createcomment
          updateCommentFunction={props.updateCommentFunction}
          setCommentLoading={props.setCommentLoading}
          page={props.page}
          username={props.username}
          CREATE_COMMENT_MUTATION={props.CREATE_COMMENT_MUTATION}
          refetchQuery={props.refetchQuery}
          item={props.item}
          tweetid={props.tweetid}
          comments={props.comments}
          setLoading={props.setLoading}
          refetch={props.refetch}
        />
      )}

      <div
        className={props.comments.length > 10 ? classes.root : classes.showless}
      >
        {!cuser && (
          <Typography
            component={"p"}
            variant={"p"}
            style={{
              background: "orange",
              padding: "8px",
              marginBottom: "8px"
            }}
          >
            Login to write a comment
          </Typography>
        )}

        {props.comments.map((item, index) => {
          return (
            <ShowComments
              handleDelete={handleDelete}
              {...props}
              key={index}
              item={item}
              refetch={props.refetch}
            />
          );
        })}
        {props.comments.length == 0 ? (
          <Typography
            style={{ background: "#eee", textAlign: "center" }}
            variant="p"
            component="p"
          >
            No Comments Yet
          </Typography>
        ) : null}
      </div>
    </div>
  );
}

export default withRouter(Commentshow);

function ShowComments(props) {
  const cuser = React.useContext(Context);
  const classes = useStyles();
  let { item } = props;

  let temp;
  let dateWithTime;
  try {
    temp = item.commenttime.split("T");
    let tweetdate = temp[0].split("-");

    let tweettime = temp[1].split(".")[0];
    let formatteDate = new Date(
      Number(tweetdate[0]),
      Number(tweetdate[1]) - 1,
      Number(tweetdate[2])
    ).toDateString();
    dateWithTime = `${formatteDate} ${tweettime} EST`;
  } catch (e) {
    dateWithTime = item.commenttime;
  }

  /* let tweetdate = temp[0].split("-");

  let tweettime = temp[1].split(".")[0];
  let formatteDate = new Date(
    Number(tweetdate[0]),
    Number(tweetdate[1]) - 1,
    Number(tweetdate[2])
  ).toDateString();
  let dateWithTime = `${formatteDate} ${tweettime} EST`;
  console.log(dateWithTime); */
  return (
    <Mutation
      mutation={props.DELETE_COMMENT_MUTATION}
      variables={{ commentid: item.id }}
      update={(cache, { data }) => {
        if (props.refetch) {
          props.refetch();
        } else {
          props.updateAfterCommentDelete(cache, data, props.item);
        }
      }}
    >
      {(deleteComment, { loading, error }) => {
        if (loading) return <Loading />;
        return (
          <>
            {error && <Error error={error} />}
            <ListItem
              onClick={() =>
                props.history.push(`/profile/${item.user.username}`)
              }
              style={{
                padding: 0,
                paddingBottom: "8px",
                paddingLeft: "8px",
                background: "#eee",
                marginLeft: "7px",
                listStyleType: "none"
              }}
              key={item.id}
              button
            >
              <ListItemAvatar>
                <Avatar
                  style={{ width: "32px", height: "32px" }}
                  src={`${STATIC_URL}${item.user.profileSet[0].profilePic}`}
                />
              </ListItemAvatar>
              <ListItemText
                id={item.id}
                primary={item.comment}
                secondary={dateWithTime}
              />

              {cuser.id == item.user.id ? (
                <ListItemSecondaryAction
                  className={classes.deleteicon}
                  onClick={e => props.handleDelete(deleteComment)}
                >
                  <DeleteOutline style={{ color: "orange" }} />
                </ListItemSecondaryAction>
              ) : null}
            </ListItem>
          </>
        );
      }}
    </Mutation>
  );
}
