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
   import NavigationBar from 'react-native-navbar';
   import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
   import Icon from 'react-native-vector-icons/FontAwesome';
   export default class ChangePassword extends Component {
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
    //    this.setState({
    //        visible:true
    //    })
    //    if(this.state.currentPassword.length === 0){
    //      this.setState({
    //                  visible:false
    //              })
    //      alert('You must enter current Password');
    //      return;
    //  }
    //  else if(!this.checkPassword(this.state.currentPassword)){
    //        this.setState({
    //                    visible:false
    //                })
    //        alert('Please enter a valid current password')
    //        return;
    //  }
    //   else  if(!this.state.newPassword.length === 0){
    //        this.setState({
    //                    visible:false
    //                })
    //        alert('You must enter a new password')
    //        return;
    //    }
    //    else if(!this.checkPassword(this.state.newPassword)){
    //        this.setState({
    //                    visible:false
    //                })
    //        alert('Please enter a valid password')
    //        return;
    //    }
    //    else if(!this.state.confirmNewPassword.length === 0){
    //      this.setState({
    //                  visible:false
    //              })
    //      alert('You must enter confirm New Password ');
    //      return;
    //            }
    //      else if(this.state.newPassword === this.state.confirmNewPassword ){
    //        this.setState({
    //                    visible:false
    //                })
    //        alert('password do not match ');
    //        return;
    //              }
    //  else if(!this.checkPassword(this.state.confirmNewPassword)){
    //        this.setState({
    //                    visible:false
    //                })
    //        alert('Please enter a valid confirm New Password')
    //        return;
    //  }
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
