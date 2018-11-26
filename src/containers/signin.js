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
    title: 'Sign in ',
  };
 

export default class SignIn extends Component {
  
  render() {
    return (
      
      <View style={styles.container}>
        <NavigationBar
        title={titleConfig}
        backgroundColor='#F5FCFF'
      
      />

<ScrollView>
     <View style={{flex:1,paddingHorizontal:20,  justifyContent: "center", }}>
     <Image source={{uri: 'http://lorempixel.com/100/100/'}} style={styles.imageStyle} />


          <TextInput
        style={styles.textInputStyle}
        placeholder='Email'
        placeholderTextColor={Constants.Colors.Blue}
        underlineColorAndroid={Constants.Colors.Black}
      /> 
        <TextInput
        style={[styles.textInputStyle,{marginTop:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3}]}
        placeholder='Password'
        placeholderTextColor={Constants.Colors.Blue}
        underlineColorAndroid={Constants.Colors.Black}
        showPassword={false}
      /> 
             <Text style={{color: 'red',textAlign:'right'}}> Forgot password ?
                </Text>   

        <TouchableOpacity
                  
                  style={styles.buttonStyle} >
                  <Text style={{ color: "#fff" }}>Submit</Text>
                </TouchableOpacity>
                <Text style={styles.bottomText}>New User?<Text style={{color: 'red'}}> Sign Up Now
                </Text>
              </Text>
          
          </View>
          </ScrollView>
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
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6,
  
    },
    bottomText:{ 
        color: 'black', 
        alignSelf: 'center',
        padding:20,   
        marginTop:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 15
    },
    imageStyle: {
        width: Constants.BaseStyle.DEVICE_WIDTH*30/100,
        height:Constants.BaseStyle.DEVICE_WIDTH*30/100,
        alignSelf:'center',
        marginTop:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
        
      },
 
  buttonStyle:{
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT / 100 *4,
    borderRadius: 20,
    backgroundColor: "#3474cc",
    padding:12,
    width: "40%",
    alignSelf:'center',
    justifyContent: "center", alignItems: 'center'
  },
  
});
