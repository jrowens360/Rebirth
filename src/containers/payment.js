import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList, Modal
} from 'react-native';
import Constants from '../constants';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Icon from 'react-native-vector-icons/FontAwesome';
import Background from '../components/common/BackgroundImg';
import * as UserActions from '../redux/modules/user';
import FlateListView from './flatlistview';
import stripe from 'tipsi-stripe';
import { ToastActionsCreators } from 'react-native-redux-toast';
import _ from "lodash";
import { startLoading, stopLoading, showToast, hideToast } from '../redux/modules/app';
import {
  MaterialDialog,
 } from 'react-native-material-dialog';
stripe.setOptions({
  publishableKey: 'pk_test_EM9PMIvqS63oMeyj18XyZXJL',
});
const FIREBASE_FUNCTION = 'https://us-central1-rebirth-89283.cloudfunctions.net/charge/';




class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaymentPending: false,
      modalVisible: false,
      checked: true,
      cardList: props.cardList != null || typeof (props.cardList.cardList) != "undefined" ? props.cardList.cardList : [],
      cardDetail: '',
      cvv: '',
      gender: '',
      height: '',
      frontImg: props.frontImage,
      sideImg: props.sideImage,
      apiKey: 'APIKey 35ce6ef2466f0330482bc753ea456777715011c3',
      frontKey: props.frontKey,
      feet: '',
      inch: '',
      cvvmodal:false


    };
  }
  componentWillMount() {
    this.props.UserActions.cardsFromFirebase();

}
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
   // console.log("component did mount", this.props);
    this.setState({

      cardList: this.props.cardList != null || typeof (this.props.cardList.cardList) != "undefined" ? this.props.cardList.cardList : []


    });
  }
  componentWillReceiveProps(props) {

   // console.log(this.props);
    this.setState({

      cardList: this.props.cardList != null || typeof (this.props.cardList.cardList) != "undefined" ? props.cardList.cardList : []


    });


  }

  async  doPayment(toke, amount, currency) {
    const paymentParams = {
      token: toke,
      charge: { amount, currency }
    };
    //  console.log("params", JSON.stringify(paymentParams));
    const res = await fetch(FIREBASE_FUNCTION, {
      method: 'POST',
      body: JSON.stringify(paymentParams)

    });

    const data = await res.json();

    data.body = JSON.parse(data.body);

    return data;

  }
  paidApis() {


    this.props.UserActions.ImageParameter({ ...this.state }, (key) => {
      this.setState({ frontKey: key }, () => {

        this.props.UserActions.ImageSideParameter({ ...this.state }, () => {

          this.props.UserActions.CompleteParameter({ ...this.state }, () => {

            this.props.UserActions.addMeasurementFirebase(this.props.maesureData);

          })
        });

      });
    });
  }


  requestPayment = async () => {

    let { dispatch } = this.props.navigation;
    const { params } = this.props.navigation.state;
    this.setState({
      gender: params ? params.userGender : '',
      height: params ? params.userHeight : ''
    });
    dispatch(startLoading());
    this.setState({ cvvmodal: false });
    // console.log(this.state.cardDetail);
    let { cardDetail, cvv } = this.state;


    const cardParams = {
      // mandatory
      number: cardDetail.number,
      expMonth: parseInt(cardDetail.expiry.slice(0, 2)),
      expYear: parseInt(cardDetail.expiry.slice(3, 5)),
      cvc: cvv,
      // optional
      name: cardDetail.name,
      currency: 'usd',
      addressZip: cardDetail.postalCode,
    }

    //console.log('params created', JSON.stringify(cardParams));

    return stripe
      .createTokenWithCard(cardParams)
      .then(stripeTokenInfo => {

       // console.log('Token created', { stripeTokenInfo });
        return this.doPayment(stripeTokenInfo, 100, 'usd');
      })
      .then((result) => {

        // console.log(result);
        if (result.statusCode == 200) {
          this.paidApis()

        } else {
          dispatch(ToastActionsCreators.displayInfo( "The transaction was declined. Please use a different card or contact your banking institution."))
          dispatch(stopLoading());

        }
        //call paid api here

      })
      .catch(error => {
        dispatch(stopLoading());
        console.log(error);
      })
      .finally(() => {
        // dispatch(stopLoading());
        // this.setState({ isPaymentPending: false });
      });
  };



  complete() {
    let { dispatch } = this.props.navigation;
    this.setState({ cvv: '' });
    //  console.log("size of list", this.props)
    if (typeof (this.state.cardList) != "undefined" && this.state.cardList.length != 0) {

      this.setState({
        cardDetail: this.state.cardList[this.props.selectIndex]
      }, () => {

        // console.log("my card detail", this.state.cardDetail)
      })
this.setState({cvvmodal:true})
     // this.setModalVisible()
    } else {
      dispatch(ToastActionsCreators.displayInfo('Please add your card'))
    }



  }
  submit() {
    let { dispatch } = this.props.navigation;
    let { cvv } = this.state;
    if (_.isEmpty(cvv.trim())) {

      dispatch(ToastActionsCreators.displayInfo('For Security Purposes, Please Confirm CVV'))
      return;
    }

    // call payment gateway
    this.requestPayment();
  }
  onselectPress = (index) => {
    let { dispatch } = this.props.navigation;
    dispatch({ type: "SELECT_INDEX", index })
    //console.log("my index", index)
    // this.setState({activeIndex:index},()=>{ console.log("active index",this.state.activeIndex)});

  }


  render() {
    return (
      <Background style={styles.container} src={Constants.Images.user.dashboardbg}  >
        <KeyboardAwareScrollView>

          <ScrollView keyboardDismissMode='on-drag'>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5, alignItems: 'center' }}>
              <TouchableOpacity style={{ paddingHorizontal: 6 }} onPress={() => this.props.navigation.goBack()}>
                <Icon name="angle-left" size={40} color='white' />
              </TouchableOpacity>
              <Text style={styles.headerTxt}> Payment </Text>
              <View style={{width:30}}></View>
            </View>
            <View style={styles.mainContainer}>
              <View style={{
                height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 13, paddingHorizontal: 15, fontWeight: '500',
                borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Constants.Colors.darkYellow, alignItems: 'center'
              }}>
                <Text style={{ color: 'black' }}> Payment Amount
                </Text>
                <Text style={{ color: 'black', textAlign: 'right', fontSize: 50 }}>
                 {'\u0024'} 0.99</Text>

              </View>

              <Text style={{ color: 'black', fontSize: 18, marginTop: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3, fontWeight: '500' }}> Saved Cards </Text>
              {/* <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  alert('Modal has been closed.');
                }}>
                <View style={{
                  flex: 1,
                  // backgroundColor:Constants.Colors.Purple,
                  // alignItems: 'center',
                  marginBottom: 20,
                  justifyContent: 'center'
                }}>
                  <View style={{ backgroundColor: Constants.Colors.yellow, borderRadius: 10, padding: 10, marginHorizontal: 20, paddingTop: 20 }} >

                    <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}>For Security Purposes, Please Confirm CVV</Text>
                    <View style={{ justifyContent: 'center' }}>
                      <TextInput
                        maxLength={3}
                        autoFocus={false}
                        autoCorrect={false}
                        value={this.state.cvv}
                        style={styles.textInputStyle}
                        placeholder='CVV'
                        placeholderTextColor={'gray'}
                        keyboardType='phone-pad'
                        onChangeText={(cvv) => this.setState({ cvv })}

                      />
                    </View>
                    <View style={{ backgroundColor: Constants.Colors.Purple, height: 2, width: '100%', marginTop: 5 }}></View>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        style={{ flex: 1, padding: 5 }}
                        onPress={() => {
                          this.setState({ modalVisible: false });
                        }}>
                        <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}> Cancel</Text>
                      </TouchableOpacity>
                      <View style={{ backgroundColor: Constants.Colors.Purple, height: '100%', width: 2 }}></View>
                      <TouchableOpacity
                        style={{ flex: 1, padding: 5 }}
                        onPress={() => {
                          this.submit();

                        }}>
                        <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}> Submit</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal> */}
                   <MaterialDialog
          visible={this.state.cvvmodal}
         // style={backgroundColor = Constants.Colors.Purple}
        // title={'For Security Purposes, Please Confirm CVV'}
        //   // titleColor="black"
        // backgroundColor = {Constants.Colors.Purple}
          addPadding ={false}
          colorAccent= 'white'
          backgroundColor= {Constants.Colors.Purple}
          okLabel="SUBMIT"
          onOk={() => {
            this.submit();
          }}
        
          onCancel={() => {
            this.setState({ cvvmodal: false });
          }}
        >
             <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold',paddingTop:10,paddingHorizontal:10 }}>For Security Purposes, Please Confirm CVV</Text>
                    <View style={{ justifyContent: 'center' }}>
                      <TextInput
                        maxLength={4}
                        autoFocus={true}
                        autoCorrect={false}
                        value={this.state.cvv}
                        style={styles.textInputStyle}
                        placeholder='CVV'
                        placeholderTextColor='white'
                        keyboardType='phone-pad'
                        onChangeText={(cvv) => this.setState({ cvv })}
                        underlineColorAndroid='white'

                      />
                    </View>
                    <View style={{ backgroundColor:'white',height:1,paddingHorizontal:2 }}></View>
        </MaterialDialog>

              <FlatList
                style={styles.flatlist}
                data={this.state.cardList}
                showsVerticalScrollIndicator={false}
                renderItem={({ index, item }) =>
                  <FlateListView item={item} index={index} onselectPress={this.onselectPress}></FlateListView>
                }
                keyExtractor={item => item.email}
              />

              <TouchableOpacity style={styles.buttonStyle} onPress={() => this.complete()}>
                <Text style={styles.paymenText}>Submit Payment</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("AddCard", {
                data: this.state.cardList == null ? [] : this.state.cardList,
              })}>
                <Text style={{ textAlign: 'center', fontSize: 18, padding: 10, color: Constants.Colors.Purple }}>Add  Card +</Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </Background>
    );
  }
  cardFormView() {
    return (
      <View>
        <TextInput
          style={styles.textInputStyle}
          placeholder='Card Number'
          placeholderTextColor={Constants.Colors.Blue}
          underlineColorAndroid={Constants.Colors.Black}
        />
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={{ flex: 1, padding: 10 }}
            placeholder='Exp Date'
            placeholderTextColor={Constants.Colors.Blue}
            underlineColorAndroid={Constants.Colors.Black}
          />
          <TextInput
            style={{ flex: 1, padding: 10, marginLeft: 10 }}
            placeholder='CVV'
            placeholderTextColor={Constants.Colors.Blue}
            underlineColorAndroid={Constants.Colors.Black}
          />
        </View>
        <TextInput
          style={styles.textInputStyle}
          placeholder='Name of Card'
          placeholderTextColor={Constants.Colors.Blue}
          underlineColorAndroid={Constants.Colors.Black}
        />


      </View>

    )
  }


}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,

  },
  navBar: {
    backgroundColor: "black",
  },
  imageStyle: {
    width: Constants.BaseStyle.DEVICE_WIDTH * 30 / 2,
    height: Constants.BaseStyle.DEVICE_WIDTH * 30 / 2,
  },
  paymenText: {
    color: 'white'
  },
  flatlist: {
    flexGrow: 0
  },
  flatview: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center'
  },
  mainContainer: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 80,
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1,
    backgroundColor: Constants.Colors.White,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1,
    borderRadius: 10

  },


  buttonStyle: {
    color: 'white',
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 20,
    textAlign: 'center',
    backgroundColor: Constants.Colors.Purple,
    paddingVertical: 12,
    paddingHorizontal: 18,
    // width: "45%",
    justifyContent: "center", alignItems: 'center'
  },
  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  },
  headerTxt: { padding: 10, alignSelf: 'center', fontSize: 20, color: 'white' },
  textInputStyle: {

    color:'white',
    padding: 10,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1,

  },

})


const mapStateToProps = state => ({
  cardList: state.user.cardList == null ? [] : state.user.cardList,
  selectIndex: state.user.selectIndex,
  frontImage: state.user.frontImage,
  sideImage: state.user.sideImage,
  frontKey: state.user.frontKey,
  maesureData: state.user.bodyParameters,


});


const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
