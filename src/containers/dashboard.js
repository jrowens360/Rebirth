import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, Image, TouchableOpacity
} from 'react-native';


import Constants from '../constants';
import { connect } from 'react-redux';
import Background from '../components/common/BackgroundImg';
import Icon from 'react-native-vector-icons/FontAwesome';

var firebase = require("firebase");

var config = {
  apiKey: "AIzaSyDRAvtiKzJKzM6-5UDreh_lCRcccf8ifVM",
  authDomain: "rebirth-89283.firebaseapp.com",
  databaseURL: "https://rebirth-89283.firebaseio.com",
  projectId: "rebirth-89283",
  storageBucket: "rebirth-89283.appspot.com",
  messagingSenderId: "708324252016"
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userStatus: props.userStatus

    }
  }
  componentDidMount() {
    if (this.state.userStatus) {
      if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }
    }

  }

  onMeasurement() {

    this.props.navigation.navigate("measurements")

  }
  onFront() {

    this.props.navigation.navigate("FrontView")

  }
  onProfile() {
    this.props.navigation.navigate("Profile")

  }

  render() {
    return (

      <Background style={styles.container} src={Constants.Images.user.dashboardbg}  >
        <Image source={Constants.Images.user.splashLogo} style={styles.imageStyle} resizeMode='contain' />
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', }}>
          <Text style={styles.text}>Create Measurement</Text>
          <TouchableOpacity
            onPress={() => this.onFront()}
            style={styles.floatStyle}          >
            <Icon name="plus" size={30} color="black" />
          </TouchableOpacity>

          <View style={styles.subConatiner}>
            <TouchableOpacity
              onPress={() => this.onMeasurement()}
              style={styles.buttonStyle} >
              <Text style={{ color: Constants.Colors.Purple }}>Measurements</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onProfile()}
              style={[styles.buttonStyle, { backgroundColor: Constants.Colors.Purple }]} >
              <Text style={{ color: 'white' }}>Profile</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',

  },

  imageStyle: {
    width: Constants.BaseStyle.DEVICE_WIDTH * 70 / 100,
    height: Constants.BaseStyle.DEVICE_HEIGHT * 18 / 100,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT * 20 / 100,
    alignSelf: 'center',

  },
  floatStyle: {
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT * 3 / 100,
    borderWidth: 1,
    borderColor: Constants.Colors.darkYellow,
    alignItems: 'center',
    justifyContent: 'center',
    width: Constants.BaseStyle.DEVICE_WIDTH * 18 / 100,
    height: Constants.BaseStyle.DEVICE_WIDTH * 18 / 100,
    backgroundColor: Constants.Colors.yellow,
    borderRadius: Constants.BaseStyle.DEVICE_WIDTH * 9 / 100,
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center"
  },
  subConatiner: {
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    alignItems: 'center',
    flexDirection: "row",
    alignItems: "center"

  },

  buttonStyle: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    justifyContent: "center", alignItems: 'center'
  },



});

const mapStateToProps = state => ({
  userStatus: state.user.userStatus,

});

// const mapDispatchToProps = dispatch => ({
//   UserActions: bindActionCreators(UserActions, dispatch)
// });

export default connect(mapStateToProps, null)(Dashboard);

