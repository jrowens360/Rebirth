import React, { Component } from 'react';
import {
  Text,
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { ToastActionsCreators } from 'react-native-redux-toast';
import Background from '../components/common/BackgroundImg';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as UserActions from '../redux/modules/user';
import { bindActionCreators } from "redux";
var firebase = require("firebase");

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {


    };
  }




  save() {

  }
  logout() {
    this.props.UserActions.logoutFirebase();


  }
  render() {


    return (
      <Background style={styles.container} src={Constants.Images.user.dashboardbg}>

        <ScrollView>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5, alignItems: 'center' }}>
            <TouchableOpacity style={{ paddingHorizontal: 6 }} onPress={() => this.props.navigation.goBack()}>
              <Icon name="angle-left" size={40} color='white' />
            </TouchableOpacity >
            <Text style={styles.headerTxt}> Profile </Text>
            <View></View>
          </View>


          <View style={styles.mainContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("PersonalDetail")} >
              <View style={styles.itemStyle}>
                <Image source={Constants.Images.user.Personal} style={styles.iconStyle} />


                <Text style={styles.textStyle}>Personal Details</Text>

                <Icon name="angle-right" size={25} color='black' />

              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("paymentMethod")}  >
              <View style={styles.itemStyle}>
                <Image source={Constants.Images.user.Payment} style={styles.iconStyle} />

                <Text style={styles.textStyle}>Payment Methods</Text>

                <Icon name="angle-right" size={25} color='black' />


              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("ChangePassword")}>
            <View style={styles.itemStyle}>
              <Image source={Constants.Images.user.lock} style={styles.iconStyle} />

              <Text style={styles.textStyle}>Change Password</Text>
             
                <Icon name="angle-right" size={25} color='black' />

              
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.logout()}>
            <View style={styles.itemStyle}>
              <Image source={Constants.Images.user.Logout} style={styles.iconStyle} />
            
                <Text style={styles.textStyle}>Logout</Text>


              
            </View>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </Background>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,

  },
  signUpTxt: { padding: 10, alignSelf: 'center', fontSize: 20, color: 'white' },
  navBar: {
    backgroundColor: 'black',
  },
  iconStyle: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
    width: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
  },
  textStyle: { color: "black", flex: 1, paddingLeft: 10, fontWeight: '500' },
  itemStyle: {
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    paddingVertical: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2.5,
    alignItems: 'center'

  },
  mainContainer: {

    paddingTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 80,
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6,
    paddingHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    backgroundColor: Constants.Colors.White,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1,
    borderRadius: 10

  },
  headerTxt: { padding: 10, alignSelf: 'center', fontSize: 20, color: 'white' },



})

// const mapStateToProps = state => ({

//   userStatus: state.user.userStatus
// });

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(null, mapDispatchToProps)(Profile);

