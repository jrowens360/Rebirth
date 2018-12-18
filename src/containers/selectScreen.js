import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, Image, TextInput, TouchableOpacity, ScrollView

} from 'react-native';

import Constants from '../constants';
import Background from '../components/common/BackgroundImg';
import _ from "lodash";
import { bindActionCreators } from "redux";
import * as UserActions from '../redux/modules/user';
import { connect } from 'react-redux';
import { ToastActionsCreators } from 'react-native-redux-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from "moment";



class SelectScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

      maleSelect: false,
      femaleSelect: false,
      gender: '',
      height: '',
      frontImg: props.frontImage,
      sideImg: props.sideImage,
      apiKey: 'APIKey 35ce6ef2466f0330482bc753ea456777715011c3',
      frontKey: props.frontKey


    };
  }


  onMale() {
    //  this.props.navigation.navigate("signup")
    this.setState({
      maleSelect: true,
      femaleSelect: false,

    }, () => {
      if (this.state.maleSelect) {
        this.setState({
          gender: 'male'
        })

        console.log("male select");
      }
      else {
        this.setState({
          gender: 'female'
        })

        console.log("female select");
      }


    });



  }

  onFemale() {
    this.setState({
      maleSelect: false,
      femaleSelect: true,
    }, () => {
      if (this.state.femaleSelect) {
        this.setState({
          gender: 'female'
        })
      }
      else {
        this.setState({
          gender: 'male'
        })

      }


    });

    // this.props.navigation.navigate("SignIn")

  }

  onContinue() {
    let { dispatch } = this.props.navigation;
     let {gender,height} = this.state;
    // //let { navigate } = this.props.navigation;


    if (_.isEmpty(gender.trim())) {

        dispatch(ToastActionsCreators.displayInfo('Please select your gender'))
        return;
      }
      if (_.isEmpty(height.trim())) {
        //alert(enterMobile);
        dispatch(ToastActionsCreators.displayInfo('Please enter your height'))
        return;
      }



    this.props.UserActions.ImageParameter({ ...this.state }, (key) => {
      this.setState({   frontKey:key  },()=>{

        this.props.UserActions.ImageSideParameter({ ...this.state },()=>{

          this.props.UserActions.CompleteParameter({ ...this.state })

        });

      });

   

    });
    // this.props.UserActions.CompleteParameter({ ...this.state });

  }


  render() {
    return (
      <Background style={styles.container} src={Constants.Images.user.dashboardbg}>
        {/* <View style={{flex:1,flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5, }}>
          <TouchableOpacity  style={{paddingHorizontal:6}}onPress={() => this.props.navigation.goBack()}>
            <Icon name="angle-left" size={30} color='white' />
          </TouchableOpacity >
          <Text style={styles.headerTxt}>Select</Text>
          <View></View>
        </View> */}
        {/* <View style={styles.container}> */}
        <Text style={{ color: "white", textAlign: "center", fontSize: 15 }}>Are you Male or Female ?</Text>
        <View style={styles.profileRow}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => this.onMale()}>
              <Image source={Constants.Images.user.male} style={this.state.maleSelect ? styles.imageStyle : styles.defaultImageStyle} />

            </TouchableOpacity>
            <Text style={{ color: "white", fontWeight: "bold" }}>Male</Text>
          </View>

          <View style={{ marginLeft: 20, alignItems: 'center', justifyContent: 'center' }}>

            <TouchableOpacity onPress={() => this.onFemale()}>
              <Image source={Constants.Images.user.female} style={this.state.femaleSelect ? styles.imageStyle : styles.defaultImageStyle} />

            </TouchableOpacity>
            <Text style={{ color: "white", fontWeight: "bold" }}>Female </Text>

          </View>



        </View>
        <Text style={{ color: "white", textAlign: "center", fontSize: 15 }}>Please mention your height :</Text>


        <TextInput
         maxLength={3}
          autoFocus={false}
          autoCorrect={false}
          // onBlur={ () => this._onBlur() }
          // onFocus={ () => this._onFocus() }
          style={styles.textInputStyle}
          placeholder='Height(cm)'
          placeholderTextColor={'gray'}
          underlineColorAndroid={"white"}
          onChangeText={(height) => this.setState({ height })}


        />




        <TouchableOpacity onPress={() => this.onContinue()} style={{
          marginTop: 20, alignItems: 'center', color: 'white',
          backgroundColor: "white", paddingVertical: 10, paddingHorizontal: 12, borderRadius: 20
        }}    >
          <Text style={{ color: Constants.Colors.Purple, padding: 3 }}>Continue</Text>
        </TouchableOpacity>



        {/* </View> */}
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal:Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    //backgroundColor: Constants.Colors.Purple,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10

  },
  headerTxt: {
    padding: 10,
    alignSelf: 'center',
    fontSize: 20,
    color: 'white',
    borderWidth: 2, borderColor: "red"
  },
  textStyle: {
    color: 'white',
    fontSize: 22,
    textAlign: "center",

  },
  imageStyle: {
    width: Constants.BaseStyle.DEVICE_WIDTH * 26 / 100,
    height: Constants.BaseStyle.DEVICE_WIDTH * 26 / 100,
    borderRadius: Constants.BaseStyle.DEVICE_WIDTH * 13 / 100,
    borderColor: Constants.Colors.Purple,
    borderWidth: 3

  },
  defaultImageStyle: {
    width: Constants.BaseStyle.DEVICE_WIDTH * 26 / 100,
    height: Constants.BaseStyle.DEVICE_WIDTH * 26 / 100,
    borderRadius: Constants.BaseStyle.DEVICE_WIDTH * 13 / 100,
    borderColor: 'white',
    borderWidth: 3

  },
  profileRow: {
    marginTop: "30%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"

  },
  textInputStyle: {
    textAlign:'center',
    alignSelf:'center',
    color: 'white',
    padding: 10,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    flexWrap: 'wrap'
   // marginHorizontal: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 20,



  },
  bottomConatiner: {
    flex: 1,
    marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 20,
    position: 'absolute', bottom: 0,
    alignItems: 'center',
    justifyContent: "center",
    //height:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 40,
  },
  subConatiner: {
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    alignItems: 'center',
    flexDirection: "row",
    alignItems: "center"

  },
});
const mapStateToProps = state => ({
  frontImage: state.user.frontImage,
  sideImage: state.user.sideImage,
  frontKey: state.user.frontKey,

});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectScreen);

