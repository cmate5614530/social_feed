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
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import Gavel from "@material-ui/icons/Gavel";
import VerifiedUserTwoTone from "@material-ui/icons/VerifiedUserTwoTone";
import To from "../Shared/to";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Checkbox
} from "@material-ui/core";
import Policy from "./policy";
import { InputAdornment } from "@material-ui/core";
import { Error } from "@material-ui/icons";
import Logo from "../../assets/logo.png";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import ArrowRight from "@material-ui/icons/ArrowRight";
import Check from "@material-ui/icons/Check";
import DeleteForever from "@material-ui/icons/DeleteForever";
import MyLocation from "@material-ui/icons/MyLocation";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import MoneyBag from "../../assets/moneybag.png";
import News from "../../assets/news.png";
import Baseball from "../../assets/baseball.png";
import TwitterLogo from "../../assets/twitterlogo.png";
import AccountCircle from "@material-ui/icons/AccountCircle";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const Register = ({ classes, setCurrentRoute, history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [passwordNotMatch, setPasswordNotMatch] = useState("");
  const [open, setOpen] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [showPolicy, setShowPolicy] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(false);

  const handleSubmit = async (event, createUser, client) => {
    event.preventDefault();
    //
    if (!passwordNotMatch && passwordValid) {
      const res = await createUser();
      if (window.navigator.userAgent == "buzzrakerapp")
        window.ReactNativeWebView.postMessage(`setLoggedIn:true`);
      localStorage.setItem("authtoken", res.data.createUser.token);
      history.push("email");
    }
  };
  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item md={6} sm={12}>
          <div className={classes.paper}>
            <p
              style={{
                fontFamily: "Algerian",
                marginBottom: 0,
                marginTop: 0,
                fontSize: "1.7em",
                textAlign: "center"
              }}
            >
              {" "}
              Social Media for Dinner Table
              <br />
              WWW.BuzzRaker.COM
              {"\n"}
            </p>

            <img src={Logo} className={classes.avatar} />
          </div>

          <div>
            <div className={classes.textContainer}>
              <IconButton edge="end" aria-label="Delete">
                <img
                  src={MoneyBag}
                  style={{
                    color: "indigo",

                    marginRight: "16px"
                  }}
                />
              </IconButton>
              <Typography className={classes.paragraph} variant="body2">
                Up to $500 in rewards to{" "}
                <span style={{ color: "blue", fontWeight: "bold" }}>
                  verified users
                </span>{" "}
                for creating great content (check T&C for details).
              </Typography>
            </div>

            <div className={classes.textContainer}>
              <IconButton edge="end" aria-label="Delete">
                <img
                  src={TwitterLogo}
                  style={{
                    color: "indigo",

                    marginRight: "16px"
                  }}
                />
              </IconButton>

              <IconButton edge="end" aria-label="Delete">
                <img
                  src={News}
                  style={{
                    color: "indigo",

                    marginRight: "0px"
                  }}
                />
              </IconButton>

              <IconButton edge="end" aria-label="Delete">
                <img
                  src={Baseball}
                  style={{
                    color: "indigo",

                    marginRight: "16px"
                  }}
                />
              </IconButton>

              <Typography className={classes.paragraph} variant="body2">
                4-IN-1: Twitter, CNN, ESPN, FOX all in 1 platform.
              </Typography>
            </div>

            <div className={classes.textContainer}>
              <IconButton edge="end" aria-label="Delete">
                <img
                  src={TwitterLogo}
                  style={{
                    color: "indigo",

                    marginRight: "16px"
                  }}
                />
              </IconButton>

              <IconButton edge="end" aria-label="Delete">
                <img
                  src={News}
                  style={{
                    color: "indigo",

                    marginRight: "0px"
                  }}
                />
              </IconButton>

              <IconButton edge="end" aria-label="Delete">
                <img
                  src={Baseball}
                  style={{
                    color: "indigo",

                    marginRight: "16px"
                  }}
                />
              </IconButton>

              <Typography className={classes.paragraph} variant="body2">
                Create Buzz, follow breaking news and breaking tweets.
              </Typography>
            </div>

            <div className={classes.textContainer}>
              <IconButton edge="end" aria-label="Delete">
                <DeleteForever
                  style={{
                    color: "indigo",
                    borderRadius: "50%",
                    marginRight: "16px"
                  }}
                />
              </IconButton>
              <Typography
                className={classes.paragraph}
                style={{ marginTop: 0 }}
                variant="body2"
              >
                Career friendly, posts auto delete after 1 year.
              </Typography>
            </div>

            <div className={classes.textContainer}>
              <IconButton edge="end" aria-label="Delete">
                <MyLocation
                  style={{
                    color: "indigo",
                    borderRadius: "50%",
                    marginRight: "16px"
                  }}
                />
              </IconButton>
              <Typography className={classes.paragraph} variant="body2">
                No Russian influence, posts show country of origin.
              </Typography>
            </div>

            <div className={classes.textContainer}>
              <IconButton edge="end" aria-label="Delete">
                <RecordVoiceOver
                  style={{
                    color: "indigo",
                    borderRadius: "50%",
                    marginRight: "16px"
                  }}
                />
              </IconButton>
              <Typography className={classes.paragraph} variant="body2">
                Absolutely no shadow banning, rudeness censored.
              </Typography>
            </div>

            <div className={classes.textContainer}>
              <IconButton edge="end" aria-label="Delete">
                <AccountCircle
                  style={{
                    color: "indigo",
                    borderRadius: "50%",
                    marginRight: "16px"
                  }}
                />
              </IconButton>
              <Typography className={classes.paragraph} variant="body2">
                Only real humans, no bots and trolls accounts permitted.
              </Typography>
            </div>

            <div className={classes.textContainer}>
              <IconButton edge="end" aria-label="Delete">
                <VerifiedUser
                  style={{
                    color: "indigo",
                    borderRadius: "50%",
                    marginRight: "16px"
                  }}
                />
              </IconButton>
              <Typography className={classes.paragraph} variant="body2">
                Verified account status available for all users if conditions
                fulfilled.
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item md={6} sm={12}>
          <div>
            <Mutation
              mutation={REGISTER_MUTATION}
              variables={{ username, email, password }}
            >
              {(createUser, { loading, error, called, client }) => {
                let message;
                if (error) {
                  message = error.message.replace("GraphQL Error:", "").trim();
                  message = message.replace("GraphQL error:", "").trim();
                }
                return (
                  <Paper className={classes.paper}>
                    <Button
                      onClick={() => {
                        if (window.navigator.userAgent == "buzzrakerapp")
                          window.ReactNativeWebView.postMessage(
                            `setTempuser:true`
                          );
                        client.writeData({ data: { tempuser: true } });
                      }}
                      style={{ marginBottom: "16px" }}
                      color="primary"
                      // variant="outlined"
                      variant="contained"
                      fullWidth
                    >
                      Skip Registration (You agreee to accept T&C and cookies
                      policy)
                    </Button>
                    <Typography variant="h4" component={"h4"}>
                      Create an Account
                    </Typography>

                    <div>
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
                        onSubmit={event =>
                          handleSubmit(event, createUser, client)
                        }
                        className={classes.form}
                        style={{ marginTop: 0 }}
                      >
                        <FormControl
                          margin="normal"
                          required
                          fullWidth
                          style={{ marginTop: 0 }}
                        >
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
                          <InputLabel htmlFor="email">Email</InputLabel>
                          <Input
                            id="email"
                            type="email"
                            onChange={event => setEmail(event.target.value)}
                          />
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                          <InputLabel htmlFor="password">Password</InputLabel>
                          <Input
                            id="password"
                            type="password"
                            helperText="Some important text"
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
                              if (!regex.test(password))
                                setPasswordValid(false);
                              else setPasswordValid(true);
                            }}
                          />
                        </FormControl>
                        {!passwordValid && (
                          <p style={{ marginTop: 0, opacity: "0.7" }}>
                            Minimum 8 Characters, Must Contain one Capital, one
                            small and one number
                          </p>
                        )}

                        <FormControl margin="normal" required fullWidth>
                          <InputLabel htmlFor="password">
                            Confirm Password
                          </InputLabel>
                          <Input
                            id="cpassword"
                            type="password"
                            endAdornment={
                              passwordNotMatch ? (
                                <InputAdornment position="end">
                                  <Error style={{ color: "red" }} />
                                </InputAdornment>
                              ) : null
                            }
                            onBlur={() => {
                              if (password != cpassword) {
                                setPasswordNotMatch(true);
                              } else setPasswordNotMatch(false);
                            }}
                            onChange={event => {
                              setCpassword(event.target.value);
                              if (event.target.value == password) {
                                setPasswordNotMatch(false);
                              }
                            }}
                          />
                          {passwordNotMatch && (
                            <p style={{ marginTop: 0, opacity: "0.7" }}>
                              Password Does Not Match
                            </p>
                          )}
                        </FormControl>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center"
                          }}
                        >
                          <Checkbox
                            onChange={() => setPolicyAccepted(!policyAccepted)}
                          />
                          <Typography
                            onClick={() =>
                              history.push("/terms-and-conditions")
                            }
                            variant="headline"
                            style={{ color: "indigo" }}
                          >
                            Accept User Account Policy (T&C)
                          </Typography>
                        </div>

                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="secondary"
                          disabled={
                            loading ||
                            !username.trim() ||
                            !password.trim() ||
                            !email.trim() ||
                            !policyAccepted ||
                            !cpassword.trim()
                          }
                          className={classes.submit}
                        >
                          {loading ? "Registering ..." : "Register"}
                        </Button>

                        <Typography
                          className={classes.loginbutton}
                          onClick={() => history.push("/login")}
                          variant="body2"
                          style={{ color: "indigo" }}
                        >
                          Do you already have an account ? Log In !!
                        </Typography>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <Button
                            onClick={() =>
                              history.push("/terms-and-conditions")
                            }
                            style={{ flex: 1, fontSize: "12px" }}
                            fullWidth
                            variant="outlined"
                            color="primary"
                          >
                            Terms and Conditions
                          </Button>
                          <Button
                            onClick={() => history.push("/privacy-policy")}
                            style={{
                              flex: 1,
                              marginLeft: "8px",
                              fontSize: "12px"
                            }}
                            fullWidth
                            variant="outlined"
                            color="primary"
                          >
                            Privacy Policy
                          </Button>
                        </div>
                      </form>
                    </div>
                  </Paper>
                );
              }}
            </Mutation>

            {showPolicy && <Policy handleClose={() => setShowPolicy(false)} />}
            <Dialog open={open} TransitionComponent={Transition}>
              <DialogTitle>
                <VerifiedUserTwoTone className={classes.icon} />
                New Account
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  User Successfully Registered
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    setOpen(false);
                    setCurrentRoute("Login");
                  }}
                >
                  Login
                </Button>
              </DialogActions>
            </Dialog>
            {/* Success Dialog */}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

const REGISTER_MUTATION = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
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
    marginTop: theme.spacing.unit * 4,
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
    width: "96px",
    borderRadius: " 50%"
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
  },
  paragraph: {},
  loginbutton: {
    marginBottom: theme.spacing.unit * 2,
    "&:hover": {
      cursor: "pointer"
    }
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
});

export default withStyles(styles)(Register);
