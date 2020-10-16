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

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [empty, setEmpty] = React.useState(false);
  const cuser = React.useContext(Context);
  const [perror, setPError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [cancel, setCancel] = React.useState(false);

  return (
    <div>
      <Mutation
        mutation={SAVE_PAYPAL_MUTATION}
        variables={{ amount, email, name }}
      >
        {(savePayment, { loading, error, called, client }) => {
          let message;
          if (error) {
            message = error.message.replace("GraphQL Error:", "").trim();
            message = message.replace("GraphQL error:", "").trim();
          }

          return (
            <Dialog
              open
              onClose={() => props.handleClose(false)}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Make Donation</DialogTitle>
              <DialogContent>
                {loading && (
                  <DialogContentText>
                    <Loading />
                  </DialogContentText>
                )}

                {error && (
                  <DialogContentText>
                    Payment is successfull, but error occured saving data to
                    database
                    <br />
                    {message}
                  </DialogContentText>
                )}
                {perror && (
                  <DialogContentText>
                    An Error Occured, please close this window and try again
                  </DialogContentText>
                )}
                {success && !error && (
                  <DialogContentText>
                    Thank You, Your payment is successful, this dialog will
                    automatically close in few seconds
                  </DialogContentText>
                )}

                {!perror && !success && !cancel && !error ? (
                  <div>
                    {!cuser && (
                      <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        onChange={e => {
                          setEmail(e.target.value);
                        }}
                      />
                    )}
                    {!cuser && (
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        onChange={e => {
                          setName(e.target.value);
                        }}
                      />
                    )}
                    <TextField
                      autoFocus
                      margin="dense"
                      id="amount"
                      label="Amount"
                      type="number"
                      placeholder="000.00"
                      fullWidth
                      onChange={e => {
                        setAmount(e.target.value);
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        )
                      }}
                    />
                  </div>
                ) : null}
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => props.handleClose(false)}
                  color="primary"
                >
                  Cancel
                </Button>
                {((name != "" && email != "" && amount != "") ||
                  (cuser && amount != "")) && (
                  <PaypalButton
                    name={cuser ? cuser.username : name}
                    email={cuser ? cuser.email : email}
                    amount={amount}
                    onError={err => {
                      setPError(true);
                    }}
                    onSuccess={async payment => {
                      setSuccess(true);
                      const res = await savePayment();
                      setTimeout(() => {
                        props.handleClose();
                      }, 3000);
                    }}
                    onCancel={data => console.log(data)}
                  />
                )}
              </DialogActions>
            </Dialog>
          );
        }}
      </Mutation>
    </div>
  );
}

const SAVE_PAYPAL_MUTATION = gql`
  mutation($amount: String!, $email: String, $name: String) {
    savePayment(amount: $amount, email: $email, name: $name) {
      status
    }
  }
`;
