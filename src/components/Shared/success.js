import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import clsx from "clsx";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import { amber, green } from "@material-ui/core/colors";

import IconButton from "@material-ui/core/IconButton";
const Error = ({ classes, message }) => {
  const [open, setOpen] = useState(true);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <SnackbarContent
        className={classes.success}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <ErrorIcon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={() => setOpen(false)}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },

  snackbar: {
    margin: theme.spacing.unit,
  },
  errorbackground: {
    backgroundColor: "red",
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
});

export default withStyles(styles)(Error);
