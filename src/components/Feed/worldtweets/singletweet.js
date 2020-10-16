import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import formatTime from "../../Shared/formattime";
import Share from "@material-ui/icons/Share";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Comment from "@material-ui/icons/Comment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Likes from "../../Shared/likeshow";
import Comments from "../../Shared/commentshow";
import Commentshow from "../../Shared/commentshow";
import Createlike from "../../Shared/createLike";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Context } from "../../usercontext";
import { gql } from "apollo-boost";
import { STATIC_URL } from "../../../config";
import Retweet from "../../Shared/retweet";
import ReactTinyLink from "react-tiny-link";
import WorldTweetCard from "../../Shared/worldtweetcard";

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: "10px"
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  progress: {
    height: 25,
    width: 25
  },
  avatarimage: {
    width: "100%"
  },
  showpointer: {
    cursor: "pointer"
  }
}));

export default function RecipeReviewCard(props) {
  const cuser = React.useContext(Context);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [menuExpande, setMenuExpanded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [commentLoading, setCommentLoading] = React.useState(false);
  const [likesLoading, setLikesLoading] = React.useState(false);
  const handleNavigation = id => {
    props.history.push(`/profile/${id}`);
  };

  function handleExpandClick(expandedItem) {
    if (expanded == "likes" && expandedItem == "likes") setExpanded(false);
    else if (expanded == "comments" && expandedItem == "comments") {
      setExpanded(false);
    } else setExpanded(expandedItem);
  }
  let dayArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday"
  ];
  let { item } = props;
  let tweetdate = item.wcreatedat.split("T")[0];
  let tweettime = item.wcreatedat.split("T")[1].split("+")[0];
  let commentCount = item.worldtweetcomments.length;
  let text = item.wtext;
  let linkindex = false;
  let newPublished;
  try {
    let splittedPublished = item.published.split(",");

    let splittedDays = splittedPublished[0];
    let shortSplittedDays;
    if (splittedDays == "Sunday ") shortSplittedDays = "Sun";
    if (splittedDays == "Monday ") shortSplittedDays = "Mon";
    if (splittedDays == "Tuesday ") shortSplittedDays = "Tue";
    if (splittedDays == "Wednesday ") shortSplittedDays = "Wed";
    if (splittedDays == "Thrusday ") shortSplittedDays = "Thu";
    if (splittedDays == "Friday ") shortSplittedDays = "Fri";
    if (splittedDays == "Saturday ") shortSplittedDays = "Sat";

    let splittedDateTime = splittedPublished[1].split(" ");

    let splittedTime = splittedDateTime[3].split(":");

    newPublished = `${shortSplittedDays}, ${splittedDateTime[0]} ${
      splittedDateTime[1]
    } ${splittedDateTime[2]} ${splittedTime[0]}:${splittedTime[1]} ${
      splittedDateTime[4]
    }`;
  } catch (err) {
    newPublished = item.published;
  }

  let linkcontent = "";
  if (text.indexOf("https") > 0) {
    linkindex = text.indexOf("https");
    let templink = text.slice(linkindex, text.length);

    for (let i = 0; i < templink.length; i++) {
      if (templink[i] == " ") {
        break;
      } else {
        linkcontent = linkcontent + templink[i];
      }
    }
  }
  console.log(item.logo);
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar>
            <img
              className={clsx(classes.showpointer, classes.avatarimage)}
              src={item.logo.replace("http", "https")}
            />
          </Avatar>
        }
        title={item.handlename.handlename}
        subheader={formatTime(newPublished)}
      />

      <CardContent>
        <WorldTweetCard
          refetch={props.refetch}
          linkcontent={linkcontent}
          item={item}
          history={props.history}
        />
      </CardContent>
      <CardActions disableSpacing>
        <Createlike
          page={props.page}
          refetch={props.refetch}
          refetchQuery={props.refetchQuery}
          tweetid={item.id}
          updateLikeFunction={props.updateLikeFunction}
          likes={item.worldtweetlikes}
          setLikesLoading={setLikesLoading}
          CREATE_LIKE_MUTATION={CREATE_LIKE_MUTATION}
          setLoading={isLoading => setLoading(isLoading)}
          expanded={expanded}
          setExpanded={handleExpandClick}
          item={item}
        />
        <span>
          {commentCount}
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded == "comments"
            })}
            onClick={e => {
              e.stopPropagation();
              handleExpandClick("comments");
            }}
            aria-expanded={expanded}
            aria-label="Show more"
            style={{ paddingLeft: "5px" }}
            aria-label="Share"
          >
            <Comment />
          </IconButton>
        </span>
        <Retweet
          refetch={props.refetch}
          published={item.published}
          title={item.handlename.handlename}
          linkindex={linkindex}
          handlename={item.id}
          text={text}
          wtext={item.wtext}
          linkcontent={linkcontent}
          tweetdate={tweetdate}
          tweettime={tweettime}
          logo={item.logo}
          wmedia={item.wmedia}
          wid={item.wid}
          linkcontent={linkcontent}
          item={item}
        />

        {window.ReactNativeWebView && (
          <span>
            <IconButton
              onClick={e => {
                e.stopPropagation();

                window.ReactNativeWebView.postMessage(
                  `url:/feeds/worldtweet-${item.wid}:${item.wtext}`
                );
              }}
              aria-expanded={expanded}
              aria-label="Show more"
              style={{ paddingLeft: "5px" }}
              aria-label="Share"
            >
              <Share />
            </IconButton>
          </span>
        )}
      </CardActions>
      <Collapse
        style={{ overflow: "auto" }}
        in={expanded}
        timeout="auto"
        unmountOnExit
      >
        <CardContent>
          {commentLoading || likesLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <CircularProgress
                className={classes.progress}
                style={{ height: "25px", width: "25px" }}
                color="secondary"
              />
            </div>
          ) : (
            expanded == "likes" && (
              <Likes
                refetchQuery={props.refetchQuery}
                likes={item.worldtweetlikes}
                item={item}
              />
            )
          )}

          {expanded == "comments" && (
            <Comments
              tweetid={item.id}
              refetch={props.refetch}
              updateAfterCommentDelete={props.updateAfterCommentDelete}
              DELETE_COMMENT_MUTATION={props.DELETE_COMMENT_MUTATION}
              updateCommentFunction={props.updateCommentFunction}
              page={props.page}
              setCommentLoading={setCommentLoading}
              comments={item.worldtweetcomments}
              setLoading={isLoading => setLoading(isLoading)}
              CREATE_COMMENT_MUTATION={CREATE_COMMENT_MUTATION}
              refetchQuery={props.refetchQuery}
              item={item}
            />
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}

const CREATE_LIKE_MUTATION = gql`
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

const CREATE_COMMENT_MUTATION = gql`
  mutation($tweetid: Int!, $commenttext: String!) {
    createWorldtweetComment(tweetId: $tweetid, commenttext: $commenttext) {
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
