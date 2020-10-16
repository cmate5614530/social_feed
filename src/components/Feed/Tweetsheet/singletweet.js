import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Mutation } from "react-apollo";
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
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Comment from "@material-ui/icons/Comment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import formatTime from "../../Shared/formattime";
import Likes from "../../Shared/likeshow";
import Comments from "../../Shared/commentshow";
import Commentshow from "../../Shared/commentshow";
import Createlike from "../../Shared/createLike";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactCountryFlag from "react-country-flag";
import { gql } from "apollo-boost";
import { STATIC_URL } from "../../../config";
import Divider from "@material-ui/core/Divider";
import { withRouter } from "react-router-dom";
import Loading from "../../Shared/loading";
import { Context } from "../../usercontext";
import { Link } from "react-router-dom";
import ReactTinyLink from "react-tiny-link";
import WorldTweetCard from "../../Shared/worldtweetcard";
import YoutubeIframe from "../../Shared/youtube";
import Geofinder from "./geofinder";
import Share from "@material-ui/icons/Share";

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

function RecipeReviewCard(props) {
  const classes = useStyles();
  const cuser = React.useContext(Context);
  const [expanded, setExpanded] = React.useState(false);
  const [menuExpande, setMenuExpanded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [commentLoading, setCommentLoading] = React.useState(false);
  const [likesLoading, setLikesLoading] = React.useState(false);

  const handleNavigation = id => {
    props.history.push(`/profile/${id}`);
  };

  const handleDelete = async deleteTweet => {
    const res = await deleteTweet();
  };

  const handleReportAbuse = async reportAbuse => {
    const res = await reportAbuse();
  };

  const handleClickAway = () => {
    setMenuExpanded(false);
  };
  function handleExpandClick(expandedItem) {
    if (expanded == "likes" && expandedItem == "likes") setExpanded(false);
    else if (expanded == "comments" && expandedItem == "comments") {
      setExpanded(false);
    } else setExpanded(expandedItem);
  }
  let { item } = props;

  let temp = item.tweettime.split("T");
  let tweetdate = temp[0].split("-");

  let tweettime = temp[1].split(".")[0];
  let formatteDate = new Date(
    Number(tweetdate[0]),
    Number(tweetdate[1]) - 1,
    Number(tweetdate[2])
  ).toDateString();
  let splittedFormatedDate = formatteDate.split(" ");
  formatteDate = `${splittedFormatedDate[0]}, ${splittedFormatedDate[1]} ${
    splittedFormatedDate[2]
  } ${splittedFormatedDate[3]}`;
  let splittedTweetTime = tweettime.split(":");
  let dateWithTime = `${formatteDate} ${splittedTweetTime[0]}:${
    splittedTweetTime[1]
  } EST`;

  let commentCount = item.comments.length;

  let text = item.tweettext;

  let linkindex = false;
  let lastindex = false;

  let linkcontent = "";
  if (text) {
    if (text.indexOf("http") > 0 || text.indexOf("www") > 0) {
      if (text.indexOf("http") > 0) {
        linkindex = text.indexOf("http");
        let templink = text.slice(linkindex, text.length);

        for (let i = 0; i < templink.length; i++) {
          if (templink[i] == " ") {
            lastindex = linkindex + i;
            break;
          } else {
            linkcontent = linkcontent + templink[i];
          }
        }
      } else {
        linkindex = text.indexOf("www");
        let templink = text.slice(linkindex, text.length);

        for (let i = 0; i < templink.length; i++) {
          if (templink[i] == " ") {
            lastindex = linkindex + i;
            break;
          } else {
            linkcontent = linkcontent + templink[i];
          }
        }
      }
    }
  }
  if (lastindex == false) {
    lastindex = text.length;
  }

  let isUrlNumber = false;
  if (Number(item.url) != NaN) isUrlNumber = false;
  else {
    isUrlNumber = true;
  }
  let doesHaveCity = false;
  let countryflag = false;
  if (item.tweetcountry.split(",").length == 1) {
    doesHaveCity = false;
    countryflag = item.tweetcountry;
  }
  if (item.tweetcountry.split(",").length == 3) {
    let splitted = item.tweetcountry.split(",");
    doesHaveCity = true;
    countryflag = splitted[3];
  }
  if (!countryflag) {
    countryflag = item.tweetcountry;
  }

  return (
    <Card
      className={classes.card}
      onClick={e => {
        if (!props.refetch) {
          e.preventDefault();
          props.history.push(`/feeds/tweet-${item.id}`);
        }
      }}
    >
      <CardHeader
        onClick={() => handleNavigation(item.user.username)}
        className={classes.showpointer}
        avatar={
          <Avatar>
            <img
              className={clsx(classes.showpointer, classes.avatarimage)}
              src={`${STATIC_URL}${item.user.profileSet[0].profilePic}`}
            />
          </Avatar>
        }
        action={
          <div style={{ position: "relative" }}>
            <ReactCountryFlag
              onClick={e => e.stopPropogation()}
              code={countryflag}
              svg
            />
            {/*  <Geofinder/> */}
            {props.reportabuse && (
              <IconButton
                onClick={e => {
                  e.stopPropagation();
                  setMenuExpanded(!menuExpande);
                }}
                aria-label="Settings"
              >
                <MoreVertIcon />
              </IconButton>
            )}

            {menuExpande && (
              <ClickAwayListener onClickAway={handleClickAway}>
                <div
                  style={
                    cuser.id != props.item.user.id
                      ? {
                          zIndex: 999,
                          background: "white",
                          position: "absolute",
                          bottom: "-45px",
                          right: "30px",
                          border: "1px solid indigo"
                        }
                      : {
                          zIndex: 999,
                          background: "white",
                          position: "absolute",
                          bottom: "-45px",
                          right: "30px",
                          border: "1px solid indigo"
                        }
                  }
                >
                  {cuser.id != props.item.user.id ? (
                    <Mutation
                      mutation={REPORT_ABUSE}
                      variables={{ tweetid: props.item.id }}
                      onCompleted={data => {
                        setMenuExpanded(false);
                      }}
                    >
                      {(reportAbuse, { loading, error }) => {
                        if (loading) return <Loading />;
                        return (
                          <Typography
                            onClick={e => {
                              e.stopPropagation();
                              handleReportAbuse(reportAbuse);
                            }}
                            style={{ padding: "5px 90px" }}
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            Report Abuse
                          </Typography>
                        );
                      }}
                    </Mutation>
                  ) : null}

                  <Divider />
                  {cuser.id == props.item.user.id ? (
                    <Mutation
                      mutation={DELETE_MUTATION}
                      variables={{ tweetid: props.item.id }}
                      onCompleted={data => {}}
                      update={props.updateAfterDelete}
                    >
                      {(deleteTweet, { loading, error }) => {
                        if (loading) return <Loading />;

                        return (
                          <Typography
                            onClick={e => {
                              e.stopPropagation();
                              handleDelete(deleteTweet);
                            }}
                            style={{ padding: "5px 90px" }}
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            Delete Buzz
                          </Typography>
                        );
                      }}
                    </Mutation>
                  ) : null}
                </div>
              </ClickAwayListener>
            )}
          </div>
        }
        title={item.user.username}
        subheader={formatTime(dateWithTime)}
      />
      {item.tweetfile && (
        <CardMedia
          style={{ height: 0, paddingTop: "56.25%" }}
          image={`${STATIC_URL}${item.tweetfile}`}
          title="Paella dish"
        />
      )}

      <CardContent>
        {item.isRetweeted ? (
          <>
            <Typography
              style={item.url || item.wtext ? { paddingBottom: "16px" } : null}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {linkcontent == "" ? item.tweettext : null}
              {linkcontent != "" ? text.slice(0, linkindex) : null}
              {linkcontent != "" ? (
                <a href={text.slice(linkindex, lastindex)}>
                  {text.slice(linkindex, lastindex)}
                </a>
              ) : null}
              {linkcontent != "" ? text.slice(lastindex, text.length) : null}

              {item.hashtagsSet.map((hastag, index) => (
                <Link
                  key={index}
                  style={{ textDecoration: "none" }}
                  to={`/hashtag/${hastag.hastag}`}
                >
                  &nbsp;#{hastag.hastag}&nbsp;
                </Link>
              ))}
            </Typography>

            {item.wtext ? (
              <WorldTweetCard linkcontent={linkcontent} item={item} />
            ) : item.url.indexOf("youtube.com") >= 0 ||
              item.url.indexOf("youtu.be") >= 0 ? (
              <YoutubeIframe youtubeId={item.url} />
            ) : (
              <div
                onClick={e => {
                  if (
                    window.navigator.userAgent == "buzzrakerapp" &&
                    props.refetch
                  ) {
                    e.stopPropagation();
                    e.preventDefault();
                    window.ReactNativeWebView.postMessage(
                      `showmodal:${item.url}`
                    );
                  }
                }}
              >
                <ReactTinyLink
                  cardSize="large"
                  showGraphic
                  proxyUrl="https://testappsak.herokuapp.com"
                  maxLine={2}
                  minLine={1}
                  url={item.url}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <Typography
              style={item.url || item.wtext ? { paddingBottom: "16px" } : null}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {!item.isUrlValid && item.isUrlValid != null
                ? text.slice(0, linkindex)
                : null}

              {!item.isUrlValid && item.isUrlValid != null ? (
                <a href={text.slice(linkindex, lastindex)}>
                  {text.slice(linkindex, lastindex)}
                </a>
              ) : null}

              {!item.isUrlValid && item.isUrlValid != null
                ? text.slice(lastindex, text.length)
                : null}

              {item.isUrlValid || item.isUrlValid == null
                ? item.tweettext
                : null}
              {item.hashtagsSet.map((hastag, index) => (
                <Link
                  key={index}
                  style={{ textDecoration: "none" }}
                  to={`/hashtag/${hastag.hastag}`}
                >
                  &nbsp;#{hastag.hastag}&nbsp;
                </Link>
              ))}
            </Typography>
            {item.url != null &&
            isNaN(item.url) &&
            (item.isUrlValid || item.isUrlValid == null) ? (
              item.url.indexOf("youtube.com") >= 0 ||
              item.url.indexOf("youtu.be") >= 0 ? (
                <YoutubeIframe youtubeId={item.url} />
              ) : (
                <div
                  onClick={e => {
                    if (
                      window.navigator.userAgent == "buzzrakerapp" &&
                      props.refetch
                    ) {
                      e.stopPropagation();
                      e.preventDefault();
                      window.ReactNativeWebView.postMessage(
                        `showmodal:${item.url}`
                      );
                    }
                  }}
                >
                  <ReactTinyLink
                    cardSize="large"
                    showGraphic
                    proxyUrl="https://testappsak.herokuapp.com"
                    maxLine={2}
                    minLine={1}
                    url={item.url}
                  />
                </div>
              )
            ) : null}
            {item.wtext ? (
              <WorldTweetCard linkcontent={linkcontent} item={item} />
            ) : null}
          </>
        )}
      </CardContent>
      <CardActions
        style={
          doesHaveCity
            ? {
                borderBottom: "1px solid #eee",
                flexDirection: "column",
                alignItems: "flex-start"
              }
            : { borderBottom: "1px solid #eee" }
        }
        disableSpacing
      >
        <div>
          <Createlike
            refetch={props.refetch}
            page={props.page}
            updateLikeFunction={props.updateLikeFunction}
            setLikesLoading={setLikesLoading}
            username={props.username}
            refetchQuery={props.refetchQuery}
            tweetid={item.id}
            likes={item.likes}
            userid={item.user.id}
            isTweet
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
          {window.ReactNativeWebView && (
            <span>
              <IconButton
                onClick={e => {
                  e.stopPropagation();
                  window.ReactNativeWebView.postMessage(
                    `url:/feeds/tweet-${item.id}:${item.tweettext}`
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

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
        {doesHaveCity && (
          <div>
            <Typography
              variant={"body2"}
              style={{ color: "violet" }}
              element={"h5"}
            >
              {item.tweetcountry}
            </Typography>
          </div>
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
            expanded == "likes" && (
              <Likes
                refetch={props.refetch}
                refetchQuery={props.refetchQuery}
                likes={item.likes}
                item={item}
              />
            )
          )}

          {expanded == "comments" && (
            <Comments
              refetch={props.refetch}
              updateCommentFunction={props.updateCommentFunction}
              tweetid={item.id}
              page={props.page}
              updateAfterCommentDelete={props.updateAfterCommentDelete}
              DELETE_COMMENT_MUTATION={props.DELETE_COMMENT_MUTATION}
              comments={item.comments}
              setCommentLoading={setCommentLoading}
              CREATE_COMMENT_MUTATION={CREATE_COMMENT_MUTATION}
              refetchQuery={props.refetchQuery}
              username={props.username}
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
    createLike(tweetId: $tweetid) {
      tweet {
        id
      }
      likedordisliked
      likesid
    }
  }
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation($tweetid: Int!, $commenttext: String!) {
    createComment(tweetId: $tweetid, commenttext: $commenttext) {
      tweet {
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

const DELETE_MUTATION = gql`
  mutation($tweetid: Int!) {
    deleteTweet(tweetid: $tweetid) {
      status
      tweetid
    }
  }
`;
const REPORT_ABUSE = gql`
  mutation($tweetid: Int!) {
    reportAbuse(tweetid: $tweetid) {
      status
      tweetid
    }
  }
`;
export default withRouter(RecipeReviewCard);
