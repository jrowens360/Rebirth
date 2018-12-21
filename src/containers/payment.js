import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  FlatList
} from 'react-native';
import Constants from '../constants';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import NavigationBar from 'react-native-navbar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Icon from 'react-native-vector-icons/FontAwesome';
import Background from '../components/common/BackgroundImg';
import * as UserActions from '../redux/modules/user';
class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardForm: false,
      cards: [
        {
          "card": "672357852850",
          "image": 'http://lorempixel.com/100/100/'
        },
        {
          "card": "672357852850",
          "image": 'http://lorempixel.com/100/100/'
        },


      ]

    };
  }


  componentWillMount() {



  }

  addCardForm() {
    // alert("ggggg");
    this.setState({

      cardForm: !this.state.cardForm
    });


  }

  complete() {
    this.props.navigation.navigate("MeasurementDetail")

  }


  render() {

    // const titleConfig = {
    //   title: 'Payment',
    //   tintColor: 'white'

    // };
    return (
      <Background style={styles.container} src={Constants.Images.user.dashboardbg}  >
        <KeyboardAwareScrollView>

          <ScrollView keyboardDismissMode='on-drag'>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5, alignItems: 'center' }}>
              <TouchableOpacity style={{ paddingHorizontal: 6 }} onPress={() => this.props.navigation.goBack()}>
                <Icon name="angle-left" size={40} color='white' />
              </TouchableOpacity>
              <Text style={styles.headerTxt}> Payment </Text>
              <View></View>
            </View>
            <View style={styles.mainContainer}>
              <View style={{
                height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 13, paddingHorizontal: 15, fontWeight: '500',
                borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Constants.Colors.darkYellow, alignItems: 'center'
              }}>
                <Text style={{ color: 'black' }}> Payment Amount
                </Text>
                <Text style={{ color: 'black', textAlign: 'right', fontSize: 50 }}>

                  <Text style={{ fontSize: 25 }} > {'\u0024'} </Text>
                  .99
                </Text>

              </View>

              <Text style={{ color: 'black', fontSize: 18, marginTop: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3, fontWeight: '500' }}> Saved Cards </Text>

              {/* <FlatList
                style={styles.flatlist}
                data={this.state.cards}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) =>
                  <View style={styles.flatview}>
                    <Image source={{ uri: item.image }} style={{ height: 35, width: 40 }}></Image>
                    <Text style={{ paddingLeft: 10 }}>{item.card}</Text>
                  </View>
                }
                keyExtractor={item => item.email}
              /> */}

              {this.state.cardForm ? this.cardFormView() : null}


              <TouchableOpacity style={styles.buttonStyle} onPress={() => this.complete()}>
                <Text style={styles.paymenText}>Complete payment</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.addCardForm()}>
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

})


const mapStateToProps = state => ({
  modalstate: state.ModalHandleReducer,
  deviceToken: state.user.deviceToken
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(null, mapDispatchToProps)(Payment);
