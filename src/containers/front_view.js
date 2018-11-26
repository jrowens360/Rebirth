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
   export default class FrontView extends Component {
       constructor(props) {
         super(props);
         this.state = {
        
          
         };
       }
   
      save(){
   
   }
render() {
      
           const titleConfig = {
             title: 'New Measurement',
             tintColor:'white'
           };
           return (
             <View style={styles.container}>
           
            <NavigationBar style = {styles.navBar}
             title={titleConfig}
             rightButton={
                <TouchableOpacity onPress={()=>goBack()}>
                  <Icon name="angle-left" size={40} color='white' style={[styles.navIcons,{marginRight:Constants.BaseStyle.DEVICE_WIDTH/100*4,}] }/>
                </TouchableOpacity>
              }
              leftButton={
                <TouchableOpacity onPress={()=>goBack()}>
                  <Icon name="angle-left" size={40} color='white' style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100*4}] } />
                </TouchableOpacity>
              }
          
               />
               <ScrollView>
             <View style = {styles.mainContainer}>
             <Text style={styles.textStyle}>Front View </Text>
             <Image source={{uri: 'http://lorempixel.com/100/100/'}} style={styles.imageStyle} />
        <View  style={{flexDirection:"row",backgroundColor:'yellow',padding:10,justifyContent: 'space-evenly',marginTop:5}}>
        <View style={{flexDirection:"row"}}> 
          <Icon name="camera" size={25} color='black' />
        <Text style={{ color: 'black', alignSelf: 'center',paddingLeft:8 }}>Camera </Text>
        </View>
       
        <View style={{width:1,lexDirection:"row",backgroundColor:'black' }}></View>
        <View style={{flexDirection:"row"}}> 
          <Icon name="edit" size={25} color='black'   />
          <Text style={{ color: 'black', alignSelf: 'center',paddingLeft:8 }}>Gallery </Text>
                     </View>
        </View>
             
               </View>

                <Text style={styles.bottomText}>Next</Text>
                </ScrollView>
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
         navIcons: {
          height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
          width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
        },
         textStyle:{ color: "black" ,flex:1,paddingLeft:10},
         bottomText:{color:'white',alignSelf:'center',fontSize:18,marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*2},
         itemStyle:{
             flexDirection:'row',
              borderBottomColor:'black',
              borderBottomWidth:2,
              paddingVertical:Constants.BaseStyle.DEVICE_HEIGHT/100*2,
              alignItems: 'center'
         
        },
         mainContainer:{
           
             padding:Constants.BaseStyle.DEVICE_HEIGHT/100*1,
             height:Constants.BaseStyle.DEVICE_HEIGHT/100*80,
             marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100*6,
          
             backgroundColor:Constants.Colors.White,
             marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*4,
             borderRadius:10
         
         },
         imageStyle: {
           flex:1
          // width: Constants.BaseStyle.DEVICE_WIDTH*30/100,
          // height:Constants.BaseStyle.DEVICE_WIDTH*30/100,
          // borderRadius: Constants.BaseStyle.DEVICE_WIDTH*15/100,
          // borderColor:'yellow',
          // borderWidth:4
          
        },
        textStyle: { color: 'black', alignSelf: 'center',padding:Constants.BaseStyle.DEVICE_HEIGHT/100*2.5,fontSize:20 },

        
       
         
       })
