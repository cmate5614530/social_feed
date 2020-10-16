import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { ApolloConsumer } from "react-apollo";

import { gql } from "apollo-boost";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import Gavel from "@material-ui/icons/Gavel";
import VerifiedUserTwoTone from "@material-ui/icons/VerifiedUserTwoTone";
import Logo from "../../assets/logo.png";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { InputAdornment } from "@material-ui/core";
import { Error } from "@material-ui/icons";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const Register = ({ classes, history, match, setCurrentRoute }) => {
  const [otp, setOtp] = useState("");
  const [otperror, setOtpError] = useState(false);
  let username = match.params.username;
  const handleSubmit = async (event, verify2fa, client) => {
    try {
      event.preventDefault();
      //

      let res = await verify2fa();

      if (!res.data.verify2fa.isVerified) setOtpError(true);
      else {
        localStorage.setItem("authtoken", res.data.verify2fa.token);
        if (window.navigator.userAgent == "buzzrakerapp")
          window.ReactNativeWebView.postMessage(`setLoggedIn:true`);

        client.writeData({
          data: {
            isLoggedIn: true
          }
        });
        history.push(`/`);
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar src={Logo} className={classes.avatar} />
        <Typography variant="headline">2 Factor Authentication</Typography>

        <Mutation mutation={VERIFY_OTP} variables={{ otp, username: username }}>
          {(verify2fa, { loading, error, called, client }) => {
            let message;
            if (error) {
              message = error.message.replace("GraphQL Error:", "").trim();
              message = message.replace("GraphQL error:", "").trim();
            }
            return (
              <div>
                <div className={classes.text}>
                  <Typography
                    className={classes.text}
                    variant="body2"
                    color="secondary"
                  >
                    Please enter the code sent to your registered email
                  </Typography>
                </div>
                {error && (
                  <div className={classes.text}>
                    <Typography
                      className={classes.text}
                      variant="body2"
                      color="error"
                      style={{ fontSize: "18px", color: "red" }}
                    >
                      {message}
                    </Typography>
                  </div>
                )}

                <form
                  onSubmit={event => handleSubmit(event, verify2fa, client)}
                  className={classes.form}
                >
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="username">OTP</InputLabel>
                    <Input
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                      id="username"
                    />
                  </FormControl>
                  {otperror && (
                    <Typography
                      className={classes.text}
                      variant="body2"
                      color="error"
                    >
                      OTP incorrect, pLease try again
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    disabled={loading || !otp.trim()}
                    className={classes.submit}
                  >
                    {loading ? "Verifying ..." : "Verify"}
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      history.push("/");
                    }}
                  >
                    Cancel
                  </Button>
                </form>
              </div>
            );
          }}
        </Mutation>
      </Paper>

      {/* Success Dialog */}
    </div>
  );
};

const VERIFY_OTP = gql`
  mutation($otp: String!, $username: String!) {
    verify2fa(otp: $otp, username: $username) {
      isVerified
      token
    }
  }
`;

const styles = theme => ({
  root: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up("md")]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing.unit * 2
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  icon: {
    padding: "0px 2px 2px 0px",
    verticalAlign: "middle",
    color: "green"
  },
  text: {
    marginTop: theme.spacing.unit * 3
  }
});

export default withStyles(styles)(Register);
