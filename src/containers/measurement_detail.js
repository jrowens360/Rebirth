import React, { Component } from 'react';
import { Text,
   View,
   Dimensions,
   StyleSheet,
   TouchableOpacity,
   TextInput,
   ScrollView,
   FlatList,
   Image,
  } from 'react-native';
   import Constants from '../constants';
   import NavigationBar from 'react-native-navbar';
   import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
   import Icon from 'react-native-vector-icons/FontAwesome';
   export default class MeasurementDetail extends Component {
       constructor(props) {
         super(props);
         this.state = {
            bodyparms: [
                {
                    "parameter": "Chest",
                    "size":'30'
                },
                {
                    "parameter": "Waist",
                    "size": '20'
                },
               
               
            ]
         
          
         };
       }
  
render() {
      
           const titleConfig = {
             title: 'Measurement Detail',
             tintColor:'white'
           };
           return (
             <View style={styles.container}>
             
            <NavigationBar style = {styles.navBar}
             title={titleConfig}
             rightButton={
                <TouchableOpacity onPress={()=>goBack()}>
                  <Icon name="angle-left" size={40} color='white' style={[styles.navIcons,{marginRight:Constants.BaseStyle.DEVICE_WIDTH/100 * 4}]} />
                </TouchableOpacity>
              }
             leftButton={
                <TouchableOpacity onPress={()=>goBack()}>
                  <Icon name="angle-right" size={40} color='white' style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 4}]} />
                </TouchableOpacity>
              }


               />
           
             <View style = {styles.mainContainer}>
             
             <FlatList
                      keyExtractor={item => item.parameter}
                    data={this.state.bodyparms}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) =>
                    <View>
                    <View style={styles.flatview}>
                       <Text >{item.parameter}</Text>
                        <Text >{item.size}</Text>
                      

                    </View>
                      <View style={{borderBottomColor:'gray',borderBottomWidth:2}}></View>
                      </View>
                    }
                   
        />
        
           
        
            
             
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
         mainContainer:{
          
             paddingTop:Constants.BaseStyle.DEVICE_HEIGHT/100*4,
             height:Constants.BaseStyle.DEVICE_HEIGHT/100*80,
             marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100*6,
             paddingHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100*4,
             backgroundColor:Constants.Colors.White,
             marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*4,
             borderRadius:10
         
         },
         flatview:{
            flexDirection:'row',
            padding:15,
            alignItems:'center',
            justifyContent:'space-between'
            
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
          navIcons: {
            height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
            width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
          },
         
       })
