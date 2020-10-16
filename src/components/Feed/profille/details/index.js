/* import React , {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import Person from '@material-ui/icons/Person';
import Email from '@material-ui/icons/Email';
import LocationCity from '@material-ui/icons/LocationCity';
import AccountBalance from '@material-ui/icons/AccountBalance';
import Work from '@material-ui/icons/Work';
import Description from '@material-ui/icons/Description';
import Explore from '@material-ui/icons/Explore';
import Edit from '@material-ui/icons/Edit';
import Editmodal from './editmodal'
import {STATIC_URL} from '../../../../config/'
import {Context } from '../../../usercontext'
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FolderList({profile, email,refetchQueries}) {
    const cuser = React.useContext(Context)
    console.log("uset4t3rrrrr")
    console.log(cuser)
    console.log(profile)
    const [editModalOpen, setEditModalOpen] = useState(false)
  const classes = useStyles();

  return (
      <div>
          <div style={{    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
    paddingLeft: "20px", display:"flex", justifyContent:"space-between"}}>
           <Typography variant="h6"  component="h6">
                   Your Profile
                </Typography>
                {cuser.id == profile.user.id ? (
                      <Edit
                      onClick={()=>s<Payment
paymentModalOpen={paymentModalOpen}
handlePaymentModalClose={()=>setPaymentModalOpen(false)}
userid={cuser.id}
refetchQueries={() =>{

  return [{ query: GET_PROFILE, variables:{id:match.params.username} }]

}}
/>etEditModalOpen(true)}
                      style={{color:"indigo"}} />
                ):null}

                </div>

    <List style={{maxWidth:"initial"}} className={classes.root}>

      <ListItem>
        <ListItemAvatar>
            <Avatar>
                <Person />
            </Avatar>
        </ListItemAvatar>
        <ListItemText style={{color:"rgba(0, 0, 0, 0.54)"}} primary="Full Name"  />
            <ListItemSecondaryAction>
                <Typography variant="body1"  component="h6">
                   {profile.fullname}
                </Typography>
            </ListItemSecondaryAction>
        </ListItem>

        <ListItem>
        <ListItemAvatar>
            <Avatar>
                <Email />
            </Avatar>
        </ListItemAvatar>
        <ListItemText style={{color:"rgba(0, 0, 0, 0.54)"}} primary="Email"  />
            <ListItemSecondaryAction>
                <Typography variant="body1"  component="h6">
                   {email}
                </Typography>
            </ListItemSecondaryAction>
        </ListItem>

        <ListItem>
        <ListItemAvatar>
            <Avatar>
               <LocationCity />
            </Avatar>
        </ListItemAvatar>
        <ListItemText style={{color:"rgba(0, 0, 0, 0.54)"}} primary="City"  />
            <ListItemSecondaryAction>
                <Typography variant="body1"  component="h6">
                    {profile.city}
                </Typography>
            </ListItemSecondaryAction>
        </ListItem>

        <ListItem>
        <ListItemAvatar>
            <Avatar>
                <Explore />
            </Avatar>
        </ListItemAvatar>
        <ListItemText style={{color:"rgba(0, 0, 0, 0.54)"}} primary="State"  />
            <ListItemSecondaryAction>
                <Typography variant="body1"  component="h6">
                    {profile.state}
                </Typography>
            </ListItemSecondaryAction>
        </ListItem>

        <ListItem>
        <ListItemAvatar>
            <Avatar>
                <AccountBalance />
            </Avatar>
        </ListItemAvatar>
        <ListItemText style={{color:"rgba(0, 0, 0, 0.54)"}} primary="Country"  />
            <ListItemSecondaryAction>
                <Typography variant="body1"  component="h6">
                    {profile.country}
                </Typography>
            </ListItemSecondaryAction>
        </ListItem>

        <ListItem>
        <ListItemAvatar>
            <Avatar>
                <Work />
            </Avatar>
        </ListItemAvatar>
        <ListItemText style={{color:"rgba(0, 0, 0, 0.54)"}} primary="Occupation"  />
            <ListItemSecondaryAction>
                <Typography variant="body1"  component="h6">
                   {profile.occupation}
                </Typography>
            </ListItemSecondaryAction>
        </ListItem>

        <ListItem>
        <ListItemAvatar>
            <Avatar>
                <Description />
            </Avatar>
        </ListItemAvatar>
        <ListItemText style={{color:"rgba(0, 0, 0, 0.54)"}} primary="Short Description"  />
            <ListItemSecondaryAction>
                <Typography variant="body1"  component="h6">
                    {profile.shortdescription}
                </Typography>
            </ListItemSecondaryAction>
        </ListItem>

    </List>
    {editModalOpen && <Editmodal
    handleClose={()=>setEditModalOpen(false)}
    profile={profile}
    email={email}
    refetchQueries={refetchQueries}
    />}
    </div>
  );
} */

import { Mutation, Query } from "react-apollo";
import { gql } from "apollo-boost";

import { InputAdornment } from "@material-ui/core";
import { Error } from "@material-ui/icons";

import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";
import Person from "@material-ui/icons/Person";
import Email from "@material-ui/icons/Email";
import LocationCity from "@material-ui/icons/LocationCity";
import AccountBalance from "@material-ui/icons/AccountBalance";
import Work from "@material-ui/icons/Work";
import Description from "@material-ui/icons/Description";
import Explore from "@material-ui/icons/Explore";
import Edit from "@material-ui/icons/Edit";
import Editmodal from "./editmodal";
import { STATIC_URL } from "../../../../config/";
import Grid from "@material-ui/core/Grid";
import { Context } from "../../../usercontext";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import Loading from "../../../Shared/loading";
import Errorshow from "../../../Shared/Error";
import SuccessDialog from "./successdialog";
import "./profile.css";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  itemcontainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "8px"
  },
  itemplaceholder: {
    flex: 1,
    marginLeft: "16px"
  },
  itemplaceholdercontent: {
    fontSize: "1rem",
    fontFamily: "Roboto",
    fontWeight: "400",
    lineHeight: "1.5",
    paddingTop: "0",
    color: "rgba(0, 0, 0, 0.54)",
    padding: "0",
    margin: "0",
    letterSpacing: "0.00938em",
    marginLeft: "16px"
  },
  itemcontent: {
    flex: 2
  },
  showpointer: {
    "&:hover": {
      cursor: "pointer"
    }
  }
}));

export default function FolderList({ profile, email, refetchQueries }) {
  const cuser = React.useContext(Context);

  const [currentActive, setCurrentActive] = useState(1);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const classes = useStyles();

  return (
    <div>
      <div>
        <Grid container spacing={3}>
          <Grid style={{ background: "#eeeeee" }} item xs={12} md={4}>
            <div onClick={() => setCurrentActive(1)}>
              <Typography
                className={classes.showpointer}
                style={
                  currentActive == 1
                    ? {
                        border: "1px solid indigo",
                        paddingLeft: "10px",
                        borderRightRadius: "50%",
                        borderBottomRightRadius: "1em",
                        borderTopRightRadius: "1em",
                        marginBottom: "16px",
                        fontWeight: "initial",
                        fontSize: "1rem",
                        background: "indigo",
                        color: "white"
                      }
                    : {
                        border: "1px solid indigo",
                        paddingLeft: "10px",
                        borderRightRadius: "50%",
                        borderBottomRightRadius: "1em",
                        borderTopRightRadius: "1em",
                        marginBottom: "16px",
                        fontWeight: "initial",
                        fontSize: "1rem"
                      }
                }
                variant="h6"
                component="p"
              >
                Profile Details
              </Typography>
            </div>

            {cuser.id == profile.user.id && (
              <div onClick={() => setCurrentActive(2)}>
                <Typography
                  className={classes.showpointer}
                  style={
                    currentActive == 2
                      ? {
                          border: "1px solid indigo",
                          paddingLeft: "10px",
                          borderRightRadius: "50%",
                          borderBottomRightRadius: "1em",
                          borderTopRightRadius: "1em",
                          marginBottom: "16px",
                          fontWeight: "initial",
                          fontSize: "1rem",
                          background: "indigo",
                          color: "white"
                        }
                      : {
                          border: "1px solid indigo",
                          paddingLeft: "10px",
                          borderRightRadius: "50%",
                          borderBottomRightRadius: "1em",
                          borderTopRightRadius: "1em",
                          marginBottom: "16px",
                          fontWeight: "initial",
                          fontSize: "1rem"
                        }
                  }
                  variant="h6"
                  component="p"
                >
                  Password
                </Typography>
              </div>
            )}

            {cuser.id == profile.user.id && (
              <div onClick={() => setCurrentActive(3)}>
                <Typography
                  className={classes.showpointer}
                  style={
                    currentActive == 3
                      ? {
                          border: "1px solid indigo",
                          paddingLeft: "10px",
                          borderRightRadius: "50%",
                          borderBottomRightRadius: "1em",
                          borderTopRightRadius: "1em",
                          marginBottom: "16px",
                          fontWeight: "initial",
                          fontSize: "1rem",
                          background: "indigo",
                          color: "white"
                        }
                      : {
                          border: "1px solid indigo",
                          paddingLeft: "10px",
                          borderRightRadius: "50%",
                          borderBottomRightRadius: "1em",
                          borderTopRightRadius: "1em",
                          marginBottom: "16px",
                          fontWeight: "initial",
                          fontSize: "1rem"
                        }
                  }
                  variant="h6"
                  component="p"
                >
                  Two Factor Authentication
                </Typography>
              </div>
            )}
            <div onClick={() => setCurrentActive(4)}>
              <Typography
                className={classes.showpointer}
                style={
                  currentActive == 4
                    ? {
                        border: "1px solid indigo",
                        paddingLeft: "10px",
                        borderRightRadius: "50%",
                        borderBottomRightRadius: "1em",
                        borderTopRightRadius: "1em",
                        marginBottom: "16px",
                        fontWeight: "initial",
                        fontSize: "1rem",
                        background: "indigo",
                        color: "white"
                      }
                    : {
                        border: "1px solid indigo",
                        paddingLeft: "10px",
                        borderRightRadius: "50%",
                        borderBottomRightRadius: "1em",
                        borderTopRightRadius: "1em",
                        marginBottom: "16px",
                        fontWeight: "initial",
                        fontSize: "1rem"
                      }
                }
                variant="h6"
                component="p"
              >
                Contact US
              </Typography>
            </div>

            {cuser.id == profile.user.id && (
              <div onClick={() => setCurrentActive(5)}>
                <Typography
                  className={classes.showpointer}
                  style={
                    currentActive == 5
                      ? {
                          border: "1px solid indigo",
                          paddingLeft: "10px",
                          borderRightRadius: "50%",
                          borderBottomRightRadius: "1em",
                          borderTopRightRadius: "1em",
                          marginBottom: "16px",
                          fontWeight: "initial",
                          fontSize: "1rem",
                          background: "indigo",
                          color: "white"
                        }
                      : {
                          border: "1px solid indigo",
                          paddingLeft: "10px",
                          borderRightRadius: "50%",
                          borderBottomRightRadius: "1em",
                          borderTopRightRadius: "1em",
                          marginBottom: "16px",
                          fontWeight: "initial",
                          fontSize: "1rem"
                        }
                  }
                  variant="h6"
                  component="p"
                >
                  Change Email
                </Typography>
              </div>
            )}
          </Grid>

          <Grid item xs={12} md={8}>
            {currentActive == 1 ? (
              <Profiledetails
                email={email}
                refetchQueries={refetchQueries}
                cuser={cuser}
                profile={profile}
              />
            ) : null}
            {currentActive == 2 ? <Password /> : null}
            {currentActive == 3 ? (
              <Twofactor
                refetchQueries={refetchQueries}
                cuser={cuser}
                profile={profile}
              />
            ) : null}
            {currentActive == 4 ? <Contact /> : null}
            {currentActive == 5 ? <ChangeEmail /> : null}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

function Profiledetails({ profile, cuser, email, refetchQueries }) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const classes = useStyles();

  //console.log(email)
  return (
    <>
      <div
        style={{
          borderBottom: "1px solid #ddd",
          paddingBottom: "10px",
          paddingLeft: "20px",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <Typography variant="h6" component="h6">
          User Profile
        </Typography>
        {cuser ? (
          cuser.id == profile.user.id ? (
            <Edit
              onClick={() => setEditModalOpen(true)}
              style={{ color: "indigo" }}
            />
          ) : null
        ) : null}
      </div>

      <div className={classes.itemcontainer}>
        <div className={clsx(classes.itemplaceholder, classes.itemcontainer)}>
          <Avatar>
            <Person />
          </Avatar>
          <h6 className={classes.itemplaceholdercontent}>Full Name</h6>
        </div>
        <div className={classes.itemcontent}>{profile.fullname}</div>
      </div>

      {email != "false" ? (
        <div className={classes.itemcontainer}>
          <div className={clsx(classes.itemplaceholder, classes.itemcontainer)}>
            <Avatar>
              <Email />
            </Avatar>
            <h6 className={classes.itemplaceholdercontent}>Email</h6>
          </div>
          <div className={classes.itemcontent}>{email}</div>
        </div>
      ) : null}
      <div className={classes.itemcontainer}>
        <div className={clsx(classes.itemplaceholder, classes.itemcontainer)}>
          <Avatar>
            <LocationCity />
          </Avatar>
          <h6 className={classes.itemplaceholdercontent}>City</h6>
        </div>
        <div className={classes.itemcontent}>{profile.city}</div>
      </div>

      <div className={classes.itemcontainer}>
        <div className={clsx(classes.itemplaceholder, classes.itemcontainer)}>
          <Avatar>
            <Explore />
          </Avatar>
          <h6 className={classes.itemplaceholdercontent}>State</h6>
        </div>
        <div className={classes.itemcontent}>{profile.state}</div>
      </div>

      <div className={classes.itemcontainer}>
        <div className={clsx(classes.itemplaceholder, classes.itemcontainer)}>
          <Avatar>
            <AccountBalance />
          </Avatar>
          <h6 className={classes.itemplaceholdercontent}>Country</h6>
        </div>
        <div className={classes.itemcontent}>{profile.country}</div>
      </div>

      <div className={classes.itemcontainer}>
        <div className={clsx(classes.itemplaceholder, classes.itemcontainer)}>
          <Avatar>
            <Work />
          </Avatar>
          <h6 className={classes.itemplaceholdercontent}>Occupation</h6>
        </div>
        <div className={classes.itemcontent}>{profile.occupation}</div>
      </div>

      <div className={clsx(classes.itemcontainer, "mc")}>
        <div
          className={clsx(classes.itemplaceholder, classes.itemcontainer, "c1")}
        >
          <Avatar>
            <Description />
          </Avatar>
          <h6 className={classes.itemplaceholdercontent}>Short Description</h6>
        </div>
        <div className={clsx(classes.itemcontent, "c2")}>
          {profile.shortdescription}
        </div>
      </div>
      {editModalOpen && (
        <Editmodal
          handleClose={() => setEditModalOpen(false)}
          profile={profile}
          email={email}
          refetchQueries={refetchQueries}
        />
      )}
    </>
  );
}

function Password() {
  const [password, setPassword] = useState("");
  const [opassword, setOpassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [passwordNotMatch, setPasswordNotMatch] = useState("");

  const [passwordValid, setPasswordValid] = useState(true);

  const handleSubmit = async updatePassword => {
    //
    if (!passwordNotMatch && passwordValid) {
      const res = await updatePassword();

      if (res.data.updatePassword.status) alert("Pasword Updated Succesfully");
    }
  };
  return (
    <>
      <Mutation
        mutation={UPDATE_PASSWORD_MUTATION}
        variables={{ op: opassword, p: password }}
        onCompleted={data => {}}
      >
        {(updatePassword, { loading, error, called, client }) => {
          return (
            <div>
              <div
                style={{
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "10px",
                  paddingLeft: "20px"
                }}
              >
                <Typography variant="h6" component="h6">
                  Password Change
                </Typography>
              </div>

              {error && (
                <div style={{ marginTop: "24px" }}>
                  <Typography
                    style={{ marginTop: "24px" }}
                    variant="body2"
                    color="error"
                  >
                    {error.message}
                  </Typography>
                </div>
              )}

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Old Password</InputLabel>
                <Input
                  id="password"
                  type="password"
                  value={opassword}
                  onChange={event => setOpassword(event.target.value)}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">New Password</InputLabel>
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
              {!passwordValid && (
                <p style={{ marginTop: 0, opacity: "0.7" }}>
                  Minimum 8 Characters, Must Contain one Capital, one small and
                  one number
                </p>
              )}
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Confirm New Password</InputLabel>
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
              {passwordNotMatch && (
                <p style={{ marginTop: 0, opacity: "0.7" }}>
                  Password Does Not Match
                </p>
              )}
              <Button
                onClick={() => handleSubmit(updatePassword)}
                style={{ marginTop: "16px" }}
                fullWidth
                variant="contained"
                color="primary"
                disabled={
                  loading ||
                  !password.trim() ||
                  !cpassword.trim() ||
                  !opassword.trim()
                }
              >
                {loading == false ? "Update" : "Updating"}
              </Button>
            </div>
          );
        }}
      </Mutation>
    </>
  );
}

function Twofactor({ refetchQueries, profile, cuser }) {
  const handleUpdate = async (updateTwofa, value) => {
    let res = await updateTwofa({ variables: { value: value } });
  };
  return (
    <Mutation
      mutation={UPDATE_TWO_FA}
      refetchQueries={refetchQueries}
      onCompleted={data => {}}
    >
      {(updateTwofa, { loading, error, called, client }) => {
        return (
          <div>
            <div
              style={{
                borderBottom: "1px solid #ddd",
                paddingBottom: "10px",
                paddingLeft: "20px"
              }}
            >
              <Typography variant="h6" component="h6">
                Two Factor Authentication
              </Typography>
            </div>

            <div style={{ padding: "16px" }}>
              {profile.is2fa ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Typography variant="body1" component="h6">
                    Two Factor Authentication is enabled.
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => handleUpdate(updateTwofa, false)}
                    disabled={loading}
                    color="primary"
                  >
                    {loading ? "Disabling ..." : "Disable"}
                  </Button>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Typography variant="body1" component="h6">
                    Two Factor Authentication is disabled
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => handleUpdate(updateTwofa, true)}
                    disabled={loading}
                    color="primary"
                  >
                    {loading ? "Enabling ..." : "Enable"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      }}
    </Mutation>
  );
}

function Contact({ refetchQueries, profile, cuser }) {
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [messageSent, setMessageSent] = React.useState(false);
  const handleUpdate = async sendMessage => {
    let res = await sendMessage({ variables: { subject, message } });
    setMessageSent(true);
    setSubject("");
    setMessage("");
  };
  return (
    <Mutation mutation={SEND_MESSAGE} variables={{ subject, message }}>
      {(sendMessage, { loading, error, called, client }) => {
        if (loading) return <Loading />;

        return (
          <div>
            {messageSent && (
              <SuccessDialog handleClose={() => setMessageSent(false)} />
            )}
            {error && <Errorshow error={error} />}
            <div
              style={{
                borderBottom: "1px solid #ddd",
                paddingBottom: "10px",
                paddingLeft: "20px"
              }}
            >
              <Typography variant="h6" component="h6">
                Contact US
              </Typography>
            </div>
            <div style={{ padding: "16px" }}>
              <TextField
                onChange={e => setSubject(e.target.value)}
                value={subject}
                id="outlined-full-width"
                label="Subject"
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>

            <div
              style={{
                paddingLeft: "16px",
                paddingRight: "16px",
                paddingBottom: "16px"
              }}
            >
              <TextField
                id="outlined-full-width"
                label="Message"
                multiline
                onChange={e => setMessage(e.target.value)}
                value={message}
                rows="4"
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
            <div style={{ textAlign: "right", paddingRight: "16px" }}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={loading}
                onClick={() => handleUpdate(sendMessage)}
              >
                {loading ? "Sending ..." : "Send"}
                <Icon style={{ color: "indigo", marginLeft: "8px" }}>send</Icon>
              </Button>
            </div>
          </div>
        );
      }}
    </Mutation>
  );
}

function ChangeEmail() {
  const [currentActive, setCurrentActive] = React.useState(1);
  const [message, setMessage] = React.useState(false);

  return (
    <Query query={IS_EMAIL_CHANGED} fetchPolicy={"cache-and-network"}>
      {({ loading, error, data }) => {
        if (data) {
          if (data.isEmailChanged) {
            if (data.isEmailChanged[0].isOtpChanged) {
              setCurrentActive(2);
            } else {
              setCurrentActive(1);
            }
          }
        }
        if (loading) return <Loading />;
        if (error) {
          return <Error error={error} />;
        }

        return (
          <>
            {currentActive == 1 ? (
              <Showemailbox
                message={message}
                setCurrentActive={setCurrentActive}
              />
            ) : (
              <Showotpbox
                setMessage={setMessage}
                setCurrentActive={setCurrentActive}
              />
            )}
          </>
        );
      }}
    </Query>
  );
}

function Showemailbox(props) {
  const [email, setEmail] = useState("");

  const handleSubmit = async changeEmail => {
    const res = await changeEmail();

    props.setCurrentActive(2);
  };

  return (
    <>
      <Mutation
        mutation={CHANGE_EMAIL}
        variables={{ email: email }}
        refetchQueries={() => {
          return [{ query: IS_EMAIL_CHANGED }];
        }}
        onCompleted={data => {}}
      >
        {(changeEmail, { loading, error, called, client }) => {
          return (
            <div>
              <div
                style={{
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "10px",
                  paddingLeft: "20px"
                }}
              >
                <Typography variant="h6" component="h6">
                  Email Change
                </Typography>
              </div>

              {error && (
                <div style={{ marginTop: "24px" }}>
                  <Typography
                    style={{ marginTop: "24px" }}
                    variant="body2"
                    color="error"
                  >
                    {error.message}
                  </Typography>
                </div>
              )}

              {props.message && (
                <div style={{ marginTop: "24px" }}>
                  <Typography
                    style={{ marginTop: "24px" }}
                    variant="body2"
                    color="error"
                  >
                    {props.message}
                  </Typography>
                </div>
              )}

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">New Email</InputLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              </FormControl>

              <Button
                onClick={() => handleSubmit(changeEmail)}
                style={{ marginTop: "16px" }}
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading == false ? "Update" : "Updating"}
              </Button>
            </div>
          );
        }}
      </Mutation>
    </>
  );
}

function Showotpbox(props) {
  const [otp, setOtp] = useState("");

  const handleSubmit = async verifyEmailChangeOtp => {
    const res = await verifyEmailChangeOtp();

    props.setMessage("Email Changed Successfully");
    props.setCurrentActive(1);
  };

  return (
    <>
      <Mutation
        refetchQueries={() => {
          return [{ query: IS_EMAIL_CHANGED }];
        }}
        mutation={RESET_EMAIL_CHANGE}
      >
        {(resetEmailChange, { loading, error, called, client }) => {
          if (loading) {
            return <Loading />;
          }

          return (
            <Mutation
              refetchQueries={() => {
                return [{ query: IS_EMAIL_CHANGED }];
              }}
              mutation={VERIFY_EMAIL_CHANGE}
              variables={{ otp: otp }}
              onCompleted={data => {}}
            >
              {(verifyEmailChangeOtp, { loading, error, called, client }) => {
                if (loading) {
                  return <Loading />;
                }
                return (
                  <div>
                    <div
                      style={{
                        borderBottom: "1px solid #ddd",
                        paddingBottom: "10px",
                        paddingLeft: "20px"
                      }}
                    >
                      <Typography variant="h6" component="h6">
                        Otp Change
                      </Typography>
                    </div>

                    {error && (
                      <div style={{ marginTop: "24px" }}>
                        <Typography
                          style={{ marginTop: "24px" }}
                          variant="body2"
                          color="error"
                        >
                          {error.message}
                        </Typography>
                      </div>
                    )}

                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="password">Enter Otp</InputLabel>
                      <Input
                        id="email"
                        type="email"
                        value={otp}
                        onChange={event => setOtp(event.target.value)}
                      />
                    </FormControl>

                    <Button
                      onClick={() => handleSubmit(verifyEmailChangeOtp)}
                      style={{ marginTop: "16px" }}
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={loading}
                    >
                      {loading == false ? "Update" : "Updating"}
                    </Button>
                    <Typography
                      className={"resetemailbutton"}
                      onClick={async () => {
                        await resetEmailChange();
                        props.setMessage(false);
                      }}
                      variant="body2"
                      style={{ color: "indigo" }}
                    >
                      Incorrect Email, Enter Again
                    </Typography>
                  </div>
                );
              }}
            </Mutation>
          );
        }}
      </Mutation>
    </>
  );
}

const IS_EMAIL_CHANGED = gql`
  {
    isEmailChanged {
      id
      emailotp
      tempemail
      isOtpChanged
      user {
        id
        username
      }
    }
  }
`;

const RESET_EMAIL_CHANGE = gql`
  mutation {
    resetEmailChange {
      status
    }
  }
`;

const CHANGE_EMAIL = gql`
  mutation($email: String!) {
    changeEmail(email: $email) {
      status
    }
  }
`;

const VERIFY_EMAIL_CHANGE = gql`
  mutation($otp: String!) {
    verifyEmailChangeOtp(otp: $otp) {
      status
    }
  }
`;

const UPDATE_PASSWORD_MUTATION = gql`
  mutation($op: String!, $p: String) {
    updatePassword(oldpassword: $op, password: $p) {
      status
    }
  }
`;

const UPDATE_TWO_FA = gql`
  mutation($value: Boolean!) {
    updateTwofa(value: $value) {
      status
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation($subject: String!, $message: String!) {
    sendMessage(subject: $subject, message: $message) {
      status
    }
  }
`;
