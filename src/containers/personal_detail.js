import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import Constants from '../constants';
import { connect } from 'react-redux';
import moment from "moment";
import _ from "lodash";
import Regex from '../utilities/Regex';
import { bindActionCreators } from "redux";
import { ToastActionsCreators } from 'react-native-redux-toast';
import NavigationBar from 'react-native-navbar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/FontAwesome';
import Background from '../components/common/BackgroundImg';
import * as UserActions from '../redux/modules/user';

import RNFetchBlob from 'react-native-fetch-blob'
//import ImagePicker from 'react-native-image-picker';

import ImagePicker from "react-native-image-crop-picker";
const options = {
  title: 'Select Avatar',
  mediaType:'photo',
  maxWidth: 1080,
  maxHeight: 720,
  
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};


var firebase = require("firebase");
const currentDate = moment().add(1, 'days').format('YYYY-MM-DD');
class PersonalDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      dob: '',
      hasFocus: false,
      avatarSource: '',
      imageUrl: '',

    }


  }

  componentWillMount() {
    this.props.UserActions.readUserData();

  }
  componentWillReceiveProps(props) {
   
    let { name, email, phone, dob, profileImg } = props.userDetail;
    this.setState({ name, email, phone, dob, imageUrl: profileImg, avatarSource: { uri: profileImg } }, () => {
      // console.log("set value here " + JSON.stringify(this.state.avatarSource));
    
    });


  }

  save() {


    let { dispatch } = this.props.navigation;
    let { name, email, phone, dob } = this.state;
  
    if (_.isEmpty(name.trim())) {

      dispatch(ToastActionsCreators.displayInfo('Please enter your name'))
      return;
    }


    if (_.isEmpty(phone.trim())) {
  
      dispatch(ToastActionsCreators.displayInfo('Please enter your phone number'))
      return;
    }

    if (!Regex.validateMobile(phone.trim())) {
    
      dispatch(ToastActionsCreators.displayInfo('Please enter a valid phone number'))
      return;
    }



    if (_.isEmpty(email.trim())) {
    
      dispatch(ToastActionsCreators.displayInfo('Please enter your email'))
      return;
    }
    if (!Regex.validateEmail(email.trim())) {
    
      dispatch(ToastActionsCreators.displayInfo('Please Enter a valid email'))
      return;
    }


   

    if (_.isEmpty(dob.trim())) {
      dispatch(ToastActionsCreators.displayInfo('Please enter your Date of Birth'))
      return;
    }

      this.props.UserActions.updateUserData({ ...this.state });

 

  }
  onSelect = (picked) => {
 
    if (picked === 'gallery') {


        ImagePicker.openPicker({
          width: 540,
          height: 360,
          cropping: true,
          enableRotationGesture: true
  
        }).then(image => {
        // console.log(image);

     
          let source = { uri: image.path, type: image.mime };
          this.setState({
                  avatarSource: source,
                },()=>{
                  this.getSelectedImages()
                });
              
        }).catch(function (error) {
                         console.log("my error",error);
                     });
       
       } else {



        ImagePicker.openCamera({
          width: 540,
          height: 360,
          cropping: true,
          enableRotationGesture: true
  
        }).then(image => {
   
          let source = { uri: image.path, type: image.mime };
          this.setState({
                  avatarSource: source,
                },()=>{
                  this.getSelectedImages()
                });
              
        }).catch(function (error) {
                         console.log("my error",error);
                     });


    }
  }

  getSelectedImages = () => {
  
    let { dispatch } = this.props.navigation;
    dispatch({ type: "LOADING_START" });
   
   // const image = this.state.avatarSource.uri
    const image = Platform.OS === 'ios' ? this.state.avatarSource.uri.replace('file://', '') : this.state.avatarSource.uri

    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob
    //let user = firebase.auth().currentUser

    let uploadBlob = null
    const imageRef = firebase.storage().ref('images').child(Math.floor(Date.now()) + '.jpg')
    console.log("firbase" + image);
    let mime = 'image/jpg'


    fs.readFile(image, 'base64')
      .then((data) => {
        console.log("my data",data);
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        console.log("image upload " + JSON.stringify(uploadBlob))
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        console.log("image download " + imageRef.getDownloadURL())
        uploadBlob.close()
        dispatch({ type: "LOADING_STOP" });
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        this.setState({ imageUrl: url })
        // URL of the image uploaded on Firebase storage
        console.log("url in image" + this.state.imageUrl);

        this.props.UserActions.updateUserData({ ...this.state });

      })
      .catch((error) => {
        console.log("error in image" + JSON.stringify(error));

      })
    
  }


  _onBlur() {
    this.setState({ hasFocus: false });
  }

  _onFocus() {
    this.setState({ hasFocus: true });
  }

  _getULColor(hasFocus) {

    return (hasFocus === true) ? 'black' : 'gray';
  }






  render() {
   

    return (
      <Background style={styles.container} src={Constants.Images.user.dashboardbg}  >

        <KeyboardAwareScrollView>

          <ScrollView keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'interactive'} keyboardShouldPersistTaps="always"  >
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5, alignItems: 'center' }}>
              <TouchableOpacity style={{ paddingHorizontal: 6 }} onPress={() => this.props.navigation.goBack()}>
                <Icon name="angle-left" size={40} color='white' />
              </TouchableOpacity>
              <Text style={styles.headerTxt}> Personal Details  </Text>
              <View style={{width:30}}></View>
            </View>
            <View style={styles.mainContainer}>

              <View style={styles.container}>
                <View style={styles.profileRow}>
                  <Image source={this.state.avatarSource} style={styles.imageStyle} />

                  <View>
                    <Text style={[styles.textStyle]}>
                      Select Photo</Text>
                    <View style={{ flexDirection: "row", marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6, marginTop: 8 }}>
                      <TouchableOpacity style={{ padding: 2, }} onPress={() => {

                        this.onSelect('camera')
                      }}>
                        <Image source={Constants.Images.user.cameraBlue} style={styles.iconStyle} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{ padding: 2, marginLeft: 18 }} onPress={() => { this.onSelect('gallery') }}>
                        <Image source={Constants.Images.user.galleryBlue} style={styles.iconStyle} />
                      </TouchableOpacity>
                    </View>
                    <View>
                    </View>

                  </View>
                </View>
                <TextInput
                  maxLength={25}
                  value={this.state.name}
                  style={styles.textInputStyle}
                  autoFocus={false}
                  autoCorrect={false}
                  onBlur={() => this._onBlur()}
                  onFocus={() => this._onFocus()}
                  placeholder='Name'
                  placeholderTextColor={'gray'}
                  onChangeText={(name) => this.setState({ name })}
                />
                <View style={{flexDirection:'row'}}>
                <TextInput
                  // value={+1}
                  style={styles.textInputStyle}
                  maxLength={1}
                  autoFocus={false}
                  editable={false}
                  autoCorrect={false}
                  onBlur={() => this._onBlur()}
                  onFocus={() => this._onFocus()}
                  placeholder='+1'
                  placeholderTextColor={'black'}
                //  underlineColorAndroid={'black'}
                  keyboardType='phone-pad'
                  // onChangeText={(phone) => this.setState({ phone })}
                />
                <TextInput
                  value={this.state.phone}
                  style={[styles.textInputStyle,{flex:1}]}
                  maxLength={10}
                  autoFocus={false}
                  autoCorrect={false}
                  onBlur={() => this._onBlur()}
                  onFocus={() => this._onFocus()}
                  placeholder='Phone'
                  placeholderTextColor={'gray'}
                //  underlineColorAndroid={this._getULColor(this.state.hasFocus)}
                  keyboardType='phone-pad'
                  onChangeText={(phone) => this.setState({ phone })}
                />
                </View>
                <TextInput
                  value={this.state.email}
                  autoFocus={false}
                  autoCorrect={false}
                  onBlur={() => this._onBlur()}
                  onFocus={() => this._onFocus()}
                  style={styles.textInputStyle}
                  placeholder='Email'
                  keyboardType='email-address'
                  placeholderTextColor={'gray'}
                 // underlineColorAndroid={this._getULColor(this.state.hasFocus)}
                  onChangeText={(email) => this.setState({ email })}

                />
                

                <DatePicker
                  style={{ width: '100%', borderBottomColor: 'gray',marginTop:3 }}
                  date={this.state.dob}
                  mode="date"
                  placeholder="DOB"
                  format="MM/DD/YYYY"
                  minDate="1950-05-01"
                  maxDate={currentDate}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  iconSource={Constants.Images.user.calendarGray}
                  customStyles={{
                    dateIcon: [styles.rowIcon, { tintColor: 'gray' }],
                    dateInput: [styles.rowLeft],
                    placeholderText: { color: 'gray' },
                    dateText: { color: 'gray' }
                  }}
                  onDateChange={(dob) => this.setState({ dob })}
                />
                <TouchableOpacity onPress={() => { this.save() }}

                  style={styles.buttonStyle} >
                  <Text style={{ color: "#fff", fontWeight: '500' }}>Save</Text>
                </TouchableOpacity>

              </View>
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

  },
  navBar: {
    backgroundColor: "black",
  },

  mainContainer: {

    paddingTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 80,
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6,
    paddingHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    backgroundColor: Constants.Colors.White,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1,
    borderRadius: 10

  },
  textStyle: {
    fontWeight: '400',
    fontSize: 16,
    color: 'black',
    paddingLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
  },
  textInputStyle: {
    paddingVertical: 8,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1,
    borderBottomColor:'gray',
    borderBottomWidth:1,
    marginLeft:2

  },
  imageStyle: {
    width: Constants.BaseStyle.DEVICE_WIDTH * 25 / 100,
    height: Constants.BaseStyle.DEVICE_WIDTH * 25 / 100,
    borderRadius: Constants.BaseStyle.DEVICE_WIDTH * 12 / 100,
    borderColor: Constants.Colors.darkYellow,
    borderWidth: 4

  },
  buttonStyle: {
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: Constants.Colors.Purple,
    padding: 10,
    width: "32%",
    justifyContent: "center", alignItems: 'center'
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center"

  },
  headerTxt: { padding: 10, alignSelf: 'center', fontSize: 20, color: 'white' },
  iconStyle: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
    width: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,

  },
  rowLeft: {
    flex: 1,
    flexDirection: 'row',
    padding: 0,
    marginTop: 2,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 200,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomColor: 'gray', justifyContent: 'flex-start', marginLeft: 2

  },
  rowIcon: {
    width: Constants.BaseStyle.DEVICE_WIDTH * 5 / 100,
    height: Constants.BaseStyle.DEVICE_WIDTH * 5 / 100,
  },



})

const mapStateToProps = state => ({
  userDetail: state.user.userDetail,


});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetail);
