import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import avatar from "../../../../assets/avatar.jpeg";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { STATIC_URL } from "../../../../config/";
import { Context } from "../../../usercontext";
import { withRouter } from "react-router-dom";
import Loading from "../../../Shared/loading";
import Error from "../../../Shared/Error";
import "./followerstab.css";
import RemoveCircleOutline from "@material-ui/icons/RemoveCircleOutline";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  showpointer: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

function followers(props) {
  function handleNoFollower(data) {
    if (data.specificuserfollower != undefined) {
      return data.specificuserfollower.followerId.map(item => (
        <Showfollowers
          username={props.username}
          history={props.history}
          refetchQueries={() => {
            return [
              { query: GET_FOLLOWER, variables: { userid: props.userid } },
            ];
          }}
          item={item}
        />
      ));
    } else {
      return <p>No Follower</p>;
    }
  }

  return (
    <Query
      query={GET_FOLLOWER}
      fetchPolicy="cache-and-network"
      variables={{ userid: props.userid }}
    >
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <div>
            <Grid container spacing={3}>
              <Grid style={{ background: "#eeeeee" }} item xs={12} md={4}>
                <div>
                  <Typography
                    style={{
                      border: "1px solid indigo",
                      paddingLeft: "10px",
                      borderRightRadius: "50%",
                      borderBottomRightRadius: "1em",
                      borderTopRightRadius: "1em",
                      marginBottom: "16px",
                      fontWeight: "initial",
                      fontSize: "1rem",
                      background: "indigo",
                      color: "white",
                    }}
                    variant="h6"
                    component="p"
                  >
                    @{props.username} Followers
                  </Typography>
                </div>
              </Grid>

              <Grid item xs={12} md={8}>
                {handleNoFollower(data)}
              </Grid>
            </Grid>
          </div>
        );
      }}
    </Query>
  );
}

const GET_FOLLOWER = gql`
  query($userid: Int!) {
    specificuserfollower(userid: $userid) {
      id
      user {
        id
        username
        profileSet {
          profilePic
        }
      }
      followerId {
        id
        username
        profileSet {
          profilePic
        }
      }
    }
  }
`;

function Showfollowers(props) {
  const cuser = React.useContext(Context);
  const classes = useStyles();

  const handleUnfollow = removeFollower => {
    removeFollower();
  };
  return (
    <div className={classes.root}>
      <div className={classes.demo}>
        <Mutation
          mutation={REMOVE_FOLLOWER}
          variables={{ usertoremoveid: props.item.id }}
          refetchQueries={props.refetchQueries}
        >
          {(removeFollower, { loading, error, called, client }) => {
            if (loading) return <Loading />;
            if (error) return <Error error={error} />;
            return (
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      onClick={() =>
                        props.history.push(`/profile/${props.item.username}`)
                      }
                      src={`${STATIC_URL}${props.item.profileSet[0].profilePic}`}
                      className={classes.showpointer}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    onClick={() =>
                      props.history.push(`/profile/${props.item.username}`)
                    }
                    primary={props.item.username}
                    className={classes.showpointer}
                    s
                  />
                  <ListItemSecondaryAction>
                    {cuser.username == props.username && (
                      <>
                        <Button
                          className="desktopbuttons"
                          onClick={() => handleUnfollow(removeFollower)}
                          variant="outlined"
                          color="primary"
                          color="primary"
                        >
                          Unfollow
                        </Button>
                        <IconButton
                          onClick={() => handleUnfollow(removeFollower)}
                          className="mobilebuttons"
                          aria-label="delete"
                        >
                          <RemoveCircleOutline
                            style={{
                              color: "indigo",
                            }}
                          />
                        </IconButton>
                      </>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            );
          }}
        </Mutation>
      </div>
    </div>
  );
}

const REMOVE_FOLLOWER = gql`
  mutation($usertoremoveid: Int!) {
    removeFollower(userToRemoveId: $usertoremoveid) {
      user {
        id
      }
      userremoved {
        id
      }
    }
  }
`;

export default withRouter(followers);
