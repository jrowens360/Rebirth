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
   import Background from '../components/common/BackgroundImg';
   export default class PersonalDetail extends Component {
       constructor(props) {
         super(props);
         this.state = {
        
          
         };
       }
   
      save(){
   
   }
render() {
      
           return (
            <Background style={styles.container} src={Constants.Images.user.dashboardbg}  >
       
       <KeyboardAwareScrollView>
            
             <ScrollView>
             <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="angle-left" size={40} color='white' />
            </TouchableOpacity>
            <Text style={styles.headerTxt}> Personal Details  </Text>
            <View></View>
          </View>

            
             <View style = {styles.mainContainer}>
               
      <View style={styles.container}>
      <View  style={styles.profileRow}>
      <Image source={{uri: 'http://lorempixel.com/100/100/'}} style={styles.imageStyle} />

        <View> 
        
        <Text style={[styles.textStyle]}>
            Change Photo
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
                  <Text style={{ color: "#fff",fontWeight: '500' }}>Save</Text>
                </TouchableOpacity>
               
      </View>
      </View>
     
      </ScrollView>
          
          
        
            
             
      </KeyboardAwareScrollView>  
             
             </Background>
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
           
             paddingTop:Constants.BaseStyle.DEVICE_HEIGHT/100*3,
             height:Constants.BaseStyle.DEVICE_HEIGHT/100*80,
             marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100*6,
             paddingHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100*4,
             backgroundColor:Constants.Colors.White,
             marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*2,
             borderRadius:10
         
         },
         textStyle: {
          fontWeight: '400',
            fontSize: 16,
            color:'black',
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
            backgroundColor: Constants.Colors.Purple,
            padding:10,
            width: "32%",
            justifyContent: "center", alignItems: 'center'
          },
          profileRow: {
            flexDirection: "row",
            alignItems: "center"
            
          },
          headerTxt: { padding: 10, alignSelf: 'center', fontSize: 20, color: 'white' },
        
       
         
       })