import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import Button from "@material-ui/core/Button";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import CameraComponent from "./camera";
import Axios from "axios";
import { UPLOAD_URL } from "../../config/index";
import SnackBarError from "../Shared/Error";
import { PERSPECTIVE_API_URL } from "../../config/index";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Error from "../Shared/Error";
import Loading from "../Shared/loading";
import { Context } from "../usercontext";
import Alertbox from "../Shared/retweet/alertbox";
import Keyword from "./keyword";
import Camera from "@material-ui/icons/Camera";

const ImgIcon = () => (
  <svg focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M14 13l4 5H6l4-4 1.79 1.78L14 13zm-6.01-2.99A2 2 0 0 0 8 6a2 2 0 0 0-.01 4.01zM22 5v14a3 3 0 0 1-3 2.99H5c-1.64 0-3-1.36-3-3V5c0-1.64 1.36-3 3-3h14c1.65 0 3 1.36 3 3zm-2.01 0a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h7v-.01h7a1 1 0 0 0 1-1V5z" />
  </svg>
);

const FileInput = ({ onChange, children }) => {
  const fileRef = useRef();
  const onPickFile = event => {
    onChange([...event.target.files]);
  };
  return (
    <div
      style={{
        width: "35px",
        height: "35px",
        borderRadius: "3px"
      }}
      onClick={() => fileRef.current.click()}
    >
      {children}
      <input
        multiple
        accept="image/*"
        ref={fileRef}
        onChange={onPickFile}
        type="file"
        style={{ visibility: "hidden" }}
      />
    </div>
  );
};

const Img = ({ file, onRemove, index, isSingle }) => {
  const [fileUrl, setFileUrl] = useState(null);
  useEffect(() => {
    if (file) {
      setFileUrl(URL.createObjectURL(file));
    }
  }, [file]);

  const dimensionStyle = isSingle
    ? {
        maxWidth: "100%",
        maxHeight: "auto"
      }
    : {
        maxWidth: "230px",
        maxHeight: "95px"
      };

  return fileUrl ? (
    onRemove ? (
      <div
        style={{ position: "relative", maxWidth: "230px", maxHeight: "95px" }}
      >
        <img
          style={{
            ...dimensionStyle,
            display: "block",
            width: "auto",
            height: "auto"
          }}
          alt="pic"
          src={fileUrl}
        />
        <div
          onClick={() => onRemove(index)}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "black",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          x
        </div>
      </div>
    ) : (
      <img
        style={{
          ...dimensionStyle,
          display: "block",
          width: "auto",
          height: "auto"
        }}
        alt="pic"
        src={fileUrl}
      />
    )
  ) : null;
};

Img.defaultProps = {
  isSingle: false
};

const EmojiPicker = ({ onSelect }) => {
  const [show, setShow] = useState(false);
  const buttonRef = useRef();
  const dimensions = useRef({ bottom: 0, left: 0 });
  useEffect(() => {
    const bcr = buttonRef.current.getBoundingClientRect();
    dimensions.current = { bottom: bcr.bottom, left: bcr.left };
  }, []);

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
            }
          }
        }}
      >
        <button
          ref={buttonRef}
          onClick={() => setShow(oldState => !oldState)}
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
      {ReactDOM.createPortal(
        show && (
          <div
            className="PickerContainer"
            style={{
              position: "absolute",
              top: `${dimensions.current.bottom + 10}px`,
              left: `${dimensions.current.left}px`
            }}
          >
            <Picker onSelect={onSelect} />
          </div>
        ),
        document.body
      )}
    </>
  );
};

const Tweet = ({ tweet: { text, images } }) => (
  <div
    style={{
      margin: "20px",
      border: "1px solid grey",
      width: "600px",
      padding: "20px",
      borderRadius: "3px"
    }}
  >
    <div>{text}</div>
    {images.length > 0 && (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          background: "fbfbfb",
          padding: "30px 0"
        }}
      >
        {images.map((img, i) => (
          <Img key={i} file={img} index={i} isSingle={images.length === 1} />
        ))}
      </div>
    )}
  </div>
);

function TweetSheet(props) {
  const [text, setText] = useState("");
  const [camerashow, setCamerashow] = React.useState(false);
  const [pics, setPics] = useState([]);
  const textAreaRef = useRef();
  const [tweets, setTweets] = useState([]); // array of object of shape {text: '', images: []}
  const [isAbusive, setIsAbusive] = useState(false);
  const [componentLoading, setComponentLoading] = React.useState(false);
  const [componentError, setComponentError] = React.useState(false);
  const [tweetError, setTweetError] = React.useState(false);
  const cuser = React.useContext(Context);
  const [listenerExist, setListenerExist] = React.useState(false);
  let [tempUserDialog, setTempUserDialog] = React.useState(false);
  const [pornkeyword, setPornkeyword] = React.useState(false);
  const insertAtPos = value => {
    const { current: taRef } = textAreaRef;
    let startPos = taRef.selectionStart;
    let endPos = taRef.selectionEnd;
    setText(text + value.native);
    // console.log(value)
    /*  setText(
      taRef.value.substri(0, startPos) +
        value.native +
        taRef.value.substring(endPos, taRef.value.length)
    ) */
  };
  const onClickTweet = async createTweet => {
    setComponentLoading(true);
    let res;
    let tempIsAbusive = false;
    let threat = "";

    let insult = "";

    let toxic = "";
    if (text) {
      let lowertext = text.toLowerCase();
      let hasPornkeyword = false;
      Keyword.forEach(item => {
        if (lowertext.indexOf(item) >= 0) {
          hasPornkeyword = true;
        }
      });
      if (hasPornkeyword) {
        setPornkeyword(true);
        setComponentLoading(false);
      } else {
        setPornkeyword(false);

        try {
          const abusiveRes = await Axios.post(PERSPECTIVE_API_URL, {
            comment: {
              text: text
            },
            languages: ["en"],
            requestedAttributes: {
              TOXICITY: {},
              INSULT: {},
              FLIRTATION: {},
              THREAT: {}
            }
          });
          threat = abusiveRes.data.attributeScores.THREAT.summaryScore.value;
          insult = abusiveRes.data.attributeScores.INSULT.summaryScore.value;
          toxic = abusiveRes.data.attributeScores.TOXICITY.summaryScore.value;
        } catch (error) {
          console.log(error);
          threat = 0.2;
          insult = 0.2;
          toxic = 0.2;
          console.log("perspective not working");
        }
        if (threat > 0.95 || insult > 0.95 || toxic > 0.95) {
          setIsAbusive(true);
          tempIsAbusive = true;
          setComponentLoading(false);
        }
        if (tempIsAbusive == false) {
          let locationPreference = localStorage.getItem("locationPreference");

          if (
            window.navigator.userAgent == "buzzrakerapp" &&
            locationPreference == "true"
          ) {
            window.ReactNativeWebView.postMessage(`getLocation:/feeds/tweet`);
            document.addEventListener("location", function addTweet(e) {
              console.log("location recieved", e.detail);
              console.log("tweettext and in else add", text);
              if (pics.length > 0) {
                if (pics[0].size / 1048576 <= 5) {
                  let a = new Date().toString().split("(")[0];
                  let b = a.split(" ");
                  b.pop();
                  b.pop();
                  let picname = b.join("-") + pics[0].name;

                  let data = new FormData();
                  data.append("token", localStorage.getItem("authtoken"));
                  data.append("name", picname);
                  data.append("file", pics[0]);
                  Axios.post(UPLOAD_URL, data)
                    .then(res => {
                      if (res.data.success == true) {
                        let resdata = createTweet({
                          variables: {
                            tweettext: text,
                            tweetimage: picname,
                            location: e.detail
                          }
                        });
                        resdata
                          .then(data => {
                            setComponentLoading(false);
                          })
                          .catch(err => {
                            setComponentLoading(false);
                            setTweetError(true);
                          });
                        setText("");
                        setPics([]);
                      } else {
                        setComponentLoading(false);
                        setComponentError({
                          message: "Some Error occured on server"
                        });
                      }
                    })
                    .catch(err => {
                      setComponentLoading(false);
                      setComponentError({ message: "Network Error" });
                    });
                } else {
                  setComponentLoading(false);
                  setComponentError({
                    message: "file size should be less then 5mb"
                  });
                }
              } else {
                let resdata = createTweet({
                  variables: {
                    tweettext: text,
                    tweetimage: "null",
                    location: e.detail
                  }
                });

                resdata
                  .then(data => {
                    setComponentLoading(false);
                  })
                  .catch(err => {
                    setComponentLoading(false);
                    setTweetError(true);
                  });
                setText("");
              }
              document.removeEventListener("location", addTweet);
            });
          } else {
            if (pics.length > 0) {
              if (pics[0].size / 1048576 <= 5) {
                let a = new Date().toString().split("(")[0];
                let b = a.split(" ");
                b.pop();
                b.pop();
                let picname = b.join("-") + pics[0].name;

                let data = new FormData();
                data.append("token", localStorage.getItem("authtoken"));
                data.append("name", picname);
                data.append("file", pics[0]);
                Axios.post(UPLOAD_URL, data)
                  .then(res => {
                    if (res.data.success == true) {
                      let resdata = createTweet({
                        variables: {
                          tweettext: text,
                          tweetimage: picname,
                          location: false
                        }
                      });
                      resdata
                        .then(data => {
                          setComponentLoading(false);
                        })
                        .catch(err => {
                          setComponentLoading(false);
                          setTweetError(true);
                        });
                      setText("");
                      setPics([]);
                    } else {
                      setComponentLoading(false);
                      setComponentError({
                        message: "Some Error occured on server"
                      });
                    }
                  })
                  .catch(err => {
                    setComponentLoading(false);
                    setComponentError({ message: "Network Error" });
                  });
              } else {
                setComponentLoading(false);
                setComponentError({
                  message: "file size should be less then 5mb"
                });
              }
            } else {
              let resdata = createTweet({
                variables: {
                  tweettext: text,
                  tweetimage: "null",
                  location: false
                }
              });

              resdata
                .then(data => {
                  setComponentLoading(false);
                })
                .catch(err => {
                  setComponentLoading(false);
                  setTweetError(true);
                });
              setText("");
            }
          }
        }
      }
    } else {
      setComponentLoading(false);
      setComponentError({ message: "Please Use Words , They are free!!" });
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
          if (error) {
            console.log("erorororoo", error);
          }
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

                minHeight: "200px"
              }}
            >
              {componentError && <Error error={componentError} />}
              {isAbusive && (
                <Alertbox
                  handleClose={() => setIsAbusive(false)}
                  showlogin={false}
                  title="Abusive Language"
                  text="Your post didn't go through as it contains abusive language. Please be nice to other humans."
                />
              )}

              {pornkeyword && (
                <Alertbox
                  handleClose={() => setPornkeyword(false)}
                  showlogin={false}
                  title="Adult Content"
                  text="Adult content is not permitted on this site."
                />
              )}

              {tweetError && (
                <Alertbox
                  handleClose={() => setTweetError(false)}
                  showlogin={false}
                  title={"Please Wait For a Few Seconds"}
                  text="You can only post once per minute. Please wait for a minute, then you will be able to tweet again."
                />
              )}
              {tempUserDialog && (
                <Alertbox
                  handleClose={() => setTempUserDialog(false)}
                  showlogin={true}
                  handleLogin={() => {
                    let event = new CustomEvent(
                      "setTempToFalseFromRegisterorLogin"
                    );
                    document.dispatchEvent(event);

                    props.client.writeData({
                      data: {
                        isLoggedIn: false,
                        tempuser: false,
                        authRoute: "Login"
                      }
                    });
                  }}
                  title={"Not Registered"}
                  text="You need to have an account to post. If already have an account then click the button and login, else register now"
                />
              )}

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
                  placeholder="Let Your Thoughts Flow"
                  value={text}
                  style={{ flex: 1, border: "none", minHeight: "150px" }}
                  onChange={e =>
                    text.length < 300
                      ? setText(e.target.value)
                      : setText(e.target.value.slice(0, 300))
                  }
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    background: "fbfbfb"
                  }}
                >
                  {pics.map((picFile, index) => (
                    <Img
                      key={index}
                      index={index}
                      file={picFile}
                      onRemove={rmIndx =>
                        setPics(pics.filter((pic, index) => index !== rmIndx))
                      }
                    />
                  ))}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  border: "1px solid indigo",
                  padding: "5px"
                }}
              >
                <div style={{ marginRight: "20px" }}>
                  <FileInput onChange={pics => setPics(pics)}>
                    <ImgIcon />
                  </FileInput>
                </div>
                {window.navigator.userAgent != "buzzrakerapp" && (
                  <EmojiPicker onSelect={insertAtPos} />
                )}

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end"
                  }}
                >
                  <p
                    style={{
                      padding: "5px"
                    }}
                  >
                    {300 - text.length + " characters left"}
                  </p>
                  <Button
                    onClick={() => {
                      if (cuser) {
                        onClickTweet(createTweet);
                      } else {
                        setTempUserDialog(true);
                      }
                    }}
                    variant="outlined"
                    color="primary"
                  >
                    Buzz
                  </Button>
                </div>
              </div>
              {camerashow && <CameraComponent />}
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
      style={{
        display: "flex",
        flex: 1,
        height: "100%",
        width: "100%",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <TweetSheet
        updateTweets={props.updateTweets}
        client={props.client}
        GET_TWEETS={props.GET_TWEETS}
        settempid={props.settempid}
        username={props.username}
      />
    </div>
  );
}

const CREATE_TWEET = gql`
  mutation($tweettext: String!, $tweetimage: String!, $location: String) {
    createTweet(
      tweetext: $tweettext
      tweetimage: $tweetimage
      location: $location
    ) {
      tweet {
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
        }
      }
    }
  }
`;

export default Tweetbox;
