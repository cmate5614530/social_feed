import React, { Component } from "react";
import Repeat from "@material-ui/icons/Repeat";
import IconButton from "@material-ui/core/IconButton";
import WorldTweetRetweet from "./dialog";
import { Context } from "../../usercontext";
import Alertbox from "./alertbox";

import { Mutation, Query, ApolloConsumer } from "react-apollo";

export default function RetweetComponent(props) {
  const [dialogShow, setDialogShow] = React.useState(false);
  const [errorShow, setErrorShow] = React.useState(false);
  const [title, setTitle] = React.useState(false);
  const [text, setText] = React.useState(false);
  const [showlogin, setShowlogin] = React.useState(true);
  const cuser = React.useContext(Context);
  return (
    <>
      <ApolloConsumer>
        {client => {
          return (
            <>
              <IconButton
                onClick={e => {
                  console.log("evebt  ", e);
                  e.stopPropagation();
                  if (!cuser) {
                    setErrorShow(true);
                  } else {
                    setDialogShow(true);
                  }
                }}
              >
                <Repeat />
              </IconButton>
              {dialogShow && (
                <WorldTweetRetweet
                  handleError={() => {
                    setDialogShow(false);
                    setTitle("Please Wait a minute");
                    setText(
                      `You can only post once per minute. Please wait for a minute, then you will be able to post again`
                    );
                    setShowlogin(false);
                    setErrorShow(true);
                  }}
                  {...props}
                  handleClose={() => setDialogShow(false)}
                />
              )}
              {errorShow && (
                <Alertbox
                  title={title != false ? title : "Not a Registered User"}
                  text={
                    text != false
                      ? text
                      : "You need to be a registered user to create twweets"
                  }
                  showlogin={showlogin == false ? false : true}
                  handleLogin={() => {
                    setErrorShow(false);
                    let event = new CustomEvent(
                      "setTempToFalseFromRegisterorLogin"
                    );
                    document.dispatchEvent(event);
                    client.writeData({
                      data: {
                        isLoggedIn: false,
                        tempuser: false,
                        authRoute: "Login"
                      }
                    });
                  }}
                  handleClose={() => {
                    setErrorShow(false);
                    setTitle(false);
                    setText(false);
                    setShowlogin(true);
                  }}
                />
              )}
            </>
          );
        }}
      </ApolloConsumer>
    </>
  );
}
