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
import { GET_CURRENT_USER } from "../../App";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField
} from "@material-ui/core";
import Logo from "../../assets/logo.png";
import { InputAdornment } from "@material-ui/core";
import { Error } from "@material-ui/icons";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function ForgetPassword({ classes, history }) {
  const [currentActive, setCurrentActive] = useState(1);
  const [username, setUsernName] = useState("");

  return (
    <div>
      {currentActive == 1 ? (
        <GetUsername
          setCurrentActive={setCurrentActive}
          setUsernName={setUsernName}
          classes={classes}
          history={history}
        />
      ) : null}

      {currentActive == 2 ? (
        <VerifyOtp
          history={history}
          username={username}
          classes={classes}
          setCurrentActive={setCurrentActive}
        />
      ) : null}

      {currentActive == 3 ? (
        <ChangePassword history={history} classes={classes} />
      ) : null}
    </div>
  );
}

const GetUsername = ({
  classes,
  setCurrentActive,
  setUsernName,
  setCurrentRoute,
  history
}) => {
  const [username, setUsername] = useState("");

  const handleSubmit = async (event, generateOtpForUser, client) => {
    event.preventDefault();
    //

    let res = await generateOtpForUser();

    if (!res.data.generateOtpForUser.status) alert("An error occured");
    else {
      alert("Otp Generated");
      setUsernName(username);
      setCurrentActive(2);
      // console.log(localStorage.getItem("authtoken"))
    }
  };
  console.log("from setcurrentroute", setCurrentRoute);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Gavel />
        </Avatar>
        <Typography variant="headline">Email Verification</Typography>

        <Mutation mutation={GENERATE_OTP} variables={{ username: username }}>
          {(generateOtpForUser, { loading, error, called, client }) => {
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
                    Please enter your username
                  </Typography>
                </div>
                <form
                  onSubmit={event =>
                    handleSubmit(event, generateOtpForUser, client)
                  }
                  className={classes.form}
                >
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      id="username"
                    />
                  </FormControl>
                  {error && (
                    <Typography
                      className={classes.text}
                      variant="body2"
                      color="error"
                    >
                      {message}
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    disabled={loading || !username.trim()}
                    className={classes.submit}
                  >
                    {loading ? "Generating Otp ..." : "generate Otp"}
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

const VerifyOtp = ({
  classes,

  match,
  setCurrentActive,
  username,
  setCurrentRoute,
  history
}) => {
  const [otp, setOtp] = useState("");
  const [otperror, setOtpError] = useState(false);

  const handleSubmit = async (event, verify2fa, client) => {
    event.preventDefault();
    //

    let res = await verify2fa();

    if (res.data.verify2fa.isVerified) {
      localStorage.setItem("authtoken", res.data.verify2fa.token);
      setCurrentActive(3);
    } else {
      alert("Error, Invalid otp");
    }
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Gavel />
        </Avatar>
        <Typography variant="headline">OTP Verification</Typography>

        <Mutation mutation={VERIFY_OTP} variables={{ otp, username: username }}>
          {(verify2fa, { loading, error, called, client }) => {
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
                  {error && (
                    <Typography
                      className={classes.text}
                      variant="body2"
                      color="error"
                    >
                      {error.message}
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

const ChangePassword = ({ classes, setCurrentRoute, history }) => {
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [passwordNotMatch, setPasswordNotMatch] = useState("");

  const [passwordValid, setPasswordValid] = useState(true);

  const handleSubmit = async (event, changePassword, client) => {
    event.preventDefault();
    //
    if (!passwordNotMatch && passwordValid) {
      const res = await changePassword();
      if (res.data.changePassword.status) {
        client.writeData({ data: { isLoggedIn: true } });
      } else {
        alert("An Error Occured");
      }
    }
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar src={Logo} className={classes.avatar} />
        <Typography variant="headline">Register</Typography>

        <Mutation mutation={CHANGE_PASSWORD_MUTATION} variables={{ password }}>
          {(changePassword, { loading, error, called, client }) => {
            return (
              <div>
                {error && (
                  <div className={classes.text}>
                    <Typography
                      className={classes.text}
                      variant="body2"
                      color="error"
                    >
                      {error.message}
                    </Typography>
                  </div>
                )}

                <form
                  onSubmit={event =>
                    handleSubmit(event, changePassword, client)
                  }
                  className={classes.form}
                >
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      id="password"
                      type="password"
                      endAdornment={
                        !passwordValid ? (
                          <InputAdornment position="end">
                            <Error style={{ color: "red" }} />
                          </InputAdornment>
                        ) : null
                      }
                      onChange={event => {
                        setPassword(event.target.value);
                      }}
                      onBlur={() => {
                        let regex = new RegExp(
                          "^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}))"
                        );
                        if (!regex.test(password)) setPasswordValid(false);
                        else setPasswordValid(true);
                      }}
                    />
                  </FormControl>

                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Confirm Password</InputLabel>
                    <Input
                      id="password"
                      type="password"
                      endAdornment={
                        passwordNotMatch ? (
                          <InputAdornment position="end">
                            <Error style={{ color: "red" }} />
                          </InputAdornment>
                        ) : null
                      }
                      onBlur={() => {
                        if (password != cpassword) setPasswordNotMatch(true);
                        else setPasswordNotMatch(false);
                      }}
                      onChange={event => setCpassword(event.target.value)}
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    disabled={loading || !password.trim() || !cpassword.trim()}
                    className={classes.submit}
                  >
                    {loading ? "Updating ..." : "Update"}
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
    </div>
  );
};

const CHANGE_PASSWORD_MUTATION = gql`
  mutation($password: String!) {
    changePassword(password: $password) {
      status
    }
  }
`;

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

const GENERATE_OTP = gql`
  mutation($username: String!) {
    generateOtpForUser(username: $username) {
      status
    }
  }
`;

export default withStyles(styles)(ForgetPassword);
