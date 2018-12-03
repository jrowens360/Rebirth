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
class ChangePassword extends Component {
       constructor(props) {
         super(props);
         this.state = {
           currentPassword:'',
           newPassword: '',
           confirmNewPassword:'',
          
         };
       }
     checkPassword(str){
           var re = /^(?=.\d)(?=.[!@#$%^&])(?=.[a-z])(?=.*[A-Z]).{8,}$/;
          return re.test(str);
      }
      save(){
    
    this.props.UserActions.changePasswordFirebase({ ...this.state });
   }
render() {
      
           const titleConfig = {
             title: 'Change Password',
             tintColor:'white'
           };
           return (
            <Background style={styles.container} src={Constants.Images.user.dashboardbg}  >

             <KeyboardAwareScrollView>
          
            
              <ScrollView keyboardDismissMode='on-drag'>

 <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="angle-left" size={40} color='white' />
            </TouchableOpacity>
            <Text style={styles.headerTxt}> Change Password  </Text>
            <View></View>
          </View>



             <View style = {styles.mainContainer}>
             
            {/* <View> */}
            <TextInput
                   //style={{flex:1}}
                   placeholder="Current Password"
                   keyboardType={'email-address'}
                   autoCapitalize={false}
                   autoCorrect={false}
                   placeholderTextColor='black'
                   underlineColorAndroid={Constants.Colors.Black}
                   secureTextEntry={this.state.secureEntry}
                   onChangeText={(currentPassword) => this.setState({currentPassword})}
            />

            {/* {this.state.currentPassword != '' && <TouchableOpacity
              style={{ position: 'absolute', right: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5, bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1.5 }}
              onPress={() => this.setState({ secureEntry: !this.state.secureEntry, passwordEye: !this.state.passwordEye })}>
              <Image source={this.state.passwordEye ? Constants.Images.user.crossEye : Constants.Images.user.eye} style={[{ width: 20, height: 20 }]} style={styles.eye} resizeMode="contain" />
            </TouchableOpacity>}


            </View>
             */}
         
         <TextInput
                   //style={{flex:1}}
                   placeholder="New Password"
                   keyboardType={'email-address'}
                   autoCapitalize={false}
                   autoCorrect={false}
                   placeholderTextColor='gray'
                   underlineColorAndroid='gray'
                   onChangeText={(newPassword) => this.setState({newPassword})}
                  
            />
           
        
             <TextInput
                   //style={{flex:1}}
                   placeholder="Confirm New Password"
                   keyboardType={'email-address'}
                   autoCapitalize={false}
                   autoCorrect={false}
                   placeholderTextColor='black'
                   secureTextEntry={true}
                   underlineColorAndroid={Constants.Colors.Black}
                   onChangeText={(confirmNewPassword) => this.setState({confirmNewPassword})}
                  
            />
             
              <TouchableOpacity style={styles.buttonStyle} onPress = {()=>this.save()}>
                   <Text style = {styles.savetxt}>Save</Text>
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
          
             paddingTop:Constants.BaseStyle.DEVICE_HEIGHT/100*4,
             height:Constants.BaseStyle.DEVICE_HEIGHT/100*80,
             marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100*6,
             paddingHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100*4,
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
         savetxt:{ color: 'white', alignSelf: 'center', padding: 5 },
         eye: {
          height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
          width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6
        }
       })
// const mapStateToProps = state => ({
//   modalstate: state.ModalHandleReducer,
//   deviceToken: state.user.deviceToken
// });

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(null, mapDispatchToProps)(ChangePassword);
