import React, { Component } from 'react';
import { Text, 
    View,
    StyleSheet,
    Image,
    TouchableOpacity } from 'react-native';
import Constants from '../constants';
var ScrollableTabView = require('react-native-scrollable-tab-view');
import SignIn from "../containers/signin";
import ChangePassword from "../containers/signup";



export default class InfoProfile extends Component {
  render() {
    return (
      <View style = {styles.container}>
      <Image source={{uri: 'http://lorempixel.com/100/100/'}} style={styles.imageStyle} />
       
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      backgroundColor:'pink',
      flex: 1,
      //alignItems: 'center',
      //justifyContent: 'center'
    },
    imageStyle: {
        flex:1,
        width: Constants.BaseStyle.DEVICE_WIDTH*90/100,
        height:Constants.BaseStyle.DEVICE_WIDTH*90/100,
        // alignSelf:'center',
        // marginTop:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
       // borderRadius:10,
       borderBottomLeftRadius: 10, 
       borderBottomRightRadius: 20,

        
      },
 
    mainContainer:{
        flex:1,
          paddingTop:Constants.BaseStyle.DEVICE_HEIGHT/100*4,
          //paddingBottom:Constants.BaseStyle.DEVICE_HEIGHT/100*10,
          marginBottom:Constants.BaseStyle.DEVICE_HEIGHT/100*3,
          marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100*6,
          backgroundColor:Constants.Colors.White,
          //marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*2,
          borderRadius:10
          //alignItems: 'center',
          //justifyContent: 'center'
      },
    
})