import React from "react";

import { fade, makeStyles } from "@material-ui/core/styles";

import SearchIcon from "@material-ui/icons/Search";
import Avatar from "@material-ui/core/Avatar";
import AvatarImage from "../../assets/avatar.png";

import { withRouter } from "react-router-dom";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { withStyles } from "@material-ui/core/styles";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import clsx from "clsx";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import CustomizedTabs from "../Feed/profille/showtabs";
import { Mutation, Query, ApolloConsumer } from "react-apollo";
import Loading from "../Shared/loading";
import { gql } from "apollo-boost";
import { UserContext } from "../usercontext";
import { STATIC_URL } from "../../config";
import Divider from "@material-ui/core/Divider";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MailIcon from "@material-ui/icons/Mail";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Worldtweetlogo from "../../assets/internet.png";

import ArrowRight from "@material-ui/icons/ArrowRight";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Input from "@material-ui/core/Input";

import Error from "../Shared/Error";
import { Context } from "../usercontext";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },

  title: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    display: "none",
    margin: "0px 8px",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    },
    "&:hover": {
      cursor: "pointer"
    }
  },
  titleimage: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    display: "none",
    margin: "0px 8px",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  menulink: {
    flexGrow: 1
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchresults: {
    position: "absolute",
    top: "4em",
    width: "100%"
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  avatar: {
    margin: 10
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  desktopmenu: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  showpointer: {
    "&:hover": {
      cursor: "pointer"
    }
  },
  mobilemenu: {
    display: "flex",
    overflow: "scroll",
    flexDirection: "row",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  mtitle: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    margin: "0px 4px",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    },
    "&:hover": {
      cursor: "pointer"
    }
  },
  hovercolor: {
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    }
  }
}));

function Header(props) {
  const [searchText, setSearchText] = React.useState("");
  const [showsearchResults, setShowSearchResults] = React.useState(false);

  const classes = useStyles();
  let textInput = React.createRef();
  React.useEffect(() => {
    if (window.navigator.userAgent == "buzzrakerapp")
      window.ReactNativeWebView.postMessage(`componentReady:/feeds/tweet`);
  }, []);
  const handleGoToProfile = username => {
    setShowSearchResults(false);
    props.history.push(`/profile/${username}`);
  };
  const goToHashtag = hastag => {
    setShowSearchResults(false);
    props.history.push(`/hashtag/${hastag}`);
  };

  return (
    <ApolloConsumer>
      {client => {
        return (
          <>
            <div style={{ padding: "16px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  border: "1px solid #ccc",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px",
                  alignItems: "center"
                }}
              >
                <Input
                  onChange={e => {
                    setSearchText(e.target.value);
                    if (searchText != "" || searchText != " ") {
                      setShowSearchResults(true);
                    } else setShowSearchResults(false);
                  }}
                  ref={textInput}
                  placeholder="Search…"
                  style={{ flex: 1 }}
                  inputProps={{ "aria-label": "Search" }}
                />
                <div>
                  <SearchIcon />
                </div>
              </div>
              {showsearchResults == true ? (
                searchText[0] == "#" ? (
                  <div>
                    <SearchTags
                      goToHashtag={goToHashtag}
                      searchText={searchText}
                    />
                  </div>
                ) : (
                  <div>
                    <SearchResults
                      goToProfile={handleGoToProfile}
                      searchText={searchText}
                    />
                  </div>
                )
              ) : null}
            </div>
          </>
        );
      }}
    </ApolloConsumer>
  );
}

const StyledMenu = withStyles({})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

function SearchTags(props) {
  return (
    <Query
      query={GET_SEARCH_TAGS}
      variables={{ searchtext: props.searchText.slice(1) }}
    >
      {({ loading, error, data }) => {
        if (loading) return <Loading />;
        if (error) return <Error error={error} />;

        return (
          <div
            style={
              data.searchtags.length > 10
                ? {
                    border: "1px solid #d3d4d5",

                    overflow: "auto"
                  }
                : { border: "1px solid #d3d4d5" }
            }
          >
            {data.searchtags.length == 0 ? (
              <List style={{ background: "#fff", zIndex: "999" }}>
                <ListItem>
                  <ListItemText secondary={"No Hahstags Found"} />
                </ListItem>
              </List>
            ) : (
              <List style={{ background: "#fff", zIndex: "999" }}>
                {data.searchtags.map(item => {
                  return (
                    <>
                      <ListItem
                        className="showpointer"
                        onClick={() => {
                          props.goToHashtag(item.hastag);
                        }}
                      >
                        <ListItemText
                          style={{ color: "indigo" }}
                          primary={item.hastag}
                        />
                      </ListItem>
                      <Divider
                        style={{ marginLeft: 0 }}
                        variant="inset"
                        component="li"
                      />
                    </>
                  );
                })}
              </List>
            )}
          </div>
        );
      }}
    </Query>
  );
}

function SearchResults(props) {
  return (
    <Query query={GET_SEARCH_USER} variables={{ searchtext: props.searchText }}>
      {({ loading, error, data }) => {
        if (loading) return <Loading />;
        if (error) return <Error error={error} />;
        if (data) {
          console.log(data);
        }

        return (
          <div
            style={
              data.searchuser.length > 10
                ? {
                    border: "1px solid #d3d4d5",

                    overflow: "auto"
                  }
                : { border: "1px solid #d3d4d5" }
            }
          >
            {data.searchuser.length == 0 ? (
              <List style={{ background: "#fff", zIndex: "999" }}>
                <ListItem>
                  <ListItemText secondary={"No Users Found"} />
                </ListItem>
              </List>
            ) : (
              <List style={{ background: "#fff", zIndex: "999" }}>
                {data.searchuser.map(item => {
                  return (
                    <>
                      <ListItem
                        className="showpointer"
                        onClick={() => {
                          props.goToProfile(item.username);
                        }}
                      >
                        {item.profileSet != undefined &&
                        Array.isArray(item.profileSet) &&
                        item.profileSet.length >= 1 ? (
                          <ListItemAvatar>
                            <Avatar
                              src={`${STATIC_URL}${item.profileSet[0].profilePic}`}
                            />
                          </ListItemAvatar>
                        ) : null}

                        <ListItemText secondary={item.username} />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </>
                  );
                })}
              </List>
            )}
          </div>
        );
      }}
    </Query>
  );
}

const GET_SEARCH_USER = gql`
  query($searchtext: String!) {
    searchuser(searchtext: $searchtext) {
      username
      id
      profileSet {
        profilePic
      }
    }
  }
`;

const GET_SEARCH_TAGS = gql`
  query($searchtext: String!) {
    searchtags(searchtext: $searchtext) {
      hastag
      id
    }
  }
`;

export default withRouter(Header);
