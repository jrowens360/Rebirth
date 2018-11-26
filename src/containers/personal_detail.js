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
   export default class PersonalDetail extends Component {
       constructor(props) {
         super(props);
         this.state = {
        
          
         };
       }
   
      save(){
   
   }
render() {
      
           const titleConfig = {
             title: 'Profile Deatil',
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
              leftButton={
                <TouchableOpacity onPress={()=>goBack()}>
                  <Icon name="angle-left" size={40} color='white' style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} />
                </TouchableOpacity>
              }
               />
             
             <View style = {styles.mainContainer}>
             <ScrollView>
      <View style={styles.container}>
      <View  style={styles.profileRow}>
      <Image source={{uri: 'http://lorempixel.com/100/100/'}} style={styles.imageStyle} />

        <View> 
        
        <Text style={[styles.textStyle]}>
            change photo
          </Text>
          <View style={{ flexDirection: "row",paddingLeft:Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,paddingTop:5}}>
          <Icon name="camera" size={18} color='black' />
          <Icon name="edit" size={18} color='black' style={{ paddingLeft:15}}  />

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
        style={{flex:1,padding:8}}
        placeholder='Height'
        placeholderTextColor={Constants.Colors.Blue}
        underlineColorAndroid={Constants.Colors.Black}
      /> 
       <TextInput
        style={{flex:1,padding:8,marginLeft:10}}
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
        
      /> 
      <TextInput
        style={styles.textInputStyle}
        placeholder='Confirm Passowrd'
        placeholderTextColor= {Constants.Colors.Blue}
        underlineColorAndroid={Constants.Colors.Black}
        
      /> 

      <TouchableOpacity
                  
                  style={styles.buttonStyle} >
                  <Text style={{ color: "#fff" }}>Save</Text>
                </TouchableOpacity>
               
      </View>
      </ScrollView>
          
          
        
            
             
               </View>
             
             </View>
           );
         }
       }
const styles = StyleSheet.create({
         container: {
           
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
         textStyle: {
            fontSize: 16,
            paddingLeft:Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
          },
          textInputStyle: {
          padding:8,
          marginTop:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1,
        
          },
          imageStyle: {
            width: Constants.BaseStyle.DEVICE_WIDTH*25/100,
            height:Constants.BaseStyle.DEVICE_WIDTH*25/100,
            borderRadius: Constants.BaseStyle.DEVICE_WIDTH*12/100,
            borderColor:'yellow',
            borderWidth:4
            
          },
          buttonStyle:{
            marginTop:15,
            alignSelf: 'center',
            borderRadius: 20,
            backgroundColor: "#3474cc",
            padding:10,
            width: "30%",
            justifyContent: "center", alignItems: 'center'
          },
          profileRow: {
            flexDirection: "row",
            alignItems: "center"
            
          },
        
       
         
       })