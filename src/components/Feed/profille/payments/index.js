/* import React, { Component } from 'react'
import { Elements, StripeProvider } from 'react-stripe-elements'
import CheckoutForm from './checkoutform'
import { STRIPE_API_KEY } from '../../../../config'

class App extends Component {
  render () {
    return (
      <StripeProvider apiKey={STRIPE_API_KEY}>
        <div className='example'>
          <Elements>
            <CheckoutForm
              refetchQueries={this.props.refetchQueries}
              handlePaymentModalClose={this.props.handlePaymentModalClose}
              paymentModalOpen={this.props.paymentModalOpen}
              submit={this.submmit}
              userid={this.props.userid}
            />
          </Elements>
        </div>
      </StripeProvider>
    )
  }
}

export default App
 */
