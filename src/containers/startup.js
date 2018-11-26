import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Image,TextInput,TouchableOpacity,ScrollView

} from 'react-native';

import Constants from '../constants';

 

export default class Startup extends Component {
  
  render() {
    return (
      
      <View style={styles.container}>

     <View style={styles.bottomConatiner}>

          <Text style={[styles.textStyle]}>
           Body Scanning in the palm of{"\n"} your hand
          </Text>
          <View  style={styles.subConatiner}>
          <TouchableOpacity
                  
                  style={styles.buttonStyle} >
                  <Text style={{ color: "#fff" }}>Sign In</Text>
                </TouchableOpacity>
                

        <TouchableOpacity
                  
                  style={[styles.buttonStyle,{marginLeft:15}]} >
                  <Text style={{ color: "#fff" }}>Sign Up</Text>
                </TouchableOpacity>
          
          </View>
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
     alignItems: 'center'
 
  },
  textStyle: {
    fontSize: 22,
    textAlign: "center",
    
  },
 
 
  buttonStyle:{
   // marginTop:Constants.BaseStyle.DEVICE_HEIGHT / 100 *4,
    borderRadius: 20,
    backgroundColor: "#3474cc",
    padding:10,
    width: "40%",
    justifyContent: "center", alignItems: 'center'
  },
  bottomConatiner: { 
      position: 'absolute',  bottom: 0, padding:10,
      alignItems: 'center',justifyContent: "center",
      height:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 40,},
  subConatiner: {
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT / 100 *5,
    alignItems: 'center',
    flexDirection: "row",
    alignItems: "center"
    
  },
});
