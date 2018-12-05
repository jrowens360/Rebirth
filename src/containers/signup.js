
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, Image, TextInput, TouchableOpacity, ScrollView

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import moment from "moment";
import { ToastActionsCreators } from 'react-native-redux-toast';
import { bindActionCreators } from "redux";
import Constants from '../constants';
import _ from "lodash";
import Regex from '../utilities/Regex';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import DatePicker from 'react-native-datepicker'
import Background from '../components/common/BackgroundImg';
var firebase = require("firebase");
import * as UserActions from '../redux/modules/user';
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from 'react-native-fetch-blob'


const currentDate = moment().add(1, 'days').format('YYYY-MM-DD');

 class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      height: '',
      weight: '',
      dob: '',
      confirmPassword: '',

      secureEntry: true,
      passwordEye: false,
      hasFocus:false,
      avatarSource:'',
     
      imageUrl:''
    }
  }

  onSelect = (picked) => {
   // alert("come here"+picked);

    if (picked === 'gallery') {
        ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        enableRotationGesture: true
      }).then(image => {
      
        let source = { uri: image.path, type: image.mime };
      
      //  console.log(JSON.stringify(image))
        this.setState({
          avatarSource: source
        
        });
        
        this.getSelectedImages();
       
      }).catch(e => console.log(e));

    } else {
      ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
        enableRotationGesture: true
      }).then(image => {
     
        let source = { uri: image.path, type: image.mime };
       
        this.setState({
          avatarSource: source
        
        });
        this.getSelectedImages();
      }).catch(e => console.log(e)

        );

    }
  }

  getSelectedImages = () => {
    
    const image = this.state.avatarSource.uri
 
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob
        let user =firebase.auth().currentUser
   
    let uploadBlob = null
    const imageRef = firebase.storage().ref('images').child(Math.floor(Date.now())+'.jpg')
    console.log("firbase"+imageRef);
    let mime = 'image/jpg'
    fs.readFile(image, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
    })
    .then((blob) => {
        uploadBlob = blob
        console.log("image upload "+JSON.stringify(uploadBlob))
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        console.log("image download "+imageRef.getDownloadURL())
        uploadBlob.close()
      
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        this.setState({imageUrl:url})
        // URL of the image uploaded on Firebase storage
        console.log("url in image"+url);
     
        
      })
      .catch((error) => {
        console.log("error in image"+JSON.stringify(error));
 
      })  
 
  }




  onSignIn() {

    const { params } = this.props.navigation.state;
    const item = params ? params.signin : false;
    if(item){
      this.props.navigation.goBack();
    }else{
      this.props.navigation.navigate("SignIn",{
        signup: true,  
      })
    }

  }


   signUpSubmit() {

   
    // console.log(firebase);

    // let { dispatch } = this.props.navigation;
    //  let { name, email, phone, password, height, weight, confirmPassword, dob } = this.state;
    // //let { navigate } = this.props.navigation;
    // if (_.isEmpty(name.trim())) {

    //   dispatch(ToastActionsCreators.displayInfo('Please enter your name'))
    //   return;
    // }
    // if (_.isEmpty(phone.trim())) {
    //   //alert(enterMobile);
    //   dispatch(ToastActionsCreators.displayInfo('Please enter your phone number'))
    //   return;
    // }
    // if (!Regex.validateMobile(phone.trim())) {
    //   //alert(enterValidMobile);
    //   dispatch(ToastActionsCreators.displayInfo('Please enter a valid phone number'))
    //   return;
    // }



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

    // if (_.isEmpty(height.trim())) {
    //   //alert(enterEmail);
    //   dispatch(ToastActionsCreators.displayInfo('Please enter your height'))
    //   return;
    // }

    // if (_.isEmpty(weight.trim())) {

    //   dispatch(ToastActionsCreators.displayInfo('Please enter your width'))
    //   return;
    // }

    // if (_.isEmpty(dob.trim())) {
    //   dispatch(ToastActionsCreators.displayInfo('Please enter your Date of Birth'))
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

    // if (_.isEmpty(confirmPassword.trim())) {
    //   dispatch(ToastActionsCreators.displayInfo('Please enter your  confirm password'))
    //   return;
    // }

    // if (!Regex.validatePassword(confirmPassword)) {
    //   dispatch(ToastActionsCreators.displayInfo('Password should be minimum 6 characters and must contain at least  one special character, one numeric '))
    //   return;
    // }

    // if (password != confirmPassword) {
    //   dispatch(ToastActionsCreators.displayInfo('Please match password and confirm password'))
    //   return;

    // }
 

     this.props.UserActions.signUpFirebase({ ...this.state });
    // this.props.UserActions.writeUserData({ ...this.state });
    
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
      <Background style={{ flex: 1 }} src={Constants.Images.user.loginbg}  >
        <KeyboardAwareScrollView>

          <ScrollView keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'interactive'} keyboardShouldPersistTaps="always" >

            <Text style={styles.signUpTxt}> Sign Up </Text>

            <View style={styles.container}>
              <View style={styles.profileRow}>
                <Image source={this.state.avatarSource} style={styles.imageStyle}  />

                <View>

                  <Text style={[styles.textStyle]}>
                    Change Photo</Text>
                  <View style={{ flexDirection: "row", marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6, marginTop: 8 }}>
                    
                    <TouchableOpacity style={{ padding:2,}} onPress={() => {
                    
                       this.onSelect('camera') }}>
                    <Icon name="camera" size={20} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity  style={{ padding:2, marginLeft:18}} onPress={() => { this.onSelect('gallery') }}>
                    <Image source={Constants.Images.user.gallery} style={styles.iconStyle} />
                    </TouchableOpacity>
                  </View>
                  <View>
                  </View>

                </View>
              </View>
              <TextInput
                style={styles.textInputStyle}
                autoFocus={false}
                autoCorrect={false}
                onBlur={ () => this._onBlur() }
                onFocus={ () => this._onFocus() }
                placeholder='Name'
                placeholderTextColor={'gray'}
                underlineColorAndroid={this._getULColor(this.state.hasFocus)}
                onChangeText={(name) => this.setState({ name })}
              />
              <TextInput
                style={styles.textInputStyle}
                maxLength={10}
                autoFocus={false}
                autoCorrect={false}
                onBlur={ () => this._onBlur() }
                onFocus={ () => this._onFocus() }
                placeholder='Phone'
                placeholderTextColor={'gray'}
                underlineColorAndroid={this._getULColor(this.state.hasFocus)}
                keyboardType='phone-pad'
                onChangeText={(phone) => this.setState({ phone })}
              />
              <TextInput
                autoFocus={false}
                autoCorrect={false}
                onBlur={ () => this._onBlur() }
                onFocus={ () => this._onFocus() }
                style={styles.textInputStyle}
                placeholder='Email'
                keyboardType='email-address'
                placeholderTextColor={'gray'}
                underlineColorAndroid={this._getULColor(this.state.hasFocus)}
                onChangeText={(email) => this.setState({ email })}

              />
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                 
                 autoFocus={false}
                 autoCorrect={false}
                 onBlur={ () => this._onBlur() }
                 onFocus={ () => this._onFocus() }
                  style={{ flex: 1, padding: 10 ,color:'white'}}
                  placeholder='Height(cm)'
                  placeholderTextColor={'gray'}
                  underlineColorAndroid={this._getULColor(this.state.hasFocus)}
                  keyboardType='number-pad'
                  onChangeText={(height) => this.setState({ height })}
                />
                <TextInput
                  maxLength={3}
                  autoFocus={false}
                  autoCorrect={false}
                  onBlur={ () => this._onBlur() }
                  onFocus={ () => this._onFocus() }
                  style={{ flex: 1, padding: 10, marginLeft: 10 ,color:'white'}}
                  placeholder='Weight(kg)'
                  placeholderTextColor={'gray'}
                  underlineColorAndroid={this._getULColor(this.state.hasFocus)}
                  keyboardType='number-pad'
                  onChangeText={(weight) => this.setState({ weight })}
                />

              </View>

              <DatePicker
                style={{ width: '100%' ,borderBottomColor:'red'}}
                date={this.state.dob}
                mode="date"
                placeholder="DOB"
                format="YYYY-MM-DD"
                minDate="1950-05-01"
                maxDate={currentDate}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={Constants.Images.user.calendarGray}
                customStyles={{
                  dateIcon: [styles.rowIcon,{tintColor:'gray'}],
                  dateInput: [styles.rowLeft],
                  placeholderText: { color: 'gray' },
                  dateText: { color: 'white' }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(dob) => this.setState({ dob })}
              />



              <TextInput
                autoFocus={false}
                autoCorrect={false}
                onBlur={ () => this._onBlur() }
                onFocus={ () => this._onFocus() }
                style={styles.textInputStyle}
                placeholder='Password'
                placeholderTextColor={'gray'}
                underlineColorAndroid={this._getULColor(this.state.hasFocus)}
                showPassword={false}
                onChangeText={(password) => this.setState({ password })}
                secureTextEntry={true}

              />
              <TextInput
                autoFocus={false}
                autoCorrect={false}
                onBlur={ () => this._onBlur() }
                onFocus={ () => this._onFocus() }
                style={styles.textInputStyle}
                placeholder='Confirm Passowrd'
                placeholderTextColor={'gray'}
                underlineColorAndroid={this._getULColor(this.state.hasFocus)}
                showPassword={false}
                onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                secureTextEntry={true}

              />

              <TouchableOpacity onPress={() => this.signUpSubmit()}

                style={styles.buttonStyle} >
                <Text style={{ color:Constants.Colors.Purple ,fontWeight: '500'}}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.signInbtn} onPress={() => this.onSignIn()}>
                <Text style={{ color: 'white', alignSelf: 'center', padding: 5 }}>Already a Member?<Text style={{ color: 'yellow' }}> Sign in
             </Text> </Text>
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
    paddingHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7,


  },
  rowIcon:{
    width: Constants.BaseStyle.DEVICE_WIDTH * 5 / 100,
    height: Constants.BaseStyle.DEVICE_WIDTH * 5 / 100,
  },
  textStyle: {
    color:'white',
    fontSize: 16,
    paddingLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
  },
  signUpTxt: { padding: 10, alignSelf: 'center', fontSize: 20,color:'white' },
  signInbtn: {
   padding:5,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    alignSelf: 'center'
  },
  textInputStyle: {
    color:'white',
    padding: 10,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,

  },
  imageStyle: {
    width: Constants.BaseStyle.DEVICE_WIDTH * 26 / 100,
    height: Constants.BaseStyle.DEVICE_WIDTH * 26 / 100,
    borderRadius: Constants.BaseStyle.DEVICE_WIDTH * 13 / 100,
    borderColor: 'yellow',
    borderWidth: 3

  },
  buttonStyle: {
    marginTop: 12,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 12,
    width: "42%",
    justifyContent: "center", alignItems: 'center'
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center"

  },
  rowLeft: {
    flex: 1,
    flexDirection: 'row',
    padding: 0,
    //marginRight:6,
    // marginHorizontal:0,
    //marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
    marginTop: 2,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 200,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomColor: 'gray', justifyContent: 'flex-start', marginLeft: 8


    //borderBottomColor:Constants.Colors.Blue
  },
  iconStyle: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
    width: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
  
  },
});

// const mapStateToProps = state => ({
//   modalstate: state.ModalHandleReducer,
//   deviceToken: state.user.deviceToken
// });

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(null, mapDispatchToProps)(SignUp);
