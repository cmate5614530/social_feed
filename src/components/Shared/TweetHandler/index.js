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
import InputHandler from "./InputHandler";
import { GET_WORLD_TWEETS } from "../../Feed/worldtweets";

function Handler(props) {
  const cuser = React.useContext(Context);
  const handleAddHandle = async (addHandleWorld, handlename) => {
    const res = await addHandleWorld({ variables: { handle: handlename } });
  };
  return (
    <div>
      <Query
        query={props.query ? props.GET_HANDLERS : GET_HANDLERS}
        variables={props.query ? { username: props.username } : null}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return <Error error={error} />;

          return (
            <>
              <Mutation
                mutation={ADD_HANDLE}
                refetchQueries={() => [
                  { query: GET_HANDLERS },
                  { query: GET_WORLD_TWEETS, variables: { page: 1 } }
                ]}
              >
                {(addHandleWorld, { loading, error, called, client }) => {
                  if (loading) return <Loading />;
                  if (error) return <Error error={error} />;
                  return (
                    <>
                      <Typography
                        style={{ padding: "16px", opacity: "0.8" }}
                        variant="h6"
                        component="h6"
                        noWrap
                      >
                        {props.text
                          ? props.text
                          : "Add Favorite Twitter Handles"}
                      </Typography>
                      <Divider />
                      <div style={{ ...props.inputstyle }}>
                        <InputHandler refetchQueries={GET_HANDLERS} />
                      </div>

                      <Divider />
                      <List>
                        {data.allhandles.length > 0 ? (
                          data.allhandles.map((item, index) => {
                            return (
                              <ShowHandler
                                showsecondary={props.showsecondary}
                                item={item}
                                username={props.username}
                                cuser={cuser}
                                key={index}
                                addHandle={handlename =>
                                  handleAddHandle(addHandleWorld, handlename)
                                }
                                removeHandle={props.removeHandle}
                              />
                            );
                          })
                        ) : (
                          <Typography
                            style={{ padding: "16px", opacity: "0.8" }}
                            variant="h6"
                            noWrap
                          >
                            All Twitter handles added
                          </Typography>
                        )}
                      </List>
                    </>
                  );
                }}
              </Mutation>
            </>
          );
        }}
      </Query>
    </div>
  );
}

export const GET_HANDLERS = gql`
  query($username: String) {
    allhandles(username: $username) {
      id
      user {
        id
        username
      }
      TweetHandlers {
        id
        handlename
        logo
      }
    }
  }
`;

const ADD_HANDLE = gql`
  mutation($handle: String!) {
    addHandleWorld(handle: $handle) {
      status
    }
  }
`;

export default withRouter(Handler);
