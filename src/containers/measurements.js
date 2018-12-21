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
import Icon from 'react-native-vector-icons/FontAwesome';
import * as UserActions from '../redux/modules/user';
import Background from '../components/common/BackgroundImg';
import { bindActionCreators } from "redux";

class Measurements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measureHistory: props.measureHistory != null ? props.measureHistory : {}

    };
  }
  componentWillMount() {
    this.props.UserActions.measurementFromFirebase();
console.log(this.state.measureHistory);
  }
  componentWillReceiveProps(props) {

    this.setState({

      measureHistory: props.measureHistory != null ? props.measureHistory : {}


    });


  }
  

  onMeasurement(item) {
    this.props.navigation.navigate("MeasurementDetail", {
      measurementList: item,
    })

  }

 
  render() {

    return (
      <Background style={styles.container} src={Constants.Images.user.dashboardbg}  >

        <KeyboardAwareScrollView>


          <ScrollView keyboardDismissMode='on-drag'>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5, alignItems: 'center' }}>
              <TouchableOpacity style={{ paddingHorizontal: 6 }} onPress={() => this.props.navigation.goBack()}>
                <Icon name="angle-left" size={40} color='white' />
              </TouchableOpacity>
              <Text style={styles.headerTxt}> Measurements  </Text>
              <View></View>
            </View>



            <View style={styles.mainContainer}>

              <View style={{ flexDirection: "row", backgroundColor: Constants.Colors.darkYellow, padding: 14, justifyContent: 'space-evenly', borderRadius: 8 }}>
                <View style={{ flexDirection: "row" }}>
                  <Image source={Constants.Images.user.filter} style={styles.iconStyle} />
                  <Text style={{ fontSize: 17, color: 'black', alignSelf: 'center', paddingLeft: 8, fontWeight: '500' }}>Filter </Text>
                </View>

                <View style={{ width: 1, lexDirection: "row", backgroundColor: 'black' }}></View>
                <View style={{ flexDirection: "row" }}>
                  <Image source={Constants.Images.user.sort} style={styles.iconStyle} />
                  <Text style={{ fontSize: 17, color: 'black', alignSelf: 'center', paddingLeft: 8, fontWeight: '500' }}>Sort By </Text>
                </View>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>

                {

 this.state.measureHistory?<View>{Object.keys(this.state.measureHistory).reverse().map((key, index) => {

  const myItem = this.state.measureHistory[key]

  return (

    <TouchableOpacity onPress={() => this.onMeasurement(myItem)}>
      <View>
        <View style={styles.flatview}>
          <Text style={{ color: 'black', fontWeight: '600' }}>{new Date(parseInt(key)).toLocaleString()}</Text>
          {/* <Text >{Math.round(myItem * 100) / 100}cm</Text> */}
          <Icon name="angle-right" size={25} color='black' />
        </View>
        <View style={{ borderBottomColor: 'gray', borderBottomWidth: 2, marginHorizontal: 10 }}></View>
      </View>
    </TouchableOpacity>
    );
 
})}</View>:<View><Text style={{ color: 'black', fontWeight: '600',textAlign:'center' }}>No Measurement history</Text></View>

                 

                }
              </ScrollView>

            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </Background>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,

  },
  navBar: {
    backgroundColor: "black",
  },
  iconStyle: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
    width: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
  },
  mainContainer: {

    padding: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 80,
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6,

    backgroundColor: Constants.Colors.White,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1,
    borderRadius: 10

  },
  flatview: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between'

  },
  buttonStyle: {
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 25,
    backgroundColor: Constants.Colors.Purple,
    padding: 9,
    width: "42%",
    justifyContent: "center", alignItems: 'center'
  },
  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  },
  headerTxt: { padding: 10, alignSelf: 'center', fontSize: 20, color: 'white' },
  savetxt: { color: 'white', alignSelf: 'center', padding: 5 }
})
const mapStateToProps = state => ({
  measureHistory: state.user.measureHistory== null?{}: state.user.measureHistory,

});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Measurements);
