import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, Image, TextInput, TouchableOpacity, ScrollView

} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { connect } from 'react-redux';

import { ToastActionsCreators } from 'react-native-redux-toast';
import { bindActionCreators } from "redux";
import _ from "lodash";
import Regex from '../utilities/Regex';
import Background from '../components/common/BackgroundImg';
import * as UserActions from '../redux/modules/user';
import Constants from '../constants';



 class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',


      secureEntry: true,
      passwordEye: false,
      hasFocus:false

    }
  }


  signInSubmit() {

    // let { dispatch } = this.props.navigation;
    // let { email, password } = this.state;
    // //let { navigate } = this.props.navigation;

    // if (_.isEmpty(email.trim())) {
    //   //alert(enterEmail);
    //   dispatch(ToastActionsCreators.displayInfo('Please enter your email'))
    //   return;
    // }
    // if (!Regex.validateEmail(email.trim())) {
    //   //alert(enterValidEmail);
    //   dispatch(ToastActionsCreators.displayInfo('Enter a valid email'))
    //   return;
    // }

    // if (_.isEmpty(password.trim())) {
    //   dispatch(ToastActionsCreators.displayInfo('Please enter your password'))
    //   return;
    // }

    // if (!Regex.validatePassword(password)) {
    //   dispatch(ToastActionsCreators.displayInfo('Password should be minimum 6 characters and must contain at least  one special character, one numeric '))
    //   return;
    // }


    
    this.props.UserActions.signInFirebase({ ...this.state });

  }






  onSignUp() {
    const { params } = this.props.navigation.state;
    const item = params ? params.signup : false;
   // const item = this.props.navigation.getParam('signup', false);
    if(item){
       this.props.navigation.goBack();
    }else{
      this.props.navigation.navigate('signup',{
        signin: true,
       
      });
    }
  }
  onForgot() {
    this.props.navigation.navigate("forgotPassword")

  }

  _onBlur() {
    this.setState({hasFocus: false});
    }

  _onFocus() {
    this.setState({hasFocus: true});
    }

  _getULColor(hasFocus) {
  
    return (hasFocus === true) ? 'white' : 'gray';
  }




  render() {
    return (

      <Background style={styles.container} src={Constants.Images.user.loginbg}>
        <KeyboardAwareScrollView>


          <ScrollView keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'interactive'} keyboardShouldPersistTaps="always" >
            <View style={{ flex: 1, paddingHorizontal: 20, justifyContent: "center", }}>
              <Text style={styles.signUpTxt}> Sign In </Text>
              <Image source={Constants.Images.user.splashLogo} style={styles.imageStyle} resizeMode='contain'/>


              <TextInput
                style={styles.textInputStyle}
                autoFocus={false}
                onBlur={ () => this._onBlur() }
                onFocus={ () => this._onFocus() }
                placeholder='Email'
                keyboardType='email-address'
                placeholderTextColor={'gray'}
                underlineColorAndroid={this._getULColor(this.state.hasFocus)}
                onChangeText={(email) => this.setState({ email })}
              />
              <View >
              <TextInput
                style={[styles.textInputStyle, { marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3 }]}
                autoFocus={false}
                onBlur={ () => this._onBlur() }
                onFocus={ () => this._onFocus() }
                placeholder='Password'
                placeholderTextColor={'gray'}
                underlineColorAndroid={this._getULColor(this.state.hasFocus)}
                showPassword={false}
                onChangeText={(password) => this.setState({ password })}
                secureTextEntry={this.state.secureEntry}
              />

                {this.state.password != '' && <TouchableOpacity
              style={{ position: 'absolute', right: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5, bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1.5 }}
              onPress={() => this.setState({ secureEntry: !this.state.secureEntry, passwordEye: !this.state.passwordEye })}>
              <Image source={this.state.passwordEye ? Constants.Images.user.crossEye : Constants.Images.user.eye} style={[{ width: 20, height: 20 }]} style={styles.eye} resizeMode="contain" />
            </TouchableOpacity>}

              </View>
              <TouchableOpacity style={styles.forgotBtn}
                onPress={() => this.onForgot()}>
                <Text style={{ color: 'yellow', textAlign: 'right', padding: 5 }}> Forgot password ?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.signInSubmit()}

                style={styles.buttonStyle} >
                <Text style={{ color: Constants.Colors.Purple,fontWeight: '500' }}>Sign In</Text>
              </TouchableOpacity >
              <TouchableOpacity style={styles.signInbtn} onPress={() => this.onSignUp()}>
                <Text style={styles.bottomText}>New User?<Text style={{ color: 'yellow' }}> Sign Up Now
                </Text>
                </Text>
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
  signUpTxt: { padding: 10, alignSelf: 'center', fontSize: 20 },
  textInputStyle: {
    padding: 10,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6,
    color:'white'

  },
  passswordStyle:{
   //flex:1,
    //flexDirection: 'row',
    //alignSelf:'stretch'
    // justifyContent: 'center',
    // alignItems: 'center',


  },
  bottomText: {
    color: 'white',
    alignSelf: 'center',
    padding: 5,

  },
  imageStyle: {
    width: Constants.BaseStyle.DEVICE_WIDTH*70/100,
    height:Constants.BaseStyle.DEVICE_HEIGHT*18/100,
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT*10/100,
    alignSelf: 'center',
    

  },

  buttonStyle: {
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
    borderRadius: 20,
    backgroundColor: "white",
    padding: 12,
    width: "42%",
    alignSelf: 'center',
    justifyContent: "center", alignItems: 'center'
  },
  signInbtn: {
    width: '50%',
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 12,
    alignSelf: 'center'
  },
  forgotBtn: { width: '38%', alignSelf: 'flex-end' },
  eye: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6
  }
});

// const mapStateToProps = state => ({
//   modalstate: state.ModalHandleReducer,
//   deviceToken: state.user.deviceToken
// });

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(null, mapDispatchToProps)(SignIn);
