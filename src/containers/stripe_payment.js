import React, { Component } from 'react';
import { View, Button } from 'react-native';
import stripe from 'tipsi-stripe';
import * as UserActions from '../redux/modules/user';

stripe.setOptions({
  publishableKey: 'pk_test_EM9PMIvqS63oMeyj18XyZXJL',
});
const  FIREBASE_FUNCTION='https://us-central1-reduxdemo-6cd19.cloudfunctions.net/charge';
export default class PaymentStripe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPaymentPending:false
         
        };
    }


  

  async  doPayment(toke, amount,currency) {
    const params = {
      token: toke,
      charge:{ amount,currency }
    };
console.log(JSON.stringify(params));
             const res = await fetch(FIREBASE_FUNCTION, {
               
                 method: 'POST',
                //  headers: {
                //   Accept: "application/json"},
                 body: JSON.stringify(params)
 
             });
 
             const data = await res.json();
 
             data.body = JSON.parse(data.body);
 
             return data;
 
         }
 
 




  requestPayment = () => {
    this.setState({ isPaymentPending: true });
    return stripe
      .paymentRequestWithCardForm()
      .then(stripeTokenInfo => {
         
        console.log('Token created', { stripeTokenInfo });
        return this.doPayment(stripeTokenInfo,100,'usd');
      })
      .then((result) => {
        console.log('Payment succeeded!');
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        this.setState({ isPaymentPending: false });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Make a payment"
          onPress={this.requestPayment}
          disabled={this.state.isPaymentPending}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};