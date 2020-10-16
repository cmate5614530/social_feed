import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Context } from "../../../usercontext";
import PaypalButton from "./paypalbutton";
import { Mutation } from "react-apollo";
import Loading from "../../../Shared/loading";
import { gql } from "apollo-boost";
import InputAdornment from "@material-ui/core/InputAdornment";
import ProfilePaypalDialogBox from "./profilepaypaldialogbox";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [cerror, setCerror] = React.useState(false);
  const cuser = React.useContext(Context);

  return (
    <div>
      <Mutation refetchQueries={props.refetchQuery} mutation={PAYMENT_MUTATION}>
        {(makePayment, { loading, error, called, client }) => {
          let message;
          if (error) {
            message = error.message.replace("GraphQL Error:", "").trim();
            message = message.replace("GraphQL error:", "").trim();
            setCerror(true);
          }

          return (
            <>
              <PaypalButton
                name={cuser ? cuser.username : "Temp"}
                email={cuser ? cuser.email : "Temp Email"}
                amount={1.49}
                onError={err => {
                  setOpen(true);
                  setCerror(true);
                }}
                onSuccess={async payment => {
                  setOpen(true);
                  const res = await makePayment();
                }}
                onCancel={data => console.log(data)}
              />
              {open && (
                <ProfilePaypalDialogBox
                  title={cerror ? "An Error Occured" : "Verified"}
                  handleClose={setOpen}
                  text={
                    cerror
                      ? "Your profile was not verified. Please try again after sometime"
                      : "Your profile has been verified succesfully"
                  }
                />
              )}
            </>
          );
        }}
      </Mutation>
    </div>
  );
}

const PAYMENT_MUTATION = gql`
  mutation {
    makePayment {
      status
    }
  }
`;
