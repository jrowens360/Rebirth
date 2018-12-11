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
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Constants from '../constants';
import _ from "lodash";
import moment from "moment";
import NavigationBar from 'react-native-navbar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Icon from 'react-native-vector-icons/FontAwesome';
import Background from '../components/common/BackgroundImg';
//import ImagePicker from "react-native-image-crop-picker";
import * as UserActions from '../redux/modules/user';
const currentDate = moment().add(1, 'days').format('YYYY-MM-DD');
import ImagePicker from 'react-native-image-picker';
const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
class FrontView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from:'',
      buttonPress: 0,
      sideView: false,
      nextButton: false,
      buttonTxt: 'Next',
      avatarFrontView:'',
      avatarSideView:'',
      apiKey:'APIKey 35ce6ef2466f0330482bc753ea456777715011c3',
    };
  }


  onSelect = (picked,slectedView) => {
   
 if(slectedView =='frontView'){
  if (picked === 'gallery') {
  //   ImagePicker.openPicker({
  //   width: 400,
  //   height: 400,
  //   cropping: true,
  //   enableRotationGesture: true
  // }).then(image => {
  
  //   let source = { uri: image.path, type: image.mime ,filename:Platform.OS === 'ios' ? image.filename :''+Math.floor(Date.now()) };
  //   console.log(JSON.stringify(source));
  //   this.setState({
  //     avatarFrontView: source
  //   });

  //   //alert(JSON.stringify(image));
  // }).catch(e => console.log(e));

  ImagePicker.launchImageLibrary(options, (response) => {

    console.log('Response galler front view = ', response);
     
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri ,type:response.type,filename:response.fileName};
      
     
        this.setState({
          avatarFrontView: source,
          from:'frontView'
        });


        
      }
      this.props.UserActions.uploadImage({ ...this.state });
    
            
          });

} else {
 

  ImagePicker.launchCamera(options, (response) => {

    console.log('Response camera front view = ', response);
     
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri ,type:response.type,filename:response.fileName};
     
      
        this.setState({
          avatarFrontView: source,
          from:'frontView'
        });
      }
    
      this.props.UserActions.uploadImage({ ...this.state });
            
          });



}

}else{

  if (picked === 'gallery') {
  
    ImagePicker.launchImageLibrary(options, (response) => {

      console.log('Response  side gallery = ', response);
       
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.uri ,type:response.type,filename:response.fileName};
        
       
          this.setState({
            avatarSideView: source,
            from:'sideView'
          });
  
  
          
        }
        this.props.UserActions.uploadImage({ ...this.state });
              
            });
} else {
  ImagePicker.launchCamera(options, (response) => {

    console.log('Response  side camera = ', response);
     
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri ,type:response.type,filename:response.fileName};
     
      
        this.setState({
          avatarSideView: source,
          from:'sideView'
        });
      }
      this.props.UserActions.uploadImage({ ...this.state });
     
            
          });



}
 }
    
   }
 
 

  save() {

  }
  onNext() {
    switch (this.state.buttonPress) {
      case 0:
        this.setState({
          sideView: !this.state.sideView,
          buttonTxt: 'Continue',
          buttonPress: 1
        });
    
       

        break;
      case 1:
        this.props.navigation.navigate("SelectScreen")
        break;
    }




  }
  render() {


    return (
      <Background style={styles.container} src={Constants.Images.user.dashboardbg}  >



        <ScrollView>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5, alignItems: 'center' }}>
            <TouchableOpacity  style={{paddingHorizontal:6}}  onPress={() => this.props.navigation.goBack()}>
              <Icon name="angle-left" size={40} color='white' />
            </TouchableOpacity>
            <Text style={styles.headerTxt}> New Measurement </Text>
            <View></View>
          </View>



          {this.state.sideView ? this.cardSideView() : this.cardFrontView()}

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={styles.nextTxt} disabled={this.state.nextButton} onPress={() => this.onNext()}>
              <Text style={styles.bottomText} >{this.state.buttonTxt}</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </Background>
    );
  }
  cardFrontView() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.textStyle}>Front View </Text>
        <Image source={this.state.avatarFrontView==''? Constants.Images.user.frontView:this.state.avatarFrontView} style={this.state.avatarFrontView==''? styles.imageStyle:styles.imageDefaultStyle} resizeMode='contain' />
        <View style={{ flexDirection: "row", backgroundColor: Constants.Colors.darkYellow, padding: 13, borderRadius: 8, justifyContent: 'space-evenly', marginTop: 5 }}>
        <TouchableOpacity onPress={() => { this.onSelect('camera','frontView') }}>
          <View style={{ flexDirection: "row" }}>
            <Icon name="camera" size={25} color='black' />
            <Text style={{ fontSize: 18, color: 'black', alignSelf: 'center', paddingLeft: 8, fontWeight: '500' }}>Camera </Text>
          </View>
          </TouchableOpacity>
          <View style={{ width: 1, lexDirection: "row", backgroundColor: 'black' }}></View>
          <TouchableOpacity onPress={() => { this.onSelect('gallery','frontView') }}>
          <View style={{ flexDirection: "row" }}>
            <Icon name="edit" size={25} color='black' />
            <Text style={{ fontSize: 18, color: 'black', alignSelf: 'center', paddingLeft: 8, fontWeight: '500' }}>Gallery </Text>
          </View>
          </TouchableOpacity>
        </View>

      </View>


    )
  }
  cardSideView() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.textStyle}>Side View </Text>
        <Image source={this.state.avatarSideView==''? Constants.Images.user.sideView:this.state.avatarSideView} style={this.state.avatarSideView==''?styles.imageStyle:styles.imageDefaultStyle} resizeMode='contain' />
        <View style={{ flexDirection: "row", backgroundColor: Constants.Colors.darkYellow, padding: 13, borderRadius: 8, justifyContent: 'space-evenly', marginTop: 5 }}>
        <TouchableOpacity onPress={() => { this.onSelect('camera','sideView') }}>
          <View style={{ flexDirection: "row" }}>
            <Icon name="camera" size={25} color='black' />
            <Text style={{ fontSize: 18, color: 'black', alignSelf: 'center', paddingLeft: 8, fontWeight: '500' }}>Camera </Text>
          </View>
          </TouchableOpacity>
         
          <View style={{ width: 1, lexDirection: "row", backgroundColor: 'black' }}></View>
          <TouchableOpacity onPress={() => { this.onSelect('gallery','sideView') }}>
          <View style={{ flexDirection: "row" }}>
            <Icon name="edit" size={25} color='black' />
            <Text style={{ fontSize: 18, color: 'black', alignSelf: 'center', paddingLeft: 8, fontWeight: '500' }}>Gallery </Text>
          </View>
          </TouchableOpacity>
        </View>

      </View>


    )
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
  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  },
  textStyle: { color: "black", flex: 1, paddingLeft: 10, fontWeight: '500' },
  bottomText: { color: 'white', alignSelf: 'center', fontSize: 18, },
  itemStyle: {
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    paddingVertical: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    alignItems: 'center'

  },
  mainContainer: {

    padding: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 80,
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6,

    backgroundColor: Constants.Colors.White,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1,
    borderRadius: 10

  },
  imageStyle: {
    flex: 1,
    alignSelf: 'center',
    
    // borderRadius: Constants.BaseStyle.DEVICE_WIDTH*15/100,
    // borderColor:'yellow',
    // borderWidth:4

  },
  imageDefaultStyle:{flex: 1,  width: '100%',
  height:'100%',},
  textStyle: { color: 'black', alignSelf: 'center', padding: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2.5, fontSize: 20 },
  headerTxt: { padding: 10, alignSelf: 'center', fontSize: 20, color: 'white' },
  nextTxt: { padding: 2 }


})


// const mapStateToProps = state => ({
//   modalstate: state.ModalHandleReducer,
//   deviceToken: state.user.deviceToken
// });

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(null, mapDispatchToProps)(FrontView);

