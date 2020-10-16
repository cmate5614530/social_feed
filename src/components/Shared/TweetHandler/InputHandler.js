import React, { useState } from "react";
import { Mutation, Query } from "react-apollo";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Slide from "@material-ui/core/Slide";
import Gavel from "@material-ui/icons/Gavel";
import VerifiedUserTwoTone from "@material-ui/icons/VerifiedUserTwoTone";
import Divider from "@material-ui/core/Divider";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import ShowHandler from "./handlerlist";
import { withRouter } from "react-router-dom";
import { StickyContainer, Sticky } from "react-sticky";
import { Context } from "../../usercontext";
import Loading from "../loading";
import Error from "../Error";
import { GET_WORLD_TWEETS } from "../../Feed/worldtweets";
import AlertBox from "../retweet/alertbox";

export default function InputHandler(props) {
  const cuser = React.useContext(Context);
  const [handle, setHandle] = React.useState("");
  const [showerroe, setShowerror] = React.useState(false);

  const handleFollow = async createHandle => {
    let newhandle = handle.replace(/@/g, "");
    //alert(newhandle)

    const res = await createHandle({ variables: { handle: newhandle } });
  };

  return (
    <div>
      <Mutation
        mutation={ADD_HANDLER}
        refetchQueries={() => [
          { query: props.refetchQueries },
          { query: GET_WORLD_TWEETS, variables: { page: 1 } }
        ]}
      >
        {(createHandle, { loading, error, called, client }) => {
          if (loading) return <Loading style={{ margin: "20px" }} />;

          return (
            <span
              style={{
                display: "flex",
                justifyContent: "space-around",
                padding: "5px",
                marginTop: "5px",
                marginBottom: "5px"
              }}
            >
              {error && <Error error={error} />}
              {showerroe && (
                <AlertBox
                  handleClose={() => setShowerror(false)}
                  title={"Not a Logged In User"}
                  text="Please Sign Up or Login to your account to add your own handle"
                />
              )}
              <Input
                placeholder="Add New Handles"
                onChange={e => setHandle(e.target.value)}
              />

              <Button
                onClick={() => {
                  if (cuser) handleFollow(createHandle);
                  else {
                    setShowerror(true);
                  }
                }}
                variant="outlined"
                color="primary"
                color="primary"
              >
                SUBMIT
              </Button>
            </span>
          );
        }}
      </Mutation>
    </div>
  );
}

export const ADD_HANDLER = gql`
  mutation($handle: String!) {
    createHandle(handle: $handle) {
      status
    }
  }
`;
