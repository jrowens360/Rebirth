import React, { Component } from 'react';
import { Text,
   View,
   Dimensions,
   StyleSheet,
   TouchableOpacity,
   TextInput,
   ScrollView,
   Image,
  } from 'react-native';
   import Constants from '../constants';
   import { connect } from 'react-redux';
   import moment from "moment";
   import { ToastActionsCreators } from 'react-native-redux-toast';
   import NavigationBar from 'react-native-navbar';
   import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
   import Icon from 'react-native-vector-icons/FontAwesome';
   import * as UserActions from '../redux/modules/user';
   import Background from '../components/common/BackgroundImg';
   import { bindActionCreators } from "redux";
   import _ from "lodash";
   import Regex from '../utilities/Regex';
class ChangePassword extends Component {
       constructor(props) {
         super(props);
         this.state = {
           currentPassword:'',
           newPassword: '',
           confirmNewPassword:'',

           secureEntry: true,
           passwordEye: false,
           hasFocus:false
          
         };
       }
    
      save(){
        let { dispatch } = this.props.navigation;
        let { currentPassword, newPassword, confirmNewPassword } = this.state;

    if (_.isEmpty(currentPassword.trim())) {
      dispatch(ToastActionsCreators.displayInfo('Please enter your current password'))
      return;
    }

  
    if (_.isEmpty(newPassword.trim())) {
      dispatch(ToastActionsCreators.displayInfo('Please enter your new password'))
      return;
    }

    if (newPassword.length<6) {
      dispatch(ToastActionsCreators.displayInfo('Password should be minimum 6 characters'))
      return;
    }

    
    if (_.isEmpty(confirmNewPassword.trim())) {
      dispatch(ToastActionsCreators.displayInfo('Please enter your new confirm password'))
      return;
    }

    
    if (newPassword != confirmNewPassword) {
        dispatch(ToastActionsCreators.displayInfo('Password and Confirm Password does not match'))
        return;
  
     }


    this.props.UserActions.changePasswordFirebase({ ...this.state },() =>{
     this.setState({
      currentPassword:'',
      newPassword: '',
      confirmNewPassword:'',

     });
    });
    
   }
   _onBlur() {
    this.setState({hasFocus: false});
    }

  _onFocus() {
    this.setState({hasFocus: true});
    }

  _getULColor(hasFocus) {
  
    return (hasFocus === true) ? 'black' : 'gray';
  }



render() {
      
        
           return (
            <Background style={styles.container} src={Constants.Images.user.dashboardbg}  >

             <KeyboardAwareScrollView>
          
            
              <ScrollView keyboardDismissMode='on-drag'>

 <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5, alignItems: 'center' }}>
            <TouchableOpacity  style={{paddingHorizontal:6}} onPress={() => this.props.navigation.goBack()}>
              <Icon name="angle-left" size={40} color='white' />
            </TouchableOpacity>
            <Text style={styles.headerTxt}> Change Password  </Text>
            <View></View>
          </View>



             <View style = {styles.mainContainer}>
             
            {/* <View> */}
            <TextInput
                value={this.state.currentPassword}
                style={styles.textInputStyle}
                autoFocus={false}
                autoCorrect={false}
                onBlur={ () => this._onBlur() }
                onFocus={ () => this._onFocus() }
                placeholder='Current Password'
                placeholderTextColor={'gray'}
                underlineColorAndroid={this._getULColor(this.state.hasFocus)}
                showPassword={false}
                onChangeText={(currentPassword) => this.setState({ currentPassword })}
                secureTextEntry={true} 
              />

            {/* {this.state.currentPassword != '' && <TouchableOpacity
              style={{ position: 'absolute', right: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5, bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1.5 }}
              onPress={() => this.setState({ secureEntry: !this.state.secureEntry, passwordEye: !this.state.passwordEye })}>
              <Image source={this.state.passwordEye ? Constants.Images.user.crossEye : Constants.Images.user.eye} style={[{ width: 20, height: 20 }]} style={styles.eye} resizeMode="contain" />
            </TouchableOpacity>}


            </View>
             */}
         
         <TextInput
               value={this.state.newPassword}
               style={styles.textInputStyle}
                autoFocus={false}
                autoCorrect={false}
                onBlur={ () => this._onBlur() }
                onFocus={ () => this._onFocus() }
                placeholder='New Password'
                placeholderTextColor={'gray'}
                underlineColorAndroid={this._getULColor(this.state.hasFocus)}
                showPassword={false}
                onChangeText={(newPassword) => this.setState({ newPassword })}
                secureTextEntry={true} 
              />

           
        
             <TextInput
                    value={this.state.confirmNewPassword}
                    autoFocus={false}
                    autoCorrect={false}
                    onBlur={ () => this._onBlur() }
                    onFocus={ () => this._onFocus() }
                    style={styles.textInputStyle}
                   placeholder="Confirm New Password"
                  
                   autoCapitalize={false}
                  
                   placeholderTextColor='gray'
                   secureTextEntry={true} 
                   underlineColorAndroid={this._getULColor(this.state.hasFocus)}
                   onChangeText={(confirmNewPassword) => this.setState({confirmNewPassword})}
                  
            />
             
              <TouchableOpacity style={styles.buttonStyle} onPress = {()=>this.save()}>
                   <Text style = {styles.savetxt}>Save</Text>
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
           backgroundColor:'black',
           flex: 1,
          
         },
         textInputStyle: {
          padding: 10,
          marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1,
          color:'black'
      
        },
         navBar:{
           backgroundColor:"black",
         },
         mainContainer:{
          
             paddingTop:Constants.BaseStyle.DEVICE_HEIGHT/100*4,
             height:Constants.BaseStyle.DEVICE_HEIGHT/100*80,
             marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100*6,
             paddingHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100*4,
             backgroundColor:Constants.Colors.White,
             marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*1,
             borderRadius:10
         
         },
        
       
         buttonStyle:{
            marginTop:15,
            alignSelf: 'center',
            borderRadius: 25,
            backgroundColor: Constants.Colors.Purple,
            padding:9,
            width: "42%",
            justifyContent: "center", alignItems: 'center'
          },
          navIcons: {
            height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
            width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
          },
          headerTxt: { padding: 10, alignSelf: 'center', fontSize: 20, color: 'white' },
         savetxt:{ color: 'white', alignSelf: 'center', padding: 5 },
         eye: {
          height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
          width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6
        }
       })
// const mapStateToProps = state => ({
//   modalstate: state.ModalHandleReducer,
//   deviceToken: state.user.deviceToken
// });

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(null, mapDispatchToProps)(ChangePassword);
