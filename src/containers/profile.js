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
   export default class Profile extends Component {
       constructor(props) {
         super(props);
         this.state = {
        
          
         };
       }
   
      save(){
   
   }
render() {
      
           const titleConfig = {
             title: 'Profile',
             tintColor:'white'
           };
           return (
             <View style={styles.container}>
           
            <NavigationBar style = {styles.navBar}
             title={titleConfig}
             rightButton={
                <TouchableOpacity onPress={()=>goBack()}>
                  <Icon name="angle-left" size={40} color='white' style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} />
                </TouchableOpacity>
              }
          
               />
             
             <View style = {styles.mainContainer}>
            
             <View style = {styles.itemStyle}>
             <Icon name="user" size={25} color='black'   />
    
             <Text style={styles.textStyle}>Personal Details</Text>
             <Icon name="angle-right" size={25} color='black'   />
             </View>
             <View style = {styles.itemStyle}>
             <Icon name="user" size={25} color='black'   />
    
             <Text style={styles.textStyle}>Payment Methods</Text>
             <Icon name="angle-right" size={25} color='black'  />
             </View>
             <View style = {styles.itemStyle}>
             <Icon name="user" size={25} color='black'  />
    
             <Text style={styles.textStyle}>Change Password</Text>
             <Icon name="angle-right" size={25} color='black'  />
             </View>
             <View style = {styles.itemStyle}>
             <Icon name="user" size={25} color='black'   />
    
             <Text style={styles.textStyle}>Logout</Text>
             
             </View>
        
            
             
               </View>
             
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
         textStyle:{ color: "black" ,flex:1,paddingLeft:10},
         itemStyle:{
             flexDirection:'row',
         borderBottomColor:'black',
         borderBottomWidth:2,
         paddingVertical:Constants.BaseStyle.DEVICE_HEIGHT/100*2,
         alignItems: 'center'
         
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
        
       
         
       })
