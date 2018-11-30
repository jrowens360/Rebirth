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
   import { connect } from 'react-redux';
   import NavigationBar from 'react-native-navbar';
   import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
   import Icon from 'react-native-vector-icons/FontAwesome';
   import * as UserActions from '../redux/modules/user';
   import Background from '../components/common/BackgroundImg';
   import { bindActionCreators } from "redux";
class Measurements extends Component {
       constructor(props) {
         super(props);
         this.state = {
         
          
         };
       }
    
      save(){
    
    this.props.UserActions.changePasswordFirebase({ ...this.state });
   }
render() {
      
           return (
            <Background style={styles.container} src={Constants.Images.user.dashboardbg}  >

             <KeyboardAwareScrollView>
          
            
              <ScrollView keyboardDismissMode='on-drag'>

 <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="angle-left" size={40} color='white' />
            </TouchableOpacity>
            <Text style={styles.headerTxt}> Measurements  </Text>
            <View></View>
          </View>



             <View style = {styles.mainContainer}>
             
             <View style={{ flexDirection: "row", backgroundColor: Constants.Colors.darkYellow, padding: 14, justifyContent: 'space-evenly', borderRadius:8}}>
              <View style={{ flexDirection: "row" }}>
                <Icon name="camera" size={22} color='black' />
                <Text style={{ fontSize: 17, color: 'black', alignSelf: 'center', paddingLeft: 8, fontWeight: '500' }}>Filter </Text>
              </View>

              <View style={{ width: 1, lexDirection: "row", backgroundColor: 'black' }}></View>
              <View style={{ flexDirection: "row" }}>
                <Icon name="edit" size={22} color='black' />
                <Text style={{ fontSize: 17, color: 'black', alignSelf: 'center', paddingLeft: 8, fontWeight: '500' }}>Sort By </Text>
              </View>
            </View>


           
              <TouchableOpacity style={styles.buttonStyle} onPress = {()=>this.save()}>
                   <Text style = {styles.savetxt}>+ Add New</Text>
               </TouchableOpacity>
             
               </View>
               </ScrollView>
              </KeyboardAwareScrollView>
             </Background>
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
          
             padding:Constants.BaseStyle.DEVICE_HEIGHT/100*1,
             height:Constants.BaseStyle.DEVICE_HEIGHT/100*80,
             marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100*6,
            
             backgroundColor:Constants.Colors.White,
             marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*4,
             borderRadius:10
         
         },
        
       
         buttonStyle:{
            marginTop:15,
            alignSelf: 'center',
            borderRadius: 25,
            backgroundColor: Constants.Colors.Purple,
            padding:9,
            width: "42%",
            justifyContent: "center", alignItems: 'center'
          },
          navIcons: {
            height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
            width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
          },
          headerTxt: { padding: 10, alignSelf: 'center', fontSize: 20, color: 'white' },
         savetxt:{ color: 'white', alignSelf: 'center', padding: 5 }
       })
// const mapStateToProps = state => ({
//   modalstate: state.ModalHandleReducer,
//   deviceToken: state.user.deviceToken
// });

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(null, mapDispatchToProps)(Measurements);
