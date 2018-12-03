import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Image,TextInput,TouchableOpacity,ScrollView

} from 'react-native';


import Constants from '../constants';
import Background from '../components/common/BackgroundImg';

var firebase = require("firebase");

var config = {
    apiKey: 'AIzaSyBzqxxRZDk9KPLW899OF65iWsI5ZVES5Z0',
    authDomain: 'quizdemo-6805d.firebaseio.com',
    databaseURL: "https://quizdemo-6805d.firebaseio.com",
    projectId: "quizdemo-6805d",
};



export default class Splash extends Component {
    constructor(props) {
        super(props);
        setTimeout(() => {

         
          this.props.navigation.navigate("startup")
        }, 3000);
      }

      componentDidMount(){
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        console.disableYellowBox = true;

      }

  
  render() {
    return (
      
      <Background style={styles.container} src={Constants.Images.user.splashbg} >
      
  
     <Image source={Constants.Images.user.splashLogo} style={styles.imageStyle} resizeMode='contain' />       
     
     </Background>

  
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor: '#F5FCFF',
     alignItems: 'center',
     // justifyContent: 'center'
   
 
  },
 
    imageStyle: {
        width: Constants.BaseStyle.DEVICE_WIDTH*70/100,
        height:Constants.BaseStyle.DEVICE_HEIGHT*18/100,
        marginTop:Constants.BaseStyle.DEVICE_HEIGHT*20/100,
        alignSelf:'center',
        
      },
 
  
  
});
