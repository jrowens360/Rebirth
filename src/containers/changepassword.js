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
   import NavigationBar from 'react-native-navbar';
   import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
   import Icon from 'react-native-vector-icons/FontAwesome';
   import * as UserActions from '../redux/modules/user';
   import { bindActionCreators } from "redux";
class ChangePassword extends Component {
       constructor(props) {
         super(props);
         this.state = {
           currentPassword:'',
           newPassword: '',
           confirmNewPassword:'',
          
         };
       }
     checkPassword(str){
           var re = /^(?=.\d)(?=.[!@#$%^&])(?=.[a-z])(?=.*[A-Z]).{8,}$/;
          return re.test(str);
      }
      save(){
    
    this.props.UserActions.changePasswordFirebase({ ...this.state });
   }
render() {
      
           const titleConfig = {
             title: 'Change Password',
             tintColor:'white'
           };
           return (
             <View style={styles.container}>
             <KeyboardAwareScrollView>
            <NavigationBar style = {styles.navBar}
             title={titleConfig}
             rightButton={
                <TouchableOpacity onPress={()=>goBack()}>
                  <Icon name="angle-left" size={40} color='white' style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} />
                </TouchableOpacity>
              }
             leftButton={
                <TouchableOpacity onPress={()=>goBack()}>
                  <Icon name="angle-right" size={40} color='white' style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} />
                </TouchableOpacity>
              }


               />
              <ScrollView keyboardDismissMode='on-drag'>
             <View style = {styles.mainContainer}>
             
            
             <TextInput
                   //style={{flex:1}}
                   placeholder="Current Password"
                   keyboardType={'email-address'}
                   autoCapitalize={false}
                   autoCorrect={false}
                   placeholderTextColor='black'
                   underlineColorAndroid={Constants.Colors.Black}
                   onChangeText={(currentPassword) => this.setState({currentPassword})}
            />
         
         <TextInput
                   //style={{flex:1}}
                   placeholder="New Password"
                   keyboardType={'email-address'}
                   autoCapitalize={false}
                   autoCorrect={false}
                   placeholderTextColor='black'
                   underlineColorAndroid={Constants.Colors.Black}
                   onChangeText={(newPassword) => this.setState({newPassword})}
            />
           
        
             <TextInput
                   //style={{flex:1}}
                   placeholder="Confirm New Password"
                   keyboardType={'email-address'}
                   autoCapitalize={false}
                   autoCorrect={false}
                   placeholderTextColor='black'
                   secureTextEntry={true}
                   underlineColorAndroid={Constants.Colors.Black}
                   onChangeText={(confirmNewPassword) => this.setState({confirmNewPassword})}
            />
             
              <TouchableOpacity style={styles.buttonStyle} onPress = {()=>this.save()}>
                   <Text style = {styles.signInText}>Save</Text>
               </TouchableOpacity>
             
               </View>
               </ScrollView>
              </KeyboardAwareScrollView>
             </View>
           );
         }
       }
const styles = StyleSheet.create({
         container: {
           backgroundColor:'black',
           flex: 1,
          
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
             marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*4,
             borderRadius:10
         
         },
        
       
         buttonStyle:{
            marginTop:15,
            alignSelf: 'center',
            borderRadius: 20,
            backgroundColor: "#3474cc",
            padding:10,
            width: "40%",
            justifyContent: "center", alignItems: 'center'
          },
          navIcons: {
            height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
            width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
          },
         
       })
// const mapStateToProps = state => ({
//   modalstate: state.ModalHandleReducer,
//   deviceToken: state.user.deviceToken
// });

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(null, mapDispatchToProps)(ChangePassword);
