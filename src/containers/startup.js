import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Image,TextInput,TouchableOpacity,ScrollView

} from 'react-native';

import Constants from '../constants';
import Background from '../components/common/BackgroundImg';

 

export default class Startup extends Component {
  constructor(props) {
    super(props);
    this.state = {
       

    };
  }


  onSignUp(){
    this.props.navigation.navigate("signup")

  }
  onSignIn(){
    this.props.navigation.navigate("SignIn")

  }


  
  render() {
    return (
      
      <Background style={styles.container} src={Constants.Images.user.splashbg}>
        <Image source={Constants.Images.user.splashLogo} style={styles.imageStyle}  resizeMode='contain'/>
        

     <View style={styles.bottomConatiner}>

          <Text style={[styles.textStyle]}>
           {/* Body Scanning in the palm of{"\n"} your hand */}
          </Text>
          <View  style={styles.subConatiner}>
          <TouchableOpacity
                  onPress = {()=>this.onSignIn()}
                  style={styles.buttonStyle} >
                  <Text style={{ color: Constants.Colors.Purple,fontWeight: '500'}}>Sign In</Text>
                </TouchableOpacity>
                

         <TouchableOpacity
        onPress = {()=>this.onSignUp()}
                
                  style={[styles.buttonStyle,{marginLeft:18,backgroundColor:Constants.Colors.Purple }]} >
                  <Text style={{ color: 'white',fontWeight: '500'}}>Sign Up</Text>
                </TouchableOpacity> 
          
          </View>
     </View>

  
      </Background>
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
    color:'white',
    fontSize: 22,
    textAlign: "center",
    
  },
  imageStyle: {
    
    width: Constants.BaseStyle.DEVICE_WIDTH*70/100,
    height:Constants.BaseStyle.DEVICE_HEIGHT*18/100,
    alignSelf:'center',
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT*20/100,
    
  },
 
 
  buttonStyle:{
   // marginTop:Constants.BaseStyle.DEVICE_HEIGHT / 100 *4,
    borderRadius: 20,
    backgroundColor:'white',
    padding:12,
    width: "40%",
    justifyContent: "center", 
    alignItems: 'center'
  },
  bottomConatiner: { 
  flex:1,
    marginBottom:Constants.BaseStyle.DEVICE_HEIGHT / 100 *20,
      position: 'absolute',  bottom: 0,
      alignItems: 'center',
    justifyContent: "center",
     //height:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 40,
  },
  subConatiner: {
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT / 100 *5,
    alignItems: 'center',
    flexDirection: "row",
    alignItems: "center"
    
  },
});
