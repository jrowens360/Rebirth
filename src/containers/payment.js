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
  FlatList,Modal
} from 'react-native';
import Constants from '../constants';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import NavigationBar from 'react-native-navbar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Icon from 'react-native-vector-icons/FontAwesome';
import Background from '../components/common/BackgroundImg';
import * as UserActions from '../redux/modules/user';
import RadioButton from 'react-native-radio-button'
import FlateListView from './flatlistview';
class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      checked: true,
      cardList: this.props.cardList != null || typeof (this.props.cardList.cardList) != "undefined" ? this.props.cardList.cardList : [],
    cardDetail:'',
    cvv:''

    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    this.setState({
        cardList: this.props.cardList != null || typeof (this.props.cardList.cardList) != "undefined" ? this.props.cardList.cardList : []


    }, () => {
       // console.log("card lISt from  did mount redux" + JSON.stringify(this.state.cardList))
    });

}
componentWillReceiveProps(props) {

    this.setState({

        cardList: this.props.cardList != null || typeof (this.props.cardList.cardList) != "undefined" ? props.cardList.cardList : []


    });
   

}

  

  complete() {
    //this.props.navigation.navigate("MeasurementDetail")
    if(this.props.cardList!=null){
    this.setState({
      cardDetail: this.props.cardList.cardList[this.props.selectIndex]
    },()=>{
      console.log("my card detail",this.state.cardDetail)
    })
   
    this.setModalVisible()
  }else{

    alert("please add your card");
  }
  }
  submit() {
    this.setState({});

    this.setModalVisible(!this.state.modalVisible);

  }
  onselectPress=(index)=>{
    let { dispatch } = this.props.navigation;
    dispatch({type:"SELECT_INDEX",index})
   console.log("my index",index)
    // this.setState({activeIndex:index},()=>{ console.log("active index",this.state.activeIndex)});
    
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
              <Text style={styles.headerTxt}> Payment </Text>
              <View></View>
            </View>
            <View style={styles.mainContainer}>
              <View style={{
                height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 13, paddingHorizontal: 15, fontWeight: '500',
                borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Constants.Colors.darkYellow, alignItems: 'center'
              }}>
                <Text style={{ color: 'black' }}> Payment Amount
                </Text>
                <Text style={{ color: 'black', textAlign: 'right', fontSize: 50 }}>

                  <Text style={{ fontSize: 25 }} > {'\u0024'} </Text>
                  .99
                </Text>

              </View>

              <Text style={{ color: 'black', fontSize: 18, marginTop: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3, fontWeight: '500' }}> Saved Cards </Text>
              
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
              <View style={{ backgroundColor:Constants.Colors.yellow, borderRadius: 10, padding: 10, marginHorizontal: 20,paddingTop:20 }} >
              
                <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}> Please enter Card cvv number</Text>
                <View style={{justifyContent: 'center' }}>
                  <TextInput
                    maxLength={3}
                    autoFocus={false}
                    autoCorrect={false}
                    value={this.state.cvv}
                  
                    style={styles.textInputStyle}
                    placeholder='Your Card CVV'
                    placeholderTextColor={'gray'}
                    // underlineColorAndroid={"gray"}
                    keyboardType='phone-pad'
                    onChangeText={(cvv) => this.setState({ cvv })}
                    // returnKeyType={"next"}
                    // onSubmitEditing={() => { this.secondTextInput.focus(); }}


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
              
              <FlatList
                                style={styles.flatlist}
                                data={this.state.cardList}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ index, item }) =>

                                <FlateListView item={item} index={index}   onselectPress={this.onselectPress}></FlateListView>
                                  
                                }
                                keyExtractor={item => item.email}
                            />
              {/* {this.state.cardForm ? this.cardFormView() : null} */}
            
              <TouchableOpacity style={styles.buttonStyle} onPress={() => this.complete()}>
                <Text style={styles.paymenText}>Complete payment</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.navigation.navigate("AddCard", {
                                data: this.state.cardList == null ? [] : this.state.cardList,

                            })}>
                                <Text style={styles.savetxt}>+ Add New</Text>
                            </TouchableOpacity> */}

              <TouchableOpacity onPress={() => this.props.navigation.navigate("AddCard", {
                                data: this.state.cardList == null ? [] : this.state.cardList,

                            })}>
                <Text style={{ textAlign: 'center', fontSize: 18, padding: 10, color: Constants.Colors.Purple }}>Add  Card +</Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </Background>
    );
  }
  cardFormView() {
    return (
      <View>
        <TextInput
          style={styles.textInputStyle}
          placeholder='Card Number'
          placeholderTextColor={Constants.Colors.Blue}
          underlineColorAndroid={Constants.Colors.Black}
        />
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={{ flex: 1, padding: 10 }}
            placeholder='Exp Date'
            placeholderTextColor={Constants.Colors.Blue}
            underlineColorAndroid={Constants.Colors.Black}
          />
          <TextInput
            style={{ flex: 1, padding: 10, marginLeft: 10 }}
            placeholder='CVV'
            placeholderTextColor={Constants.Colors.Blue}
            underlineColorAndroid={Constants.Colors.Black}
          />


        </View>
        <TextInput
          style={styles.textInputStyle}
          placeholder='Name of Card'
          placeholderTextColor={Constants.Colors.Blue}
          underlineColorAndroid={Constants.Colors.Black}
        />


      </View>

    )
  }
  // creditCardImg(item) {
  //   console.log("data of item", item)
   
  //   // if (typeof (item.type) != "undefined" && item.type != null) {

  //       switch (item.type) {

  //           case 'master-card':
  //               return (

  //                   <Image source={Constants.Images.user.masterCard} style={{ height: 30, width: 40 }} resizeMode='contain'></Image>

  //               );
  //           case 'visa':
  //               return (

  //                   <Image source={Constants.Images.user.visa} style={{ height: 30, width: 40 }} resizeMode='contain'></Image>

  //               );
  //           default:
  //               return (

  //                     <Image source={{uri:"http://java.sogeti.nl/JavaBlog/wp-content/uploads/2009/04/android_icon_256.png"}} style={{ height: 30, width: 40 }} resizeMode='contain'></Image>

  //                  // <Image source={Constants.Images.user.masterCard} style={{ height: 30, width: 40 }}></Image>
  //               );


  //       }
  //     //}

  //  }


}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,

  },
  navBar: {
    backgroundColor: "black",
  },
  imageStyle: {
    width: Constants.BaseStyle.DEVICE_WIDTH * 30 / 2,
    height: Constants.BaseStyle.DEVICE_WIDTH * 30 / 2,
  },
  paymenText: {
    color: 'white'
  },
  flatlist: {
    flexGrow: 0
  },
  flatview: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center'
  },
  mainContainer: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 80,
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1,
    backgroundColor: Constants.Colors.White,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1,
    borderRadius: 10

  },


  buttonStyle: {
    color: 'white',
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 20,
    textAlign: 'center',
    backgroundColor: Constants.Colors.Purple,
    paddingVertical: 12,
    paddingHorizontal: 18,
    // width: "45%",
    justifyContent: "center", alignItems: 'center'
  },
  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  },
  headerTxt: { padding: 10, alignSelf: 'center', fontSize: 20, color: 'white' },
  textInputStyle: {
    // textAlign: 'center',
    // alignSelf: 'center',
    color: 'black',
    padding: 10,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    // flexWrap: 'wrap'
    // marginHorizontal: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 20,



  },

})


const mapStateToProps = state => ({
  cardList: state.user.cardList == null ? [] : state.user.cardList,
  selectIndex: state.user.selectIndex

});


const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
