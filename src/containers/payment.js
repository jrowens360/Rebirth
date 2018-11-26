import React, { Component } from 'react';
import { Text,
   View,
   Dimensions,
   StyleSheet,
   TouchableOpacity,
   TextInput,
   ScrollView,
   Image,
   FlatList
  } from 'react-native';
   import Constants from '../constants';
   import NavigationBar from 'react-native-navbar';
   import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
   import Icon from 'react-native-vector-icons/FontAwesome';
   export default class Payment extends Component {
       constructor(props) {
         super(props);
         this.state = {
             cardForm: false,
         cards: [
            {
                "card": "672357852850",
                "image":'http://lorempixel.com/100/100/'
            },
            {
                "card": "672357852850",
                "image": 'http://lorempixel.com/100/100/'
            },
           
           
        ]
          
         };
       }
   
       addCardForm(){
          // alert("ggggg");
this.setState({

    cardForm:!this.state.cardForm
});


       }
    
   
render() {
      
           const titleConfig = {
             title: 'Payment',
             tintColor:'white'
             
           };
           return (
             <View style={styles.container}>
             <KeyboardAwareScrollView>
            <NavigationBar style = {styles.navBar}
             title={titleConfig}
             rightButton={
                <TouchableOpacity onPress={()=>goBack()}>
                  <Icon name="angle-left" size={40} color='white' style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} />
                </TouchableOpacity>
              }
             leftButton={
                <TouchableOpacity onPress={()=>goBack()}>
                  <Icon name="angle-right" size={40} color='white' style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} />
                </TouchableOpacity>
              }


               />
              <ScrollView keyboardDismissMode='on-drag'>
             <View style = {styles.mainContainer}>
             <View style = {{height:Constants.BaseStyle.DEVICE_HEIGHT/100*15,paddingHorizontal:15,
                 borderRadius:10,flexDirection:'row',justifyContent:'space-between',backgroundColor:'yellow',alignItems:'center'}}>
             <Text style={{color: 'red'}}> Payment Amount
                </Text> 
                <Text style={{color: 'red',textAlign:'right',fontSize:50}}> 
                
                <Text style={{fontSize:25}} > {'\u0024'} </Text>
                9.99
                </Text> 

             </View>
             
             <Text style={{color: 'black',fontSize:20,marginTop:Constants.BaseStyle.DEVICE_WIDTH/100*4,}}> Saved Cards </Text> 
         
             <FlatList
             style={styles.flatlist}
                    data={this.state.cards}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) =>
                    <View style={styles.flatview}>
                        <Image source={{uri: item.image}} style={{height:35,width:40}}></Image>
                        <Text style={{paddingLeft:10}}>{item.card}</Text>
                    </View>
                    }
                    keyExtractor={item => item.email}
        />
        
        {this.state.cardForm? this.cardFormView():null}
       
             
              <TouchableOpacity style={styles.buttonStyle} onPress = {()=>this.save()}>
                   <Text style = {styles.signInText}>Complete payment</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress = {()=>this.addCardForm()}>
                   <Text style = {{textAlign:'center',fontSize:20 ,padding:10}}>Add  Card +</Text>
               </TouchableOpacity>
             
               </View>
               </ScrollView>
              </KeyboardAwareScrollView>
             </View>
           );
         }
         cardFormView(){
            return(
                <View>
                <TextInput
                style={styles.textInputStyle}
                placeholder='Card Number'
                placeholderTextColor={Constants.Colors.Blue}
                underlineColorAndroid={Constants.Colors.Black}
              /> 
               <View  style={{flexDirection:'row'}}>
               <TextInput
                style={{flex:1,padding:10}}
                placeholder='Exp Date'
                placeholderTextColor={Constants.Colors.Blue}
                underlineColorAndroid={Constants.Colors.Black}
              /> 
               <TextInput
                style={{flex:1,padding:10,marginLeft:10}}
                placeholder='CVV'
                placeholderTextColor={Constants.Colors.Blue}
                underlineColorAndroid={Constants.Colors.Black}
              /> 
               
              
              </View>
              <TextInput
                style={styles.textInputStyle}
                placeholder='Name of Card'
                placeholderTextColor={Constants.Colors.Blue}
                underlineColorAndroid={Constants.Colors.Black}
              /> 
        
        
                </View>
    
            )
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
         imageStyle: {
            width: Constants.BaseStyle.DEVICE_WIDTH*30/2,
            height:Constants.BaseStyle.DEVICE_WIDTH*30/2,
           
            
          },
          flatlist: {
         
          flexGrow: 0
           
          },
         flatview:{
           flexDirection:'row',
           padding:5,
           alignItems:'center'
           
          },
         mainContainer:{
          
            
             height:Constants.BaseStyle.DEVICE_HEIGHT/100*80,
             marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100*6,
             padding:Constants.BaseStyle.DEVICE_WIDTH/100*2,
             backgroundColor:Constants.Colors.White,
             marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*4,
             borderRadius:10
         
         },
        
       
         buttonStyle:{
             color:'white',
            marginTop:15,
            alignSelf: 'center',
            borderRadius: 20,
            backgroundColor: "#3474cc",
            padding:12,
            width: "45%",
            justifyContent: "center", alignItems: 'center'
          },
          navIcons: {
            height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
            width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
          },
         
       })
