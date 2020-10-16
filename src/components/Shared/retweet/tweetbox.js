import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import Button from "@material-ui/core/Button";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import Axios from "axios";

import SnackBarError from "../Error";
import { PERSPECTIVE_API_URL } from "../../../config/index";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Error from "../Error";
import Loading from "../loading";
import { Context } from "../../usercontext";
import Popover from "@material-ui/core/Popover";

const ImgIcon = () => (
  <svg focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M14 13l4 5H6l4-4 1.79 1.78L14 13zm-6.01-2.99A2 2 0 0 0 8 6a2 2 0 0 0-.01 4.01zM22 5v14a3 3 0 0 1-3 2.99H5c-1.64 0-3-1.36-3-3V5c0-1.64 1.36-3 3-3h14c1.65 0 3 1.36 3 3zm-2.01 0a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h7v-.01h7a1 1 0 0 0 1-1V5z" />
  </svg>
);

const EmojiPicker = ({ onSelect }) => {
  const [show, setShow] = useState(false);
  const buttonRef = useRef();
  const dimensions = useRef({ bottom: 0, left: 0 });
  const [EmojiAnchorEL, setEmojiAnchorEl] = React.useState(null);
  useEffect(() => {
    const bcr = buttonRef.current.getBoundingClientRect();
    dimensions.current = { bottom: bcr.bottom, left: bcr.left };
  }, []);
  const open = Boolean(EmojiAnchorEL);
  return (
    <>
      <ClickAwayListener
        onClickAway={e => {
          var myElementToCheckIfClicksAreInsideOf = document.querySelector(
            ".PickerContainer"
          );
          let clickoncontainer = false;

          if (myElementToCheckIfClicksAreInsideOf) {
            if (myElementToCheckIfClicksAreInsideOf.contains(e.target)) {
            } else {
              setShow(false);
              setEmojiAnchorEl(null);
            }
          }
        }}
      >
        <button
          ref={buttonRef}
          onClick={e => {
            setEmojiAnchorEl(e.currentTarget);
            setShow(oldState => !oldState);
          }}
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "4px",
            border: "3px solid",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent"
          }}
        >
          ej
        </button>
      </ClickAwayListener>
      <Popover
        id={11}
        open={open}
        anchorEl={EmojiAnchorEL}
        onClose={() => setEmojiAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <div className="PickerContainer">
          <Picker onSelect={onSelect} />
        </div>
      </Popover>
      {/*  {ReactDOM.createPortal(
        show && (
          <div
            className="PickerContainer"
            style={{
              position: "absolute",
              top: `${dimensions.current.bottom - 40}px`,
              left: `${dimensions.current.left}px`,
              zIndex: "9999",
            }}
          >
            <Picker onSelect={onSelect} />
          </div>
        ),
        document.body
      )} */}
    </>
  );
};

const Tweet = ({ tweet: { text, images } }) => <div>{text}</div>;

function TweetSheet(props) {
  const [text, setText] = useState("");
  const [pics, setPics] = useState([]);
  const textAreaRef = useRef();
  const [tweets, setTweets] = useState([]); // array of object of shape {text: '', images: []}
  const [isAbusive, setIsAbusive] = useState(false);
  const [componentLoading, setComponentLoading] = React.useState(false);
  const [componentError, setComponentError] = React.useState(false);

  const cuser = React.useContext(Context);

  const insertAtPos = value => {
    const { current: taRef } = textAreaRef;
    let startPos = taRef.selectionStart;
    let endPos = taRef.selectionEnd;
    setText(text + value.native);
    /*  setText(
      taRef.value.substring(0, startPos) +
        value.native +
        taRef.value.substring(endPos, taRef.value.length)
    ) */
  };
  const onClickTweet = async createTweet => {
    setComponentLoading(true);
    let res;
    let tempIsAbusive = false;

    if (text) {
      /*  const abusiveRes = await Axios.post(PERSPECTIVE_API_URL, {
        comment: {
          text: text,
        },
        languages: ["en"],
        requestedAttributes: {
          TOXICITY: {},
          INSULT: {},
          FLIRTATION: {},
          THREAT: {},
        },
      });
      const threat = abusiveRes.data.attributeScores.THREAT.summaryScore.value;
      const insult = abusiveRes.data.attributeScores.INSULT.summaryScore.value;
      const toxic = abusiveRes.data.attributeScores.TOXICITY.summaryScore.value;

      if (threat > 0.5 || insult > 0.5 || toxic > 0.5) {
        setIsAbusive(true);
        tempIsAbusive = true;
        setComponentLoading(false);

        setComponentError({
          message: "ABUSIVE LANGUAGE : Your tweet contains abusive language",
        });
      } */
      //   if (tempIsAbusive == false) {
      // }
    } else {
      setComponentLoading(false);
      setComponentError({ message: "Please Use Words , They are free" });
    }
  };
  return (
    <>
      <Mutation
        mutation={CREATE_TWEET}
        /* refetchQueries={() =>{

            return [{ query: GET_TWEETS, variables:{username:props.username}}]
          }}  */
        update={props.updateTweets}
      >
        {(createTweet, { loading, error, called, client }) => {
          if (loading || componentLoading) {
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
            setComponentLoading(false);
          }

          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",

                width: "100%",

                minHeight: "200px",
                padding: "20px"
              }}
            >
              {componentError && <Error error={componentError} />}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  border: "1px solid indigo",
                  margin: "0px"
                }}
              >
                <textarea
                  ref={textAreaRef}
                  placeholder="Let Your Thoughts Flow Out"
                  value={text}
                  style={{ flex: 1, border: "none", minHeight: "150px" }}
                  onChange={e =>
                    text.length < 300
                      ? setText(e.target.value)
                      : setText(e.target.value.slice(0, 300))
                  }
                />
              </div>

              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px",
                  border: "1px solid indigo"
                }}
              >
                <div>
                  <p
                    style={{
                      padding: "5px",
                      display: "inline"
                    }}
                  >
                    {300 - text.length + " characters left"}
                  </p>
                  <Button
                    disabled={text == ""}
                    onClick={() => props.saveTweet(text)}
                    variant="outlined"
                    color="primary"
                  >
                    Buzz
                  </Button>
                </div>
              </div>
            </div>
          );
        }}
      </Mutation>
    </>
  );
}

function Tweetbox(props) {
  return (
    <div
      onClick={e => {
        e.stopPropagation();
      }}
      style={{
        display: "flex",
        flex: 1,
        height: "100%",
        width: "100%",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <TweetSheet saveTweet={props.saveTweet} />
    </div>
  );
}

const CREATE_TWEET = gql`
  mutation($tweettext: String!, $tweetimage: String!) {
    createTweet(tweetext: $tweettext, tweetimage: $tweetimage) {
      tweet {
        id
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
        }
      }
    }
  }
`;

export default Tweetbox;
