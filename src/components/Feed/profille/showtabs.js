import React from "react";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import SwipeableViews from "react-swipeable-views";
import Usertweets from "./usertweets";
import Details from "./details";
import TweethandlesProfile from "./tweethandle/index";
import Followers from "./Followers/followerstab";

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8"
  },
  indicator: {
    backgroundColor: "#1890ff"
  }
})(Tabs);

function TabContainer({ children, dir }) {
  return (
    <Typography
      style={{ padding: "16px", paddingLeft: 0, paddingRight: 0 }}
      component="div"
      dir={dir}
    >
      {children}
    </Typography>
  );
}

const AntTab = withStyles(theme => ({
  root: {
    textTransform: "none",

    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),

    fontSize: "16px",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium
    },
    "&:focus": {
      color: "#40a9ff"
    }
  },
  selected: {}
}))(props => <Tab disableRipple {...props} />);

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: "none",
    color: "#fff",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1
    }
  }
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  typography: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  demo1: {
    backgroundColor: theme.palette.background.paper
  },
  demo2: {
    backgroundColor: "#2e1534"
  }
}));

export default function CustomizedTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        <AntTabs
          value={value}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
          onChange={handleChange}
        >
          <AntTab label="Tweets" />
          <AntTab label="Friends" />
          <AntTab label="Tweethandles" />
          <AntTab label="Details" />
        </AntTabs>
      </div>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabContainer dir={theme.direction}>
          <Usertweets
            profile={props.profile}
            username={props.username}
            userid={props.userid}
          />
        </TabContainer>
        <TabContainer dir={theme.direction}>
          <Followers username={props.username} userid={props.userid} />
        </TabContainer>
        <TabContainer dir={theme.direction}>
          <TweethandlesProfile
            username={props.username}
            userid={props.userid}
          />
        </TabContainer>
        <TabContainer dir={theme.direction}>
          <Details
            email={props.email}
            refetchQueries={props.refetchQueries}
            profile={props.profile}
          />
        </TabContainer>
      </SwipeableViews>
    </div>
  );
}
