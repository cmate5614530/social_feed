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
  },
  showpointer: {
    "&:hover": {
      cursor: "pointer"
    }
  },
  avatarimage: {
    width: "100%"
  }
}));

function SingleTweet(props) {
  const cuser = React.useContext(Context);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [menuExpande, setMenuExpanded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [commentLoading, setCommentLoading] = React.useState(false);
  const [likesLoading, setLikesLoading] = React.useState(false);
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
  let dateWithTime = `${formatteDate} ${tweettime} EST`;
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

  const handleDelete = async deleteTweet => {
    const res = await deleteTweet();
  };

  const handleReportAbuse = async reportAbuse => {
    const res = await reportAbuse();
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.showpointer}
        onClick={() => props.history.push(`/profile/${item.user.username}`)}
        avatar={
          <Avatar>
            <img
              className={clsx(classes.showpointer, classes.avatarimage)}
              src={`${STATIC_URL}${props.profilePic}`}
            />
          </Avatar>
        }
        action={
          <div style={{ position: "relative" }}>
            <ReactCountryFlag
              style={{ cursor: "initial" }}
              onClick={e => e.stopPropagation()}
              code={item.tweetcountry}
              svg
            />
            <IconButton
              onClick={e => {
                e.stopPropagation();
                setMenuExpanded(!menuExpande);
              }}
              aria-label="Settings"
            >
              <MoreVertIcon />
            </IconButton>
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
                          bottom: "-90px",
                          right: "30px",
                          border: "1px solid indigo"
                        }
                  }
                >
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

                  <Divider />
                  {cuser.id == props.item.user.id ? (
                    <Mutation
                      mutation={DELETE_MUTATION}
                      variables={{ tweetid: props.item.id }}
                      onCompleted={data => setMenuExpanded(false)}
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
                            Delete Tweet
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
        subheader={dateWithTime}
      />
      {item.tweetfile && (
        <CardMedia
          style={{ height: 0, paddingTop: "56.25%" }}
          image={`${STATIC_URL}${item.tweetfile}`}
          title="Paella dish"
        />
      )}
      {/*  <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {item.tweettext}
        </Typography>
      </CardContent> */}
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
            ) : (
              <ReactTinyLink
                cardSize="large"
                showGraphic
                proxyUrl="https://testappsak.herokuapp.com"
                maxLine={2}
                minLine={1}
                url={item.url}
              />
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
              <ReactTinyLink
                cardSize="large"
                showGraphic
                proxyUrl="https://testappsak.herokuapp.com"
                maxLine={2}
                minLine={1}
                url={item.url}
              />
            ) : null}
            {item.wtext ? (
              <WorldTweetCard linkcontent={linkcontent} item={item} />
            ) : null}
          </>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <Createlike
          username={props.username}
          updateLikeFunction={props.updateLikeFunction}
          refetchQuery={props.refetchQuery}
          tweetid={item.id}
          setLikesLoading={setLikesLoading}
          likes={item.likes}
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
            onClick={() => handleExpandClick("comments")}
            aria-expanded={expanded}
            aria-label="Show more"
            style={{ paddingLeft: "5px" }}
            aria-label="Share"
          >
            <Comment />
          </IconButton>
        </span>
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
              <Likes refetchQuery={props.refetchQuery} likes={item.likes} />
            )
          )}

          {expanded == "comments" && (
            <Comments
              username={props.username}
              tweetid={item.id}
              comments={item.comments}
              updateCommentFunction={props.updateCommentFunction}
              setLoading={isLoading => setLoading(isLoading)}
              setCommentLoading={setCommentLoading}
              CREATE_COMMENT_MUTATION={CREATE_COMMENT_MUTATION}
              refetchQuery={props.refetchQuery}
              item={item}
              updateAfterCommentDelete={props.updateAfterCommentDelete}
              DELETE_COMMENT_MUTATION={props.DELETE_COMMENT_MUTATION}
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
export default withRouter(SingleTweet);
