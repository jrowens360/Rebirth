import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Image,TextInput,TouchableOpacity,ScrollView

} from 'react-native';
import NavigationBar from 'react-native-navbar';

import Constants from '../constants';
const titleConfig = {
    title: 'Reset Password ',
  };
 

export default class ResetPassword extends Component {
  
  render() {
    return (
      
      <View style={styles.container}>
        <NavigationBar
        title={titleConfig}
        backgroundColor='#F5FCFF'
      
      />

     <View style={{flex:1,paddingHorizontal:20,  justifyContent: "center", }}>
     <Image source={{uri: 'http://lorempixel.com/100/100/'}} style={styles.imageStyle} />
     <Text style={[styles.textStyle]}>
           One time Password has sent to{"\n"}your email please enter the same to reset the password
          </Text>

          <TextInput
        style={styles.textInputStyle}
        placeholder='Otp'
        placeholderTextColor={Constants.Colors.Blue}
        underlineColorAndroid={Constants.Colors.Black}
      /> 
       <TextInput
        style={styles.textInputStyle}
        placeholder='Password'
        placeholderTextColor={Constants.Colors.Blue}
        underlineColorAndroid={Constants.Colors.Black}
      /> 
       <TextInput
        style={styles.textInputStyle}
        placeholder='New password'
        placeholderTextColor={Constants.Colors.Blue}
        underlineColorAndroid={Constants.Colors.Black}
      /> 
                <TouchableOpacity >
                <Text style={{  marginTop:Constants.BaseStyle.DEVICE_HEIGHT / 100 *4,fontSize: 16,color:'red', textAlign: "center",}}>
          Request new OTP
          </Text>
          </TouchableOpacity>
        <TouchableOpacity
                  
                  style={styles.buttonStyle} >
                  <Text style={{ color: "#fff" }}>Sign Up</Text>
                </TouchableOpacity>
          
          </View>
     </View>

  
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal:Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    backgroundColor: '#F5FCFF',
   
 
  },
  textInputStyle: {
    padding:10,
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1.5,
  
    },
    imageStyle: {
        width: Constants.BaseStyle.DEVICE_WIDTH*30/100,
        height:Constants.BaseStyle.DEVICE_WIDTH*30/100,
        alignSelf:'center',
        
      },
      textStyle: {
        marginTop:Constants.BaseStyle.DEVICE_HEIGHT / 100 *4,
        fontSize: 18,
        textAlign: "center",
        
      },
 
  buttonStyle:{
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT / 100 *2,
    borderRadius: 20,
    backgroundColor: "#3474cc",
    padding:12,
    width: "40%",
    alignSelf:'center',
    justifyContent: "center", alignItems: 'center'
  },
  
});
