import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import { Context } from "../../usercontext";
import Loading from "../loading";
import Error from "../Error";
import IconButton from "@material-ui/core/IconButton";
import AddBox from "@material-ui/icons/AddBox";
import Button from "@material-ui/core/Button";
import { STATIC_URL } from "../../../config/index";
import RemoveCircleOutline from "@material-ui/icons/RemoveCircleOutline";
import "./handler.css";

import AlertBox from "../retweet/alertbox";

const useStyles = makeStyles({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center"
  },
  input: {
    marginLeft: 8,
    flex: 8
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  },
  showpointer: {
    "&:hover": {
      cursor: "pointer"
    }
  }
});

export default function ShowHandler(props) {
  const cuser = React.useContext(Context);
  const [showerroe, setShowerror] = React.useState(false);

  const classes = useStyles();

  const handleFollow = async createHandle => {
    const res = await createHandle();
  };
  return (
    <div className={"givepadding"}>
      <div>
        {showerroe && (
          <AlertBox
            handleClose={() => setShowerror(false)}
            title={"Not a Logged In User"}
            text="Please Sign Up or Login to your account to add your own handle"
          />
        )}
        <ListItem>
          <ListItemAvatar>
            <Avatar
              className={classes.showpointer}
              src={`${props.item.TweetHandlers.logo.replace("http", "https")}`}
            />
          </ListItemAvatar>
          <ListItemText
            className={classes.showpointer}
            // onClick={() =>
            //   props.history.push(`/profile/${props.item.id}`)
            // }
            secondary={"@" + props.item.TweetHandlers.handlename}
          />
          {props.showsecondary && props.username == props.cuser.username ? (
            <ListItemSecondaryAction>
              <Button
                className="desktopbuttons"
                onClick={() =>
                  props.removeHandle(props.item.TweetHandlers.handlename)
                }
                variant="outlined"
                color="primary"
                color="primary"
              >
                Remove
              </Button>
              <IconButton
                onClick={() =>
                  props.removeHandle(props.item.TweetHandlers.handlename)
                }
                className="mobilebuttons"
                aria-label="delete"
              >
                <RemoveCircleOutline
                  style={{
                    color: "indigo"
                  }}
                />
              </IconButton>
            </ListItemSecondaryAction>
          ) : null}
          {!props.showsecondary ? (
            <ListItemSecondaryAction>
              <Button
                className="desktopbuttons"
                onClick={() => {
                  if (cuser)
                    props.addHandle(props.item.TweetHandlers.handlename);
                  else {
                    setShowerror(true);
                  }
                }}
                variant="outlined"
                color="primary"
                color="primary"
              >
                Add
              </Button>
              <IconButton
                onClick={() => {
                  if (cuser)
                    props.addHandle(props.item.TweetHandlers.handlename);
                  else {
                    setShowerror(true);
                  }
                }}
                className="mobilebuttons"
                aria-label="delete"
              >
                <AddBox
                  style={{
                    color: "indigo"
                  }}
                />
              </IconButton>
            </ListItemSecondaryAction>
          ) : null}
        </ListItem>
        <Divider variant="inset" component="li" />
      </div>
    </div>
  );
}

const styles = theme => ({
  showpointer: {
    "&:hover": {
      cursor: "pointer"
    },
    display: "none"
  },
  desktopbuttons: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },

  mobilebuttons: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  }
});
