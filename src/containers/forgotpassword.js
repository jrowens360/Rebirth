import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, Image, TextInput, TouchableOpacity, ScrollView

} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { connect } from 'react-redux';
import _ from "lodash";
import Regex from '../utilities/Regex';
import { bindActionCreators } from "redux";
import * as UserActions from '../redux/modules/user';
import Background from '../components/common/BackgroundImg';
import Icon from 'react-native-vector-icons/FontAwesome';


import Constants from '../constants';


class ForgotPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      hasFocus: false
    }
  }


  forgotSubmit() {

    let { dispatch } = this.props.navigation;
    let { email } = this.state;
    if (_.isEmpty(email.trim())) {

      dispatch(ToastActionsCreators.displayInfo('Please enter your email'))
      return;
    }
    if (!Regex.validateEmail(email.trim())) {

      dispatch(ToastActionsCreators.displayInfo('Enter a valid email'))
      return;
    }
    this.props.UserActions.forgotPasswordFirebase({ ...this.state });


  }

  _onBlur() {
    this.setState({ hasFocus: false });
  }

  _onFocus() {
    this.setState({ hasFocus: true });
  }

  _getULColor(hasFocus) {

    return (hasFocus === true) ? 'white' : 'gray';
  }

  render() {
    return (

      <Background style={styles.container} src={Constants.Images.user.resetbg}>
        <KeyboardAwareScrollView>

          <ScrollView keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'interactive'} keyboardShouldPersistTaps="always" >
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5, alignItems: 'center' }}>
              <TouchableOpacity style={{ paddingHorizontal: 6 }} onPress={() => this.props.navigation.goBack()}>
                <Icon name="angle-left" size={40} color='white' />
              </TouchableOpacity>
              <Text style={styles.forgotTxt}> Forgot Password </Text>
              <View style={{width:30}}></View>
            </View>
            <View style={{ flex: 1, paddingHorizontal: 20, justifyContent: "center", }}>
              <Image source={Constants.Images.user.splashLogo} style={styles.imageStyle} />
              <TextInput
                autoFocus={false}
                onBlur={() => this._onBlur()}
                onFocus={() => this._onFocus()}
                style={styles.textInputStyle}
                placeholder='Email'
                keyboardType='email-address'
                placeholderTextColor={'gray'}
               // underlineColorAndroid={this._getULColor(this.state.hasFocus)}
                onChangeText={(email) => this.setState({ email })}
              />
              <TouchableOpacity onPress={() => this.forgotSubmit()}
                style={styles.buttonStyle} >
                <Text style={{ color: Constants.Colors.Purple }}>Submit</Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </Background>



    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',


  },
  textInputStyle: {
    padding: 10,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6,
    color: 'white',

    borderBottomColor:'gray',
    borderBottomWidth:1

  },
  imageStyle: {
    width: Constants.BaseStyle.DEVICE_WIDTH * 70 / 100,
    height: Constants.BaseStyle.DEVICE_HEIGHT * 21 / 100,
    alignSelf: 'center',
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,


  },

  buttonStyle: {
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    borderRadius: 20,
    backgroundColor: "white",
    padding: 12,
    width: "40%",
    alignSelf: 'center',
    justifyContent: "center", alignItems: 'center'
  },
  forgotTxt: { padding: 10, alignSelf: 'center', fontSize: 20, color: 'white' },

});

// const mapStateToProps = state => ({
//   modalstate: state.ModalHandleReducer,
//   deviceToken: state.user.deviceToken
// });

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(null, mapDispatchToProps)(ForgotPassword);
