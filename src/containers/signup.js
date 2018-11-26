
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Image,TextInput,TouchableOpacity,ScrollView

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Constants from '../constants';
import NavigationBar from 'react-native-navbar';

const titleConfig = {
  title: 'Sign Up',
};
 

export default class SignUp extends Component {
  
  render() {
    return (
      <View style={{flex:1}}>
       <NavigationBar
        title={titleConfig}
        backgroundColor='#F5FCFF'
      
      />
<ScrollView>
      <View style={styles.container}>
      <View  style={styles.profileRow}>
      <Image source={{uri: 'http://lorempixel.com/100/100/'}} style={styles.imageStyle} />

        <View> 
        
        <Text style={[styles.textStyle]}>
            change photo
          </Text>
          <View style={{ flexDirection: "row",paddingLeft:Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,paddingTop:5}}>
          <Icon name="camera" size={25} color='black' />
          <Icon name="edit" size={25} color='black' style={{ paddingLeft:10}}  />

          </View>
          <View>
                          </View> 

            </View>                
      </View>
      <TextInput
        style={styles.textInputStyle}
        placeholder='Name'
        placeholderTextColor={Constants.Colors.Blue}
        underlineColorAndroid={Constants.Colors.Black}
      /> 
       <TextInput
        style={styles.textInputStyle}
        placeholder='Phone'
        placeholderTextColor={Constants.Colors.Blue}
        underlineColorAndroid={Constants.Colors.Black}
      /> 
       <TextInput
        style={styles.textInputStyle}
        placeholder='Email'
        placeholderTextColor={Constants.Colors.Blue}
        underlineColorAndroid={Constants.Colors.Black}
        
      /> 
      <View  style={{flexDirection:'row'}}>
       <TextInput
        style={{flex:1,padding:10}}
        placeholder='Height'
        placeholderTextColor={Constants.Colors.Blue}
        underlineColorAndroid={Constants.Colors.Black}
      /> 
       <TextInput
        style={{flex:1,padding:10,marginLeft:10}}
        placeholder='Width'
        placeholderTextColor={Constants.Colors.Blue}
        underlineColorAndroid={Constants.Colors.Black}
      /> 
      
      </View>
      <TextInput
         style={styles.textInputStyle}
        placeholder='Password'
        placeholderTextColor={Constants.Colors.Blue}
        underlineColorAndroid={Constants.Colors.Black}
        showPassword={false}
        
      /> 
      <TextInput
        style={styles.textInputStyle}
        placeholder='Confirm Passowrd'
        placeholderTextColor= {Constants.Colors.Blue}
        underlineColorAndroid={Constants.Colors.Black}
        showPassword={false}
        
      /> 

      <TouchableOpacity
                  
                  style={styles.buttonStyle} >
                  <Text style={{ color: "#fff" }}>Sign Up</Text>
                </TouchableOpacity>
                  <Text style={{ color: 'black', alignSelf: 'center',padding:20 }}>Already a Member?<Text style={{color: 'red'}}> Sign up
             </Text> </Text>
      </View>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    backgroundColor: '#F5FCFF',
 
  },
  textStyle: {
    fontSize: 18,
    paddingLeft:Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
  },
  textInputStyle: {
  padding:10,
  marginTop:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,

  },
  imageStyle: {
    width: Constants.BaseStyle.DEVICE_WIDTH*30/100,
    height:Constants.BaseStyle.DEVICE_WIDTH*30/100,
    borderRadius: Constants.BaseStyle.DEVICE_WIDTH*15/100,
    borderColor:'yellow',
    borderWidth:4
    
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
  profileRow: {
    flexDirection: "row",
    alignItems: "center"
    
  },
});
