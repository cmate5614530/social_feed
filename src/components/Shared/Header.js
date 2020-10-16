import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Avatar from "@material-ui/core/Avatar";
import avatar from "../../assets/avatar.jpeg";
import { Link, Redirect, withRouter } from "react-router-dom";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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
import CNNLogo from "../../assets/cnnlogo.png";
import ESPNLogo from "../../assets/espnlogo.jpg";
import Homelogo from "../../assets/house-outline.png";
import FOXLogo from "../../assets/foxlogo.jpeg";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "./Header.css";
import ArrowRight from "@material-ui/icons/ArrowRight";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Input from "@material-ui/core/Input";
import SiteLogo from "../../assets/logosmall.png";
import Error from "./Error";
import { Context } from "../usercontext";
import Avatarimage from "../../assets/logo.png";

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchText, setSearchText] = React.useState("");
  const [showsearchResults, setShowSearchResults] = React.useState(false);
  const [draweropen, setDrawerOpen] = React.useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
  const [currentActive, setCurrentActive] = React.useState(false);
  const cuser = React.useContext(Context);
  const classes = useStyles();
  let textInput = React.createRef();

  const handleGoToProfile = username => {
    setShowSearchResults(false);
    props.history.push(`/profile/${username}`);
  };
  const goToHashtag = hastag => {
    setShowSearchResults(false);
    props.history.push(`/hashtag/${hastag}`);
  };

  const handleNavigation = link => {
    props.history.push(link);
    handleProfileDropdownClose();
  };

  const handleProfileDropdownShow = event => {
    setAnchorEl(event.currentTarget);
  };
  function handleProfileDropdownClose() {
    setAnchorEl(null);
  }
  const handleClickAway = () => {
    setProfileMenuOpen(false);
  };
  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };
  React.useEffect(() => {
    let loc = window.location.href;
    let locsplit = loc.split("/");
    if (locsplit[3] == "") {
      setCurrentActive("home");
      props.setCurrentAside("random");
    } else if (locsplit[3] == "espnfeed") {
      setCurrentActive("espn");
      props.setCurrentAside(false);
    } else if (locsplit[3] == "foxfeed") {
      setCurrentActive("fox");
      props.setCurrentAside(false);
    } else if (locsplit[3] == "cnnfeed") {
      setCurrentActive("cnn");
      props.setCurrentAside(false);
    } else if (locsplit[3] == "worldtweets") {
      setCurrentActive("worldtweet");
      props.setCurrentAside("handle");
    } else if (locsplit[3] == "fun") {
      setCurrentActive("fun");
      props.setCurrentAside("random");
    } else {
    }
  });
  return (
    <ApolloConsumer>
      {client => {
        return (
          <>
            <AppBar position="fixed">
              <Toolbar>
                {/*  <IconButton
                  onClick={toggleDrawer(true)}
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                > backgroundColor: fade(theme.palette.common.white, 0.25),
      paddingTop: "16px",
      paddingBottom: "16px"
                  <MenuIcon />
                </IconButton> */}

                <div className={clsx(classes.titleimage, classes.desktopmenu)}>
                  <img
                    src={SiteLogo}
                    style={{ width: "60px", borderRadius: "50%" }}
                  />
                </div>
                <div
                  onClick={() => handleNavigation("/")}
                  style={
                    currentActive == "home"
                      ? {
                          background: "#6b066b"
                        }
                      : null
                  }
                  className={clsx(classes.title, classes.hovercolor)}
                >
                  <img
                    src={Homelogo}
                    style={{
                      height: "24px",
                      width: "24px",
                      marginBottom: "5px"
                    }}
                  />
                  <Typography
                    className={clsx(
                      classes.title,
                      classes.desktopmenu,
                      "hide",
                      "test"
                    )}
                    variant="p"
                    noWrap
                  >
                    Home
                  </Typography>
                </div>

                <div
                  onClick={() => handleNavigation("/fun")}
                  style={
                    currentActive == "fun"
                      ? {
                          background: "#6b066b",
                          paddingTop: "16px",
                          paddingBottom: "16px"
                        }
                      : { paddingTop: "16px", paddingBottom: "16px" }
                  }
                  className={clsx(classes.title, classes.hovercolor)}
                >
                  <Typography
                    className={clsx(
                      classes.title,
                      classes.desktopmenu,
                      "hide",
                      "test"
                    )}
                    variant="p"
                    noWrap
                  >
                    Fun
                  </Typography>
                </div>

                <div
                  onClick={() => handleNavigation("/worldtweets")}
                  style={
                    currentActive == "worldtweet"
                      ? {
                          background: "#6b066b",
                          paddingTop: "16px",
                          paddingBottom: "16px"
                        }
                      : { paddingTop: "16px", paddingBottom: "16px" }
                  }
                  className={clsx(classes.title, classes.hovercolor)}
                >
                  <Typography
                    className={clsx(
                      classes.title,
                      classes.desktopmenu,
                      "hide",
                      "test"
                    )}
                    variant="p"
                    noWrap
                  >
                    Twitter
                  </Typography>
                </div>

                <div
                  onClick={() => handleNavigation("/cnnfeed")}
                  style={
                    currentActive == "cnn"
                      ? {
                          background: "#6b066b",
                          paddingTop: "16px",
                          paddingBottom: "16px"
                        }
                      : { paddingTop: "16px", paddingBottom: "16px" }
                  }
                  className={clsx(classes.title, classes.hovercolor)}
                >
                  <Typography
                    className={clsx(
                      classes.title,
                      classes.desktopmenu,
                      "hide",
                      "test"
                    )}
                    variant="p"
                    noWrap
                  >
                    CNN
                  </Typography>
                </div>

                <div
                  onClick={() => handleNavigation("/espnfeed")}
                  style={
                    currentActive == "espn"
                      ? {
                          background: "#6b066b",
                          paddingTop: "16px",
                          paddingBottom: "16px"
                        }
                      : { paddingTop: "16px", paddingBottom: "16px" }
                  }
                  className={clsx(classes.title, classes.hovercolor)}
                >
                  <Typography
                    className={clsx(
                      classes.title,
                      classes.desktopmenu,
                      "hide",
                      "test"
                    )}
                    variant="p"
                    noWrap
                  >
                    ESPN
                  </Typography>
                </div>

                <div
                  onClick={() => handleNavigation("/foxfeed")}
                  style={
                    currentActive == "fox"
                      ? {
                          background: "#6b066b",
                          paddingTop: "16px",
                          paddingBottom: "16px"
                        }
                      : { paddingTop: "16px", paddingBottom: "16px" }
                  }
                  className={clsx(classes.title, classes.hovercolor)}
                >
                  <Typography
                    className={clsx(
                      classes.title,
                      classes.desktopmenu,
                      "hide",
                      "test"
                    )}
                    variant="p"
                    noWrap
                  >
                    FOX
                  </Typography>
                </div>
                <div className={clsx(classes.search, classes.desktopmenu)}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>

                  <Input
                    onChange={e => {
                      setSearchText(e.target.value);
                      if (e.target.value != "" || e.target.value != " ") {
                        setShowSearchResults(true);
                      } else setShowSearchResults(false);
                    }}
                    ref={textInput}
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    inputProps={{ "aria-label": "Search" }}
                  />

                  {showsearchResults == true ? (
                    searchText[0] == "#" ? (
                      <div class={classes.searchresults}>
                        <SearchTags
                          goToHashtag={goToHashtag}
                          searchText={searchText}
                        />
                      </div>
                    ) : (
                      <div class={classes.searchresults}>
                        <SearchResults
                          goToProfile={handleGoToProfile}
                          searchText={searchText}
                        />
                      </div>
                    )
                  ) : null}
                </div>

                <div style={{ flex: 1 }} class={classes.mobilemenu}>
                  <div
                    onClick={() => handleNavigation("/")}
                    style={
                      currentActive == "home"
                        ? { borderBottom: "1px solid white" }
                        : null
                    }
                    className={clsx(classes.mtitle)}
                  >
                    <img
                      src={Homelogo}
                      style={{
                        height: "24px",
                        width: "24px",
                        marginBottom: "5px"
                      }}
                    />
                    <Typography
                      className={clsx(classes.mtitle, "hide", "test")}
                      variant="p"
                      noWrap
                    >
                      Home
                    </Typography>
                  </div>

                  <div
                    onClick={() => handleNavigation("/fun")}
                    style={
                      currentActive == "fun"
                        ? { borderBottom: "1px solid white" }
                        : null
                    }
                    className={clsx(classes.mtitle)}
                  >
                    <Typography
                      className={clsx(classes.mtitle, "hide", "test")}
                      variant="p"
                      noWrap
                    >
                      Fun
                    </Typography>
                  </div>

                  <div
                    onClick={() => handleNavigation("/worldtweets")}
                    style={
                      currentActive == "worldtweet"
                        ? { borderBottom: "1px solid white" }
                        : null
                    }
                    className={clsx(classes.mtitle)}
                  >
                    <Typography
                      className={clsx(classes.mtitle, "hide", "test")}
                      variant="p"
                      noWrap
                    >
                      Twitter
                    </Typography>
                  </div>

                  <div
                    onClick={() => handleNavigation("/cnnfeed")}
                    style={
                      currentActive == "cnn"
                        ? { borderBottom: "1px solid white" }
                        : null
                    }
                    className={clsx(classes.mtitle)}
                  >
                    <Typography
                      className={clsx(classes.mtitle, "hide", "test")}
                      variant="p"
                      noWrap
                    >
                      CNN
                    </Typography>
                  </div>

                  <div
                    onClick={() => handleNavigation("/espnfeed")}
                    style={
                      currentActive == "espn"
                        ? { borderBottom: "1px solid white" }
                        : null
                    }
                    className={clsx(classes.mtitle)}
                  >
                    <Typography
                      className={clsx(classes.mtitle, "hide", "test")}
                      variant="p"
                      noWrap
                    >
                      ESPN
                    </Typography>
                  </div>

                  <div
                    onClick={() => handleNavigation("/foxfeed")}
                    style={
                      currentActive == "fox"
                        ? { borderBottom: "1px solid white" }
                        : null
                    }
                    className={clsx(classes.mtitle)}
                  >
                    <Typography
                      className={clsx(classes.mtitle, "hide", "test")}
                      variant="p"
                      noWrap
                    >
                      FOX
                    </Typography>
                  </div>
                </div>
                <Avatar
                  onClick={handleProfileDropdownShow}
                  alt="Remy Sharp"
                  src={
                    cuser
                      ? `${STATIC_URL}${cuser.profileSet[0].profilePic}`
                      : Avatarimage
                  }
                  className={clsx(classes.avatar, classes.showpointer)}
                />

                {/*  {!cuser && (
                  <div>
                    <Button
                      onClick={() =>
                        client.writeData({
                          data: {
                            isLoggedIn: false,
                            tempuser: false,
                            authRoute: "Login",
                          },
                        })
                      }
                      style={{
                        background: "orange",
                        marginLeft: "8px",
                        marginRight: "8px",
                        color: "white",
                      }}
                      color="secondary"
                      variant="filled"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() =>
                        client.writeData({
                          data: { isLoggedIn: false, tempuser: false },
                        })
                      }
                      color="white"
                      style={{ color: "white", border: "1px solid white" }}
                      variant="outlined"
                    >
                      Register
                    </Button>
                  </div>
                )} */}
              </Toolbar>
            </AppBar>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              onClose={handleProfileDropdownClose}
              open={Boolean(anchorEl)}
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
            >
              {cuser && (
                <>
                  <MenuItem>
                    <Button
                      width={100}
                      onClick={() =>
                        handleNavigation(
                          `/profile/${props.currentUser.username}`
                        )
                      }
                      style={{
                        width: "100%",
                        background: "white",
                        color: "violet"
                      }}
                      color="violet"
                      variant="outlined"
                    >
                      Profile
                    </Button>
                  </MenuItem>

                  <MenuItem>
                    <Button
                      width={100}
                      onClick={() => {
                        localStorage.removeItem("authtoken");

                        Object.keys(client.cache.data.data).forEach(key => {
                          if (key != "ROOT_QUERY") {
                            client.cache.data.delete(key);
                          }
                        });

                        client.writeData({
                          data: {
                            isLoggedIn: false,
                            authRoute: "Login"
                          }
                        });
                      }}
                      color="violet"
                      style={{
                        background: "white",
                        width: "100%",
                        color: "violet"
                      }}
                      variant="outlined"
                    >
                      Logout
                    </Button>
                  </MenuItem>
                  {window.navigator.userAgent == "buzzrakerapp" ? (
                    <>
                      <MenuItem>
                        <Button
                          width={100}
                          onClick={() => {
                            handleProfileDropdownClose();
                            props.history.push("/pushnotification");
                          }}
                          style={{
                            background: "white",
                            width: "100%",
                            color: "violet"
                          }}
                          color="violet"
                          variant="outlined"
                        >
                          Push Notification
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button
                          width={100}
                          onClick={() => {
                            handleProfileDropdownClose();
                            props.history.push("/locationPreference");
                          }}
                          style={{
                            background: "white",
                            width: "100%",
                            color: "violet"
                          }}
                          color="violet"
                          variant="outlined"
                        >
                          Location Preference
                        </Button>
                      </MenuItem>
                    </>
                  ) : null}
                </>
              )}
              {!cuser && (
                <>
                  <MenuItem>
                    <Button
                      width={100}
                      onClick={() => {
                        let event = new CustomEvent(
                          "setTempToFalseFromRegisterorLogin"
                        );
                        document.dispatchEvent(event);

                        client.writeData({
                          data: {
                            isLoggedIn: false,
                            tempuser: false,
                            authRoute: "Login"
                          }
                        });
                      }}
                      color="violet"
                      style={{
                        background: "white",
                        width: "100%",
                        color: "violet"
                      }}
                      variant="outlined"
                    >
                      Login
                    </Button>
                  </MenuItem>

                  <MenuItem>
                    <Button
                      width={100}
                      onClick={() => {
                        let event = new CustomEvent(
                          "setTempToFalseFromRegisterorLogin"
                        );
                        document.dispatchEvent(event);

                        client.writeData({
                          data: { isLoggedIn: false, tempuser: false }
                        });
                      }}
                      color="violet"
                      style={{
                        background: "white",
                        width: "100%",
                        color: "violet"
                      }}
                      variant="outlined"
                    >
                      Register
                    </Button>
                  </MenuItem>
                  {window.navigator.userAgent == "buzzrakerapp" ? (
                    <>
                      <MenuItem>
                        <Button
                          width={100}
                          onClick={() => {
                            handleProfileDropdownClose();
                            props.history.push("/pushnotification");
                          }}
                          style={{
                            background: "white",
                            width: "100%",
                            color: "violet"
                          }}
                          color="violet"
                          variant="outlined"
                        >
                          Push Notification
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button
                          width={100}
                          onClick={() => {
                            handleProfileDropdownClose();
                            props.history.push("/locationPreference");
                          }}
                          style={{
                            background: "white",
                            width: "100%",
                            color: "violet"
                          }}
                          color="violet"
                          variant="outlined"
                        >
                          Location Preference
                        </Button>
                      </MenuItem>
                    </>
                  ) : null}
                </>
              )}
            </Menu>

            <Drawer
              drawer={draweropen}
              setDrawer={toggleDrawer}
              handleNavigation={handleNavigation}
            />
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
                    maxHeight: "300px",
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
          return (
            <div
              style={
                data.searchuser.length > 10
                  ? {
                      border: "1px solid #d3d4d5",
                      maxHeight: "300px",
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
        }
        return null;
      }}
    </Query>
  );
}

function Drawer(props) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  function handleListItemClick(event, index, path) {
    setSelectedIndex(index);
    handleNavigation(path);
  }
  let { handleNavigation } = props;
  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={props.setDrawer(false)}
      onKeyDown={props.setDrawer(false)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px"
        }}
      >
        <img src={SiteLogo} style={{ width: "60px", borderRadius: "50%" }} />
      </div>
      <Divider />

      <List>
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={event => handleListItemClick(event, 0, "/")}
        >
          <ListItemText primary={"Home"} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="Delete">
              <ArrowRight
                style={{
                  background: "orange",
                  color: "indigo",
                  borderRadius: "50%"
                }}
              />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={event => handleListItemClick(event, 1, "worldtweets")}
        >
          <ListItemText primary="Twitter" />

          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="Delete">
              <ArrowRight
                style={{
                  background: "orange",
                  color: "indigo",
                  borderRadius: "50%"
                }}
              />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={event => handleListItemClick(event, 2, "cnnfeed")}
        >
          <ListItemText primary="  CNN" />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="Delete">
              <ArrowRight
                style={{
                  background: "orange",
                  color: "indigo",
                  borderRadius: "50%"
                }}
              />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem
          button
          selected={selectedIndex === 3}
          onClick={event => handleListItemClick(event, 3, "espnfeed")}
        >
          <ListItemText primary="ESPN" />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="Delete">
              <ArrowRight
                style={{
                  background: "orange",
                  color: "indigo",
                  borderRadius: "50%"
                }}
              />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem
          button
          selected={selectedIndex === 4}
          onClick={event => handleListItemClick(event, 4, "/foxfeed")}
        >
          <ListItemText primary="FOX" />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="Delete">
              <ArrowRight
                style={{
                  background: "orange",
                  color: "indigo",
                  borderRadius: "50%"
                }}
              />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <SwipeableDrawer
        open={props.drawer}
        onClose={props.setDrawer(false)}
        onOpen={props.setDrawer(true)}
      >
        {sideList("left")}
      </SwipeableDrawer>
    </div>
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
