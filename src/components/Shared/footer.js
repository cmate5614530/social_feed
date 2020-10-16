import React from "react";
import { withRouter } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import PaypalButton from "../Feed/profille/payments/paypalbutton";
import clsx from "clsx";
import "./footer.css";
import PaypalDialogBox from "../Feed/profille/payments/paypaldialogbox";

function Footer(props) {
  const [open, setOpen] = React.useState(false);

  let classes = props.classes;

  return (
    <>
      <div>
        <div
          style={{
            position: "fixed",
            flexDirection: "row",
            display: "flex",
            justifyContent: "flex-end",
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            left: 0,
            right: 0
          }}
        >
          {/*
          <div
            className={clsx('footerlink', classes.equalwidth)}
            style={{
              background: 'indigo',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <a onClick={() => setOpen(true)}>Donate Paypal</a>
          </div>
          */}
          <div className={clsx("footerlink", classes.equalwidth)}>
            <a onClick={() => props.history.push("privacy-policy")}>
              Privacy <br />
              Policy
            </a>
          </div>
          <div className={clsx("footerlink", classes.equalwidth)}>
            <a onClick={() => props.history.push("terms-and-conditions")}>
              Terms and <br />
              Conditions
            </a>
          </div>
        </div>
      </div>
      {open && <PaypalDialogBox handleClose={setOpen} />}
    </>
  );
}

const styles = theme => ({
  bordered: {
    border: "1px solid black"
  },
  equalwidth: {
    [theme.breakpoints.down("md")]: {
      flex: 1
    }
  },
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
  container: {
    marginTop: "5.5em"
  },
  paypal: {
    marginTop: theme.spacing.unit * 1
  },
  termscondition: {
    padding: "16px",
    "&:hover": {
      cursor: "pointer"
    }
  }
});

export default withRouter(withStyles(styles)(Footer));
