import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Image,TextInput,TouchableOpacity,ScrollView

} from 'react-native';


import Constants from '../constants';
import Background from '../components/common/BackgroundImg';
import Icon from 'react-native-vector-icons/FontAwesome';
 

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
       
      }

      onMeasurement(){
        this.props.navigation.navigate("signup")
    
      }
      onFront(){
        this.props.navigation.navigate("FrontView")
    
      }
      onProfile(){
        this.props.navigation.navigate("Profile")
    
      }
  
  render() {
    return (
      
      <Background style={styles.container} src={Constants.Images.user.dashboardbg}  >
      
  
     <Image source={Constants.Images.user.splashLogo} style={styles.imageStyle}  resizeMode='contain'/>
     <View style={{flex:1,justifyContent:'flex-end', alignItems:'center',}}>       
     <Text style = {styles.text}>Add Your first Measurement from here</Text>
     <TouchableOpacity
     onPress = {()=>this.onFront()}
   style={styles.floatStyle}
 >
   <Icon name="plus"  size={30} color="black" />
  </TouchableOpacity>

    <View  style={styles.subConatiner}>
          <TouchableOpacity
                  onPress = {()=>this.onMeasurement()}
                  style={styles.buttonStyle} >
                  <Text style={{ color: Constants.Colors.Purple }}>Measurement</Text>
                </TouchableOpacity>
                

        <TouchableOpacity
        onPress = {()=>this.onProfile()}
                
                  style={[styles.buttonStyle,{backgroundColor:Constants.Colors.Purple }]} >
                  <Text style={{ color: 'white'}}>Profile</Text>
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
      floatStyle:{
        marginTop:Constants.BaseStyle.DEVICE_HEIGHT*3/100,
        borderWidth:1,
        borderColor:Constants.Colors.yellow,
        alignItems:'center',
        justifyContent:'center',
        width:Constants.BaseStyle.DEVICE_WIDTH*18/100,
        // position: 'absolute',                                          
        // bottom: 10,                                                    
        // right: 10,
        height:Constants.BaseStyle.DEVICE_WIDTH*18/100,
        backgroundColor:Constants.Colors.yellow,
        borderRadius:Constants.BaseStyle.DEVICE_WIDTH*9/100,
      },
      text:{
        color:"white",
        fontSize:16,
        textAlign:"center"
    },
    subConatiner: {
        marginTop:Constants.BaseStyle.DEVICE_HEIGHT / 100 *5,
        alignItems: 'center',
        flexDirection: "row",
        alignItems: "center"
        
      },

  buttonStyle:{
      flex:1,
    // marginTop:Constants.BaseStyle.DEVICE_HEIGHT / 100 *4,
 //    borderRadius: 20,
     backgroundColor:'white',
     padding:12,
    // width: "40%",
     justifyContent: "center", alignItems: 'center'
   },
 
  
  
});
