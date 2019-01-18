import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image, Modal
} from 'react-native';
import Constants from '../constants';
import { connect } from 'react-redux';
import NavigationBar from 'react-native-navbar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as UserActions from '../redux/modules/user';
import Background from '../components/common/BackgroundImg';
import { bindActionCreators } from "redux";
import moment from 'moment';

class Measurements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortValue: true,
      measureObj: {},
      modalVisible: false,
      modalfilterVisible: false,
      measureHistory: props.measureHistory != null ? props.measureHistory : {}

    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  setModalFilter(visible) {
    this.setState({ modalfilterVisible: visible });
  }
  filterBy() {
    // alert(!this.state.modalVisible)
    this.setModalFilter(!this.state.modalVisible)
  }
  sortBy() {
    this.setModalVisible(!this.state.modalVisible)
  }

  sortModal(value) {
    this.setModalVisible(!this.state.modalVisible);
    switch (value) {

      case 'ascending':
        this.setState({ sortValue: true })

        break;
      case 'descending':
        this.setState({ sortValue: false })

        break;

    }

  }
  filterModal(value) {
    this.setModalFilter(!this.state.modalfilterVisible);
    for (const prop of Object.getOwnPropertyNames(this.state.measureObj)) {
      delete this.state.measureObj[prop];
    }

    switch (value) {

      case 'alldata':
     
        console.log("all", this.state.measureObj)

        break;
      case 'yesterday':

        var dateTo = moment().subtract(1, 'd');
        //  console.log("my time",dateFrom);
        //  console.log("my time stemp time",dateTo, Math.floor(Date.now()).toString(), Math.floor(dateFrom).toString(), Math.floor(dateTo).toString());
        //   console.log(this.props.measureHistory);
        var fil = Object.entries(this.state.measureHistory).filter((key) => {
          if (key[0] > Math.floor(dateTo).toString()) {
            console.log("my key", key[0], "my value", key[1])
            this.state.measureObj[key[0]] = key[1];
            return true;

          } else {
            return false;
          }

        })
        console.log("day", this.state.measureObj)
        break;
      case 'lastmonth':
        var dateTo = moment().subtract(30, 'd');
        //  console.log("my time",dateFrom);
        //  console.log("my time stemp time",dateTo, Math.floor(Date.now()).toString(), Math.floor(dateFrom).toString(), Math.floor(dateTo).toString());
        //   console.log(this.props.measureHistory);
        var fil = Object.entries(this.state.measureHistory).filter((key) => {
          if (key[0] > Math.floor(dateTo).toString()) {
            console.log("my key", key[0], "my value", key[1])
            this.state.measureObj[key[0]] = key[1];
            return true;

          } else {
            return false;
          }

        })


        console.log("month", this.state.measureObj)

        break;

      case 'lastweek':

        // var dateFrom = moment();
        var dateTo = moment().subtract(7, 'd');
        //  console.log("my time",dateFrom);
        //  console.log("my time stemp time",dateTo, Math.floor(Date.now()).toString(), Math.floor(dateFrom).toString(), Math.floor(dateTo).toString());
        //   console.log(this.props.measureHistory);
        var fil = Object.entries(this.state.measureHistory).filter((key) => {
          if (key[0] > Math.floor(dateTo).toString()) {
            console.log("my key", key[0], "my value", key[1])
            this.state.measureObj[key[0]] = key[1];
            return true;

          } else {
            return false;
          }

        })


        console.log("week", this.state.measureObj)



        break;


    }




  }
  modalForSorting() {
    return (

      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={{
          flex: 1,
          // backgroundColor:Constants.Colors.Purple,
          // alignItems: 'center',
          marginBottom: 20,
          justifyContent: 'center'
        }}>
          <View style={{ backgroundColor: Constants.Colors.yellow, borderRadius: 10, padding: 10, marginHorizontal: 20, paddingTop: 20 }} >

            {/* <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}> Please enter Card cvv number</Text> */}
            <View style={{ justifyContent: 'center' }}>
              <TouchableOpacity

                onPress={() => {
                  this.sortModal("ascending");

                }}>
                <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 17 }}> Ascending</Text>
              </TouchableOpacity>

              <View style={{ backgroundColor: Constants.Colors.Purple, height: 2, width: '100%', marginTop: 5 }}></View>

              <TouchableOpacity

                onPress={() => {
                  this.sortModal("descending");

                }}>
                <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 17 }}> Descending</Text>
              </TouchableOpacity>

            </View>
            {/* <View style={{ backgroundColor: Constants.Colors.Purple, height: 2, width: '100%', marginTop: 5 }}></View> */}
            {/* <View style={{ flexDirection: 'row' }}>
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
          </View> */}


          </View>
        </View>
      </Modal>


    );



  }
  modalForFilter() {
    return (

      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalfilterVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={{
          flex: 1,
          // backgroundColor:Constants.Colors.Purple,
          // alignItems: 'center',
          marginBottom: 20,
          justifyContent: 'center'
        }}>
          <View style={{ backgroundColor: Constants.Colors.yellow, borderRadius: 10, padding: 10, marginHorizontal: 20, paddingTop: 20 }} >

            {/* <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}> Please enter Card cvv number</Text> */}
            <View style={{ justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => { this.filterModal("alldata"); }}>
                <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 17 }}> All Data</Text>
              </TouchableOpacity>
              <View style={{ backgroundColor: Constants.Colors.Purple, height: 2, width: '100%', marginTop: 5 }}></View>
              <TouchableOpacity onPress={() => { this.filterModal("yesterday"); }}>
                <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 17 }}> Yesterday</Text>
              </TouchableOpacity>
              <View style={{ backgroundColor: Constants.Colors.Purple, height: 2, width: '100%', marginTop: 5 }}></View>
              <TouchableOpacity onPress={() => { this.filterModal("lastweek"); }}>
                <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 17 }}> Last Week</Text>
              </TouchableOpacity>
              <View style={{ backgroundColor: Constants.Colors.Purple, height: 2, width: '100%', marginTop: 5 }}></View>
              <TouchableOpacity onPress={() => { this.filterModal("lastmonth"); }}>
                <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 17 }}> Last Month</Text>

              </TouchableOpacity>


            </View>




            {/* <View style={{ backgroundColor: Constants.Colors.Purple, height: 2, width: '100%', marginTop: 5 }}></View> */}
            {/* <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ flex: 1, padding: 5 }}
                onPress={() => {
                  this.setState({ modalfilterVisible: false });
                }}>
                <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}> Cancel</Text>
              </TouchableOpacity>
              <View style={{ backgroundColor: Constants.Colors.Purple, height: '100%', width: 2 }}></View>
              <TouchableOpacity
                style={{ flex: 1, padding: 5 }}
                onPress={() => {
                  this.filterModal();
      
                }}>
                <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}> Done</Text>
              </TouchableOpacity>
            </View> */}


          </View>
        </View>
      </Modal>


    );



  }

  componentDidMount() {
    console.log("my object", this.state.measureObj);

  }
  componentWillMount() {
    // this.props.UserActions.measurementFromFirebase();
    console.log(this.state.measureHistory);
  }
  componentWillReceiveProps(props) {
    console.log(this.state.measureObj, "my props", props);
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
                <TouchableOpacity onPress={() => { this.filterBy() }}>

                  <View style={{ flexDirection: "row" }}>
                    <Image source={Constants.Images.user.filter} style={styles.iconStyle} />
                    <Text style={{ fontSize: 17, color: 'black', alignSelf: 'center', paddingLeft: 8, fontWeight: '500' }}>Filter </Text>
                  </View>
                </TouchableOpacity>
                <View style={{ width: 1, lexDirection: "row", backgroundColor: 'black' }}></View>
                <TouchableOpacity onPress={() => { this.sortBy() }}>
                  <View style={{ flexDirection: "row" }}>
                    <Image source={Constants.Images.user.sort} style={styles.iconStyle} />
                    <Text style={{ fontSize: 17, color: 'black', alignSelf: 'center', paddingLeft: 8, fontWeight: '500' }}>Sort By </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {this.modalForSorting()}
              {this.modalForFilter()}
              <ScrollView showsVerticalScrollIndicator={false}>
                {
                  Object.keys(this.state.measureObj).length != 0
                    ?
                    <View>{this.state.sortValue ? <View>{Object.keys(this.state.measureObj).map((key, index) => {

                      const myItem = this.state.measureObj[key]

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

                    })}</View> : <View>{Object.keys(this.state.measureObj).reverse().map((key, index) => {

                      const myItem = this.state.measureObj[key]

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

                    })}</View>}</View>

                    : <View>

                      {
                        Object.keys(this.state.measureHistory).length != 0
                          ? 
                          <View>{this.state.sortValue ?  <View>{Object.keys(this.state.measureHistory).map((key, index) => {

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

                          })}</View> :  <View>{Object.keys(this.state.measureHistory).reverse().map((key, index) => {

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

                          })}</View> }</View>
                          
                          
                         : <View><Text style={{ color: 'black', fontWeight: '600', textAlign: 'center' }}>No Measurement history</Text>





                          </View>



                      }



                    </View>



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
  measureHistory: state.user.measureHistory == null ? {} : state.user.measureHistory,

});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Measurements);
