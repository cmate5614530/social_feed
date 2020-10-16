import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/Card";
import CardContent from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import clsx from "clsx";
import TweetBox from "./tweetbox";
import { gql } from "apollo-boost";
import Loading from "../loading";
import Error from "../Error";
import { Mutation } from "react-apollo";
import ReactTinyLink from "react-tiny-link";
import WorldTweetCard from "../worldtweetcard";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/";

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

export default function WorldTweetDialog(props) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleText = async (text, createTweetFromUrl) => {
    let res = "";
    if (props.handlename) {
      res = await createTweetFromUrl({
        variables: {
          tweettext: text,
          url: props.wid,
          handlename: props.handlename
        }
      });
    } else {
      res = await createTweetFromUrl({
        variables: { tweettext: text, url: props.url }
      });
    }

    props.handleClose();
  };
  return (
    <Dialog
      open
      fullScreen={fullScreen}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Retweet</DialogTitle>
      <DialogContent>
        <Mutation
          mutation={CREATE_TWEET_FROM_URL}
          /* refetchQueries={() =>{

            return [{ query: GET_TWEETS, variables:{username:props.username}}]
          }}  */
          update={props.updateTweets}
        >
          {(createTweetFromUrl, { loading, error, called, client }) => {
            if (loading) {
              return (
                <div
                  style={{
                    height: "200px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Loading />
                </div>
              );
            }
            if (error) {
              props.handleError();
            }

            return (
              <>
                {props.wid ? (
                  <>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      {error && <Error error={error} />}
                      <img
                        style={{ marginRight: "8px", borderRadius: "50%" }}
                        src={props.logo}
                      />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          component="p"
                        >
                          {props.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {props.published}
                        </Typography>
                      </div>
                    </div>
                    <div style={{ marginTop: "16px" }}>
                      <WorldTweetCard
                        item={props.item}
                        linkcontent={props.linkcontent}
                      />
                    </div>
                  </>
                ) : (
                  <ReactTinyLink
                    cardSize="large"
                    showGraphic
                    maxLine={2}
                    minLine={1}
                    url={props.url}
                  />
                )}
                <TweetBox
                  saveTweet={text => handleText(text, createTweetFromUrl)}
                />
              </>
            );
          }}
        </Mutation>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={e => {
            e.stopPropagation();
            props.handleClose();
          }}
          color="primary"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const CREATE_TWEET_FROM_URL = gql`
  mutation($tweettext: String!, $url: String!, $handlename: Int) {
    createTweetFromUrl(
      tweetext: $tweettext
      url: $url
      handlename: $handlename
    ) {
      tweet {
        id
      }
    }
  }
`;
