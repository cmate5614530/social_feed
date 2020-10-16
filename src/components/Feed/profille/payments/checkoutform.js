/* import React, { Component } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import Loading from '../../../Shared/loading'
import Error from '../../../Shared/Error'

class CheckoutForm extends Component {
  constructor (props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.state = {
      receipturl: '',
      showreceipt: false
    }
  }

  async submit (ev, makePayment) {
    let { token } = await this.props.stripe.createToken({
      userid: this.props.userid
    })

    const res = await makePayment({
      variables: { token: token.id, userid: this.props.userid }
    })
    this.setState({
      receipturl: res.data.makePayment.receipturl,
      showreceipt: true
    })
  }

  render () {
    return (
      <Mutation
        mutation={PAYMENT_MUTATION}
        refetchQueries={this.props.refetchQueries}
      >
        {(makePayment, { loading, error, called, client }) => {
          if (loading) return <Loading />
          if (error) return <Error error={error} />

          return (
            <Dialog
              open={this.props.paymentModalOpen}
              onClose={this.props.handlePaymentModalClose}
              scroll='paper'
              aria-labelledby='form-dialog-title'
            >
              <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
              <DialogContent dividers='paper'>
                {this.state.showreceipt ? (
                  <div>
                    <p>
                      {' '}
                      Your Payment is Successfull. Now You are verified user
                    </p>
                    <a href={this.state.receipturl} target='_blank'>
                      View Receipt
                    </a>
                  </div>
                ) : (
                  <div className='checkout'>
                    {error && <h5>{error.message}</h5>}
                    <p>You would be charged $1.49 for one time verification</p>
                    <CardElement {...createOptions()} />
                  </div>
                )}
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={this.props.handlePaymentModalClose}
                  color='primary'
                >
                  {this.state.showreceipt ? 'Close' : 'Cancel'}
                </Button>
                <Button
                  onClick={e => this.submit(e, makePayment)}
                  color='primary'
                >
                  Subscribe
                </Button>
              </DialogActions>
            </Dialog>
          )
        }}
      </Mutation>
    )
  }
}

export default injectStripe(CheckoutForm)

const PAYMENT_MUTATION = gql`
  mutation($token: String!, $userid: Int!) {
    makePayment(token: $token, userid: $userid) {
      status
      receipturl
    }
  }
`

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'Open Sans, sans-serif',
        letterSpacing: '0.025em',
        border: '1px solid #ddd',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#c23d4b'
      }
    }
  }
}
 */
