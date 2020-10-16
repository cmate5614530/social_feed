import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import { withRouter } from "react-router-dom";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
});

function SimpleDialog(props) {
  const classes = useStyles();

  return (
    <Dialog
      onClose={props.handleClose}
      aria-labelledby="simple-dialog-title"
      open={true}
    >
      <DialogTitle id="simple-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.text}
        </DialogContentText>
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
        {props.showlogin ? (
          <Button
            style={{
              background: "orange",

              color: "white"
            }}
            color="white"
            variant="outlined"
            onClick={e => {
              if (window.navigator.userAgent == "buzzrakerapp")
                window.ReactNativeWebView.postMessage(`setTempuser:false`);
              e.stopPropagation();
              props.history.push("/login");
              props.handleLogin();
            }}
          >
            Login
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  );
}

export default withRouter(SimpleDialog);
