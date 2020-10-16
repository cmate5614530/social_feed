import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Logo from "../../assets/logo.png";
import Slide from "@material-ui/core/Slide";
import Gavel from "@material-ui/icons/Gavel";
import VerifiedUserTwoTone from "@material-ui/icons/VerifiedUserTwoTone";
import { withRouter } from "react-router-dom";
import To from "../Shared/to";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import Error from "../Shared/Error";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const Login = ({ classes, setCurrentRoute, setPropsUsername, history }) => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async (event, tokenAuth, client) => {
    event.preventDefault();
    const res = await tokenAuth();
    if (res.data.customLogin.user.profileSet[0].is2fa) {
      history.push(`/twofa/${username}`);
    } else {
      if (window.navigator.userAgent == "buzzrakerapp")
        window.ReactNativeWebView.postMessage(`setLoggedIn:true`);
      localStorage.setItem("authtoken", res.data.customLogin.token);
      history.push(`/`);
      client.writeData({ data: { isLoggedIn: true } });
    }
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar src={Logo} className={classes.avatar} />

        <Typography variant="headline">Register</Typography>

        <Mutation mutation={LOGIN_MUTATION} variables={{ username, password }}>
          {(tokenAuth, { loading, error, called, client }) => {
            let message;
            if (error) {
              message = error.message.replace("GraphQL Error:", "").trim();
              message = message.replace("GraphQL error:", "").trim();
            }
            return (
              <>
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
                  onSubmit={event => handleSubmit(event, tokenAuth, client)}
                  className={classes.form}
                >
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input
                      id="username"
                      onChange={event => {
                        let tuser = event.target.value;

                        setUsername(tuser.toLowerCase());
                      }}
                      value={username}
                    />
                  </FormControl>

                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      id="password"
                      type="password"
                      onChange={event => setPassword(event.target.value)}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    disabled={loading || !username.trim() || !password.trim()}
                    className={classes.login}
                  >
                    {loading ? "Loginingin ..." : "Login"}
                  </Button>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      style={{ fontSize: "0.9em" }}
                      onClick={() => {
                        history.push("/forgetPassword");
                      }}
                      color="primary"
                    >
                      Forgot Password?
                    </Button>
                  </div>

                  <Button
                    onClick={() => {
                      history.push("/");
                    }}
                    color="primary"
                    variant="outlined"
                    fullWidth
                  >
                    Don't Have an account? Register here.
                  </Button>
                </form>
              </>
            );
          }}
        </Mutation>
      </Paper>

      {/* Success Dialog */}
    </div>
  );
};

const LOGIN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    customLogin(username: $username, password: $password) {
      token
      user {
        profileSet {
          is2fa
        }
      }
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
  loginbutton: {
    marginTop: theme.spacing.unit * 2
  },
  icon: {
    padding: "0px 2px 2px 0px",
    verticalAlign: "middle",
    color: "green"
  }
});

export default withStyles(styles)(Login);
