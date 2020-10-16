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
import Microlink from "@microlink/react";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Comment from "@material-ui/icons/Comment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Likes from "./likeshow";
import Comments from "./commentshow";
import Commentshow from "./commentshow";
import Createlike from "./createLike";
import CircularProgress from "@material-ui/core/CircularProgress";
import { STATIC_URL } from "../../config";
import { gql } from "apollo-boost";
import { Context } from "../usercontext";
import ReactTinyLink from "react-tiny-link";
import Retweet from "../Shared/retweet/index";
import ErrorBoundary from "../Shared/ErrorBoundary";
import formatTime from "./formattime";
import Share from "@material-ui/icons/Share";
const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: "10px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
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
  }
}));

export default function RecipeReviewCard(props) {
  let {
    item,
    avatar,
    id,
    tweetlikes,
    tweetcomments,
    CREATE_COMMENT_MUTATION,
    CREATE_LIKE_MUTATION,
    refetchQuery,
    page
  } = props;
  const cuser = React.useContext(Context);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [menuExpande, setMenuExpanded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [commentLoading, setCommentLoading] = React.useState(false);
  const [likesLoading, setLikesLoading] = React.useState(false);

  function handleExpandClick(expandedItem) {
    if (expanded == "likes" && expandedItem == "likes") setExpanded(false);
    else if (expanded == "comments" && expandedItem == "comments") {
      setExpanded(false);
    } else setExpanded(expandedItem);
  }

  let commentCount = tweetcomments.length;

  let newPublished;
  let espnPublished;
  try {
    if (props.cnn || props.fox) {
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
    } else {
      let splittedPublished = item.published.split(" ");
      let splittedTime = splittedPublished[4].split(":");
      espnPublished = `${splittedPublished[0]} ${splittedPublished[1]} ${
        splittedPublished[2]
      } ${splittedPublished[3]} ${splittedTime[0]}:${splittedTime[1]} ${
        splittedPublished[5]
      }`;
    }
  } catch (err) {
    newPublished = item.published;
    espnPublished = item.published;
  }

  return (
    <Card
      onClick={e => {
        if (props.letter == "C") {
          if (!props.refetch) {
            e.preventDefault();
            props.history.push(`/feeds/cnn-${item.id}`);
          }
        }
        if (props.letter == "E") {
          if (!props.refetch) {
            e.preventDefault();
            props.history.push(`/feeds/espn-${item.id}`);
          }
        }
        if (props.letter == "F") {
          if (!props.refetch) {
            e.preventDefault();
            props.history.push(`/feeds/fox-${item.id}`);
          }
        }
        if (window.navigator.userAgent == "buzzrakerapp" && props.refetch) {
          e.preventDefault();
          window.ReactNativeWebView.postMessage(`showmodal:${item.link}`);
        }
      }}
      className={classes.card}
    >
      <CardHeader
        avatar={
          <Avatar src={props.logo} className={classes.avatar}>
            {props.letter}
          </Avatar>
        }
        title={item.title}
        subheader={
          props.cnn || props.fox
            ? formatTime(newPublished)
            : formatTime(espnPublished)
        }
      />

      <CardContent>
        <ErrorBoundary>
          <ReactTinyLink
            cardSize="large"
            showGraphic
            maxLine={2}
            proxyUrl="https://testappsak.herokuapp.com"
            minLine={1}
            url={item.link}
          />
        </ErrorBoundary>
      </CardContent>
      <CardActions disableSpacing style={{ borderBottom: "1px solid #eee" }}>
        <Createlike
          refetch={props.refetch}
          isTweet={false}
          CREATE_LIKE_MUTATION={CREATE_LIKE_MUTATION}
          page={page}
          updateLikeFunction={props.updateLikeFunction}
          setLikesLoading={setLikesLoading}
          likes={tweetlikes}
          refetchQuery={refetchQuery}
          tweetid={id}
          CREATE_LIKE_MUTATION={CREATE_LIKE_MUTATION}
          setLoading={isLoading => setLoading(isLoading)}
          expanded={expanded}
          setExpanded={handleExpandClick}
          item={item}
        />
        <span className="commentIcon">
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
        <Retweet url={item.link} />
        {window.ReactNativeWebView && (
          <span className="shareIcon">
            <IconButton
              onClick={e => {
                e.stopPropagation();
                if (props.letter == "C") {
                  window.ReactNativeWebView.postMessage(
                    `url:/feeds/cnn-${item.id}:${item.title}`
                  );
                }
                if (props.letter == "E") {
                  window.ReactNativeWebView.postMessage(
                    `url:/feeds/espn-${item.id}:${item.title}`
                  );
                }
                if (props.letter == "F") {
                  window.ReactNativeWebView.postMessage(
                    `url:/feeds/fox-${item.id}:${item.title}`
                  );
                }
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
        style={{ overflow: "auto", background: "#eee" }}
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
            expanded == "likes" && <Likes item={item} likes={tweetlikes} />
          )}

          {expanded == "comments" && (
            <Comments
              refetch={props.refetch}
              updateAfterCommentDelete={props.updateAfterCommentDelete}
              DELETE_COMMENT_MUTATION={props.DELETE_COMMENT_MUTATION}
              updateCommentFunction={props.updateCommentFunction}
              refetchQuery={refetchQuery}
              setCommentLoading={setCommentLoading}
              comments={tweetcomments}
              page={page}
              tweetid={id}
              setLoading={isLoading => setLoading(isLoading)}
              CREATE_COMMENT_MUTATION={CREATE_COMMENT_MUTATION}
              item={item}
            />
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}

/* const CREATE_LIKE_MUTATION = gql`
  mutation($tweetid: Int!) {
    createCnnLike(tweetId: $tweetid) {
      user {
        username

      }
      feed {
          id
      }
      likedordisliked
      likesid
    }
  }
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation($tweetid: Int!,$commenttext:String!) {
    createCnnComment(tweetId: $tweetid,commenttext:$commenttext ) {
     feed {
       id
     }
     commenttext
     commentid
    }
  }
`;
 */
