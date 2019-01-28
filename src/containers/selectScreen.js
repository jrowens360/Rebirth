import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, Image, TextInput, TouchableOpacity, Modal

} from 'react-native';

import Constants from '../constants';

import _ from "lodash";
import { bindActionCreators } from "redux";
import * as UserActions from '../redux/modules/user';
import { connect } from 'react-redux';
import { ToastActionsCreators } from 'react-native-redux-toast';
import Icon from 'react-native-vector-icons/FontAwesome';

class SelectScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      maleSelect: false,
      femaleSelect: false,
      gender: '',
      height: '',
      // frontImg: props.frontImage,
      // sideImg: props.sideImage,
      // apiKey: 'APIKey 35ce6ef2466f0330482bc753ea456777715011c3',
      // frontKey: props.frontKey,
      feet: '',
      inch: ''
    };
  }


  onMale() {

    this.setState({
      maleSelect: true,
      femaleSelect: false,

    }, () => {
      if (this.state.maleSelect) {
        this.setState({
          gender: 'male'
        })
      }
      else {
        this.setState({
          gender: 'female'
        })
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


  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  async submit() {

    let { dispatch } = this.props.navigation;
    let { feet, inch } = this.state;
    // //let { navigate } = this.props.navigation;


    if (_.isEmpty(feet.trim())) {

      dispatch(ToastActionsCreators.displayInfo('Please select feet'))
      return;
    }
    if (_.isEmpty(inch.trim())) {
      //alert(enterMobile);
      dispatch(ToastActionsCreators.displayInfo('Please enter your inch'))
      return;
    }


    var ft = feet * 30.48
    var inc = inch * 2.54
    var h = await (ft + inc).toFixed()
    this.setState({ height: h })

    this.setModalVisible(!this.state.modalVisible);
  }

  onContinue() {
    let { dispatch } = this.props.navigation;
    let { gender, height } = this.state;

    if (_.isEmpty(gender.trim())) {

      dispatch(ToastActionsCreators.displayInfo('Please select your gender'))
      return;
    }
    if (_.isEmpty(height.trim())) {

      dispatch(ToastActionsCreators.displayInfo('Please enter your height'))
      return;
    }


    this.props.navigation.navigate("Payment", { userGender: gender, userHeight: height })
    // this.props.UserActions.ImageParameter({ ...this.state }, (key) => {
    //   this.setState({ frontKey: key }, () => {

    //     this.props.UserActions.ImageSideParameter({ ...this.state }, () => {

    //       this.props.UserActions.CompleteParameter({ ...this.state }, () => {

    //         this.props.UserActions.addMeasurementFirebase(this.props.maesureData);

    //       })


    //     });

    //   });



    // });


  }

onModal(){
  this.setState({ modalVisible: true });
}
  render() {
    return (
      <View style={styles.container} >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5, alignItems: 'center' }}>
          <TouchableOpacity style={{ paddingHorizontal: 6 }} onPress={() => this.props.navigation.goBack()}>
            <Icon name="angle-left" size={40} color='white' />
          </TouchableOpacity >
          <Text style={styles.headerTxt}>Gender/Height Selections </Text>
          <View style={{width:30}}></View>

        </View>
        {/* <ScrollView> */}
        <View style={styles.maincontainer}>


          <Text style={{ color: "white", textAlign: "center", fontSize: 15, marginTop: Constants.BaseStyle.DEVICE_WIDTH * 10 / 100 }}>Are you Male or Female ?</Text>
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
          <Text style={{ color: "white", textAlign: "center", fontSize: 15, marginTop: 10 }}>What is your Height?</Text>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
            <View style={{
              flex: 1,
              // alignItems: 'center',
              marginBottom: 20,
              justifyContent: 'center'
            }}>
              <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 10, marginHorizontal: 20 }} >
                <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 20 }}> Enter Height</Text>
                <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}> Please enter height in feet</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <TextInput
                    maxLength={1}
                    autoFocus={false}
                    autoCorrect={false}
                    value={this.state.feet}
                    style={styles.textInputStyle}
                    placeholder='feet'
                    placeholderTextColor={'gray'}
                    underlineColorAndroid={"gray"}
                    keyboardType='phone-pad'
                    onChangeText={(feet) => {
                      
                      this.setState({ feet },()=>{
                        if(!_.isEmpty(feet.trim())){
                          this.secondTextInput.focus();
                        }
                       
                      })}}
                    returnKeyType={"next"}
                   // onSubmitEditing={() => { this.secondTextInput.focus(); }}


                  />
                  <TextInput
                    ref={(input) => { this.secondTextInput = input; }}
                    maxLength={2}
                    autoFocus={false}
                    autoCorrect={false}
                    value={this.state.inch}
                    style={[styles.textInputStyle, { marginLeft: 10 }]}
                    placeholder='Inches'
                    placeholderTextColor={'gray'}
                    underlineColorAndroid={"gray"}
                    keyboardType='phone-pad'
                    onChangeText={(inch) => this.setState({ inch })}
                  />

                </View>
                <View style={{ backgroundColor: Constants.Colors.Purple, height: 2, width: '100%', marginTop: 5 }}></View>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={{ flex: 1, padding: 5 }}
                    onPress={() => {
                      this.setState({ modalVisible: false });
                    }}>
                    <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}> Cancel</Text>
                  </TouchableOpacity>
                  <View style={{ backgroundColor: Constants.Colors.Purple, height: '100%', width: 2 }}></View>
                  <TouchableOpacity
                    style={{ flex: 1, padding: 5 }}
                    onPress={() => {
                      this.submit();

                    }}>
                    <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}> Submit</Text>
                  </TouchableOpacity>
                </View>


              </View>
            </View>
          </Modal>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}
          >
           <TouchableOpacity onPress={() => this.onModal()}>
              {/* <TextInput

                autoFocus={false}
                autoCorrect={false}
                editable={false}
                value={this.state.height ? this.state.feet + "  feet  " + this.state.inch + " inchs" : "Enter height"}
                style={[styles.textInputStyle, { color: 'white' }]}
                placeholder='Enter height'
                placeholderTextColor={'gray'}
                underlineColorAndroid={"white"}
                onChangeText={(height) => this.setState({ height })}


              /> */}
               <Text style={{ color: 'white', fontWeight: '500',  padding: 10,
                       marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2}}>{this.state.height ? this.state.feet + "  feet  " + this.state.inch + " inchs" : "Enter height"}</Text>
            </TouchableOpacity>
          </View>


          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }} >
            <TouchableOpacity onPress={() => this.onContinue()} style={{
              marginTop: 15, alignItems: 'center', color: 'white',
              backgroundColor: "white", paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20
            }}    >
              <Text style={{ color: Constants.Colors.Purple, fontWeight: '500' }}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* </ScrollView> */}


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal:Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    backgroundColor: Constants.Colors.Purple,


  },
  maincontainer: {
    // flex: 1,
    // paddingHorizontal:Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    backgroundColor: Constants.Colors.Purple,
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
    borderColor: 'white',
    borderWidth: 3

  },
  defaultImageStyle: {
    width: Constants.BaseStyle.DEVICE_WIDTH * 26 / 100,
    height: Constants.BaseStyle.DEVICE_WIDTH * 26 / 100,
    borderRadius: Constants.BaseStyle.DEVICE_WIDTH * 13 / 100,
    borderColor: 'black',
    borderWidth: 3

  },
  profileRow: {
    marginTop: "20%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

  },
  textInputStyle: {
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black',
    padding: 10,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    flexWrap: 'wrap'

  },

  headerTxt: { padding: 10, alignSelf: 'center', fontSize: 20, color: 'white' },
});
// const mapStateToProps = state => ({
//   frontImage: state.user.frontImage,
//   sideImage: state.user.sideImage,
//   frontKey: state.user.frontKey,
//   maesureData: state.user.bodyParameters,

// });

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(null, mapDispatchToProps)(SelectScreen);

