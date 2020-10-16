import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider'
import { Avatar } from '@material-ui/core';
import ErrorOutline from '@material-ui/icons/ErrorOutline'
import { ApolloConsumer } from 'react-apollo';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function MaxWidthDialog({error}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleMaxWidthChange(event) {
    setMaxWidth(event.target.value);
  }


function handleFullWidthChange(event) {
    setFullWidth(event.target.checked);
  }

  let message=error.message.replace("GraphQL Error:", "").trim()
  message=message.replace("GraphQL error:", "").trim()
  
  return (

    <ApolloConsumer>
      {(client) => {
        if (message == "notLoggedIn") {
          client.writeData({data:{isLoggedIn:false} })
          localStorage.removeItem("authtoken")
          return null
        }

        return (
          <React.Fragment>
     
          <Dialog
            fullWidth={fullWidth}
            maxWidth={"sm"}
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
          >
              <div style={{display:"flex", flexDirection:"row",alignItems:"center"}}>
              <DialogTitle style={{color:"red"}} id="max-width-dialog-title">An Error Occurred 
             
              </DialogTitle>
              <ErrorOutline  color="error" />
            
               </div>
    
                
            
            <Divider />
            <DialogContent>
              <DialogContentText>
               {message}
              </DialogContentText>
              
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}  color="primary">
                Close
              </Button>
              <Button onClick={()=>window.location.reload()} variant="contained" color="primary">
                Retry
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
        )
      }}
    
    </ApolloConsumer>
   
  );
}
