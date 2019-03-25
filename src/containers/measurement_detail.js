import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView

} from 'react-native';
import Constants from '../constants';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import Icon from 'react-native-vector-icons/FontAwesome';
import * as UserActions from '../redux/modules/user';
import Background from '../components/common/BackgroundImg';

class MeasurementDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyParameters: '',
    };

  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    const item = params ? params.measurementList : false;
    if (item) {
      this.setState({
        bodyParameters: item.measureList
      });
    } else {
      this.setState({
        bodyParameters: this.props.bodyParameters

      });
    }
  }

  dashBoard() {

    let { dispatch } = this.props.navigation;
    dispatch({ type: "ResetNavigator" });

  }

  render() {

    return (
      <Background style={styles.container} src={Constants.Images.user.dashboardbg}>
        <ScrollView>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5, alignItems: 'center' }}>
            <TouchableOpacity style={{ paddingHorizontal: 6 }} onPress={() => this.props.navigation.goBack()}>
              <Icon name="angle-left" size={40} color='white' />
            </TouchableOpacity >
            <Text style={styles.headerTxt}> Measurement Detail </Text>
           
            <View style={{width:30}}></View>
          </View>

          <View style={styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>

            {Object.keys(this.state.bodyParameters.front_parameters).map((key, index) => {
                var value = '';
                const myItem = this.state.bodyParameters.front_parameters[key]
                if (typeof (myItem) != 'object') {
                  value = myItem / 2.54
                }
               
            
             
                if (key == "shoulders") {
                  return (<View>
                    <View style={styles.flatview}>
                      <Text >{'Shoulder'}</Text>
                      <Text style={styles.paramTxt}>{Math.round(value * 100) / 100} <Text style={styles.paramTxt}>{' in'}</Text></Text>
                    </View>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 2 }}></View>
                  </View>);
                }
    if (key == "nape_to_waist_centre_back") {
                  return (<View>
                    <View style={styles.flatview}>
                      <Text >{'Nape to Waist'}</Text>
                      <Text style={styles.paramTxt}>{Math.round(value * 100) / 100} <Text style={styles.paramTxt}>{' in'}</Text></Text>
                    </View>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 2 }}></View>
                  </View>);
                }






              })
              }

              {Object.keys(this.state.bodyParameters.volume_parameters).map((key, index) => {
                var volumevalue = '';
                const myVolumeItem = this.state.bodyParameters.volume_parameters[key]
                if (typeof (myVolumeItem) != 'object') {
                  volumevalue = myVolumeItem / 2.54
                }
                if (key == "chest") {
                  return (<View>
                    <View style={styles.flatview}>
                      <Text >{'Chest'}</Text>
                      <Text style={styles.paramTxt}>{Math.round(volumevalue * 100) / 100} <Text style={styles.paramTxt} >{' in'}</Text></Text>
                    </View>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 2 }}></View>
                  </View>);
                }
                if (key == "waist") {
                  return (<View>
                    <View style={styles.flatview}>
                      <Text >{'Waist'}</Text>
                      <Text style={styles.paramTxt}>{Math.round(volumevalue * 100) / 100} <Text style={styles.paramTxt}>{' in'}</Text></Text>
                    </View>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 2 }}></View>
                  </View>);
                }


                if (key == "hips") {
                  return (<View>
                    <View style={styles.flatview}>
                      <Text >{'Abdomen'}</Text>
                      <Text style={styles.paramTxt}>{Math.round(volumevalue * 100) / 100} <Text style={styles.paramTxt}>{' in'}</Text></Text>
                    </View>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 2 }}></View>
                  </View>);
                }

                if (key == "low_hips") {
                  return (<View>
                    <View style={styles.flatview}>
                      <Text >{'Low Hips'}</Text>
                      <Text style={styles.paramTxt}>{Math.round(volumevalue * 100) / 100} <Text style={styles.paramTxt}>{' in'}</Text></Text>
                    </View>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 2 }}></View>
                  </View>);
                }
// if(key == "test_data"){

 
  
// }

                // if (key["LEGS_HIGH_M0_MOD_L"] == "LEGS_HIGH_M0_MOD_L") {
                //   return (<View>
                //     <View style={styles.flatview}>
                //       <Text >{'Thigh'}</Text>
                //       <Text style={styles.paramTxt}>{Math.round(volumevalue * 100) / 100} <Text style={styles.paramTxt} >{' in'}</Text></Text>
                //     </View>
                //     <View style={{ borderBottomColor: 'gray', borderBottomWidth: 2 }}></View>
                //   </View>);
                // }
                // if (key.KNEES_J_MOD_L == "KNEES_J_MOD_L") {
                //   return (<View>
                //     <View style={styles.flatview}>
                //       <Text >{'Knee'}</Text>
                //       <Text style={styles.paramTxt}>{Math.round(volumevalue * 100) / 100} <Text style={styles.paramTxt}>{' in'}</Text></Text>
                //     </View>
                //     <View style={{ borderBottomColor: 'gray', borderBottomWidth: 2 }}></View>
                //   </View>);
                // }
                // if (key == "hips") {
                //   return (<View>
                //     <View style={styles.flatview}>
                //       <Text >{'Abdomen'}</Text>
                //       <Text style={styles.paramTxt}>{Math.round(volumevalue * 100) / 100} <Text style={styles.paramTxt}>{' inch'}</Text></Text>
                //     </View>
                //     <View style={{ borderBottomColor: 'gray', borderBottomWidth: 2 }}></View>
                //   </View>);
                // }
               

              })
              }
 {Object.keys(this.state.bodyParameters.volume_parameters.test_data).map((tkey, index) => {
    var testValue = '';
    const mytestItem =this.state.bodyParameters.volume_parameters.test_data[tkey]
    if (typeof (mytestItem) != 'object') {
      testvalue = mytestItem / 2.54
    }

    if(tkey =="LEGS_HIGH_M0_MOD_L") {
      return (<View>
        <View style={styles.flatview}>
          <Text >{'Thigh'}</Text>
          <Text style={styles.paramTxt}>{Math.round(testvalue * 100) / 100} <Text style={styles.paramTxt} >{' in'}</Text></Text>
        </View>
        <View style={{ borderBottomColor: 'gray', borderBottomWidth: 2 }}></View>
      </View>);
    }
    if(tkey =="KNEES_J_MOD_L")  {
      return (<View>
        <View style={styles.flatview}>
          <Text >{'Knee'}</Text>
          <Text style={styles.paramTxt}>{Math.round(testvalue * 100) / 100} <Text style={styles.paramTxt}>{' in'}</Text></Text>
        </View>
        <View style={{ borderBottomColor: 'gray', borderBottomWidth: 2 }}></View>
      </View>);
    }
  
  })
  }
              
              {Object.keys(this.state.bodyParameters.side_parameters).map((key, index) => {
                var sidevalue = '';
                const mySideItem = this.state.bodyParameters.side_parameters[key]
                if (typeof (mySideItem) != 'object') {
                  sidevalue = mySideItem / 2.54
                }
             

                // if (key == "hips") {
                //   return (<View>
                //     <View style={styles.flatview}>
                //       <Text >{'Side hips width'}</Text>
                //       <Text style={styles.paramTxt}>{Math.round(sidevalue * 100) / 100} <Text style={styles.paramTxt}>{' inch'}</Text></Text>
                //     </View>
                //     <View style={{ borderBottomColor: 'gray', borderBottomWidth: 2 }}></View>
                //   </View>);
                // }
                // if (key == "nape_to_waist_over_bust") {
                //   return (<View>
                //     <View style={styles.flatview}>
                //       <Text >{'Nape to Waist'}</Text>
                //       <Text style={styles.paramTxt}>{Math.round(sidevalue * 100) / 100} <Text style={styles.paramTxt}>{' in'}</Text></Text>
                //     </View>
                //     <View style={{ borderBottomColor: 'gray', borderBottomWidth: 2 }}></View>
                //   </View>);
                // }


              })
              }
            </ScrollView>

          </View>
         
              <TouchableOpacity style={styles.donebtnStyle} onPress={() => this.dashBoard()}>
                <Text style={{color: Constants.Colors.Purple,fontWeight: '500'}} > Done</Text>
              </TouchableOpacity >

           
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
  navBar: {
    backgroundColor: "black",
  },
  mainContainer: {

    paddingTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 80,
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6,
    paddingHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
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
  donebtnStyle: {
    color: 'white',
    marginVertical: 8,
    alignSelf: 'center',
    borderRadius: 20,
    textAlign: 'center',
    backgroundColor:'white',
    paddingVertical: 10,
    paddingHorizontal: 22,
    // width: "45%",
    justifyContent: "center", alignItems: 'center'
  },

  buttonStyle: {
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: "#3474cc",
    padding: 10,
    width: "40%",
    justifyContent: "center", alignItems: 'center'
  },
  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  },
  headerTxt: { padding: 5, alignSelf: 'center', fontSize: 20, color: 'white' },
  paramTxt: { color: 'black', fontWeight: '500' },

})




const mapStateToProps = state => (
  {
    bodyParameters: state.user.bodyParameters,

  });

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementDetail);

