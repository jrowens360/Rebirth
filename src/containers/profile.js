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
import NavigationBar from 'react-native-navbar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Background from '../components/common/BackgroundImg';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {


    };
  }

  save() {

  }
  render() {


    return (
      <Background style={styles.container} src={Constants.Images.user.dashboardbg}>

 <ScrollView>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="angle-left" size={40} color='white' />
          </TouchableOpacity>
          <Text style={styles.headerTxt}> Profile </Text>
          <View></View>
        </View>


        <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('PersonalDetail')}>
          <View style={styles.itemStyle}>
            <Image source={Constants.Images.user.Personal} style={styles.iconStyle} />

            <Text style={styles.textStyle}>Personal Details</Text>
            <Icon name="angle-right" size={25} color='black' />
          </View>
          </TouchableOpacity>
          <View style={styles.itemStyle}>
            <Image source={Constants.Images.user.Payment} style={styles.iconStyle} />

            <Text style={styles.textStyle}>Payment Methods</Text>
            <Icon name="angle-right" size={25} color='black' />
          </View>
          <TouchableOpacity  onPress={() => this.props.navigation.navigate('ChangePassword')}>
          <View style={styles.itemStyle}>
            <Image source={Constants.Images.user.lock} style={styles.iconStyle} />

            <Text style={styles.textStyle}>Change Password</Text>
            <Icon name="angle-right" size={25} color='black' />
          </View>
          </TouchableOpacity>
          <View style={styles.itemStyle}>
            <Image source={Constants.Images.user.Logout} style={styles.iconStyle} />

            <Text style={styles.textStyle}>Logout</Text>

          </View>



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
  textStyle: { color: "black", flex: 1, paddingLeft: 10 ,fontWeight: '500'},
  itemStyle: {
    flexDirection: 'row',
    borderBottomColor: 'gray',
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
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
    borderRadius: 10

  },
  headerTxt: { padding: 10, alignSelf: 'center', fontSize: 20, color: 'white' },



})
