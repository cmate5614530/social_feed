import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from '@material-ui/core/SnackbarContent'
import clsx from 'clsx'
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';


import IconButton from '@material-ui/core/IconButton';
const Error = ({ classes, error }) => {
  const [open, setOpen] = useState(true);
let message= error.message.replace("GraphQL Error:","").trim()
  message= message.replace("GraphQL error:","").trim()
  return (
   

    <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={open}
    autoHideDuration={6000}
    onClose={()=>setOpen(false)}
  >
    <SnackbarContent
      className={classes.error}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <ErrorIcon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={()=>setOpen(false)}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      
    />
  </Snackbar>


  );
};

const styles = theme => ({
  error:{
    backgroundColor: theme.palette.error.dark,
  },

  snackbar: {
    margin: theme.spacing.unit
  },
  errorbackground: {
    backgroundColor: "red"
  },
  icon: {
    fontSize: 20,
  
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
   
  },
 
});

export default withStyles(styles)(Error);
