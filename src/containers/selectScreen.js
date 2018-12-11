import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Image,TextInput,TouchableOpacity,ScrollView

} from 'react-native';

import Constants from '../constants';
import Background from '../components/common/BackgroundImg';
import { bindActionCreators } from "redux";
import * as UserActions from '../redux/modules/user';
import { connect } from 'react-redux';
import moment from "moment";

 

 class SelectScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
       
      maleSelect:false,
      femaleSelect:false,
      gender:'',
      height:'',
      frontImg:props.frontImage


    };
  }


  onMale(){
  //  this.props.navigation.navigate("signup")
  this.setState({
    maleSelect:!this.state.maleSelect,
    femaleSelect:false,

  });
  if(this.state.maleSelect){
    this.setState({

      gender:'male'
    })


  }else{
    this.setState({
      gender:'female'
    })
   
  }

  }
  onFemale(){
    this.setState({
      maleSelect:false,
      femaleSelect:!this.state.femaleSelect,
  
    });
    if(this.state.femaleSelect){
      this.setState({
  
        gender:'female'
      })
  
  
    }else{
      this.setState({
        gender:'female'
      })
     
    }
  
  
   // this.props.navigation.navigate("SignIn")

  }

  onContinue(){


    this.props.UserActions.ImageParameter({ ...this.state });
  }


  
  render() {
    return (
      
      <View style={styles.container}>
        

 <View style={styles.profileRow}>
 <View style={{alignItems:'center',justifyContent:'center'}}>
 <TouchableOpacity   onPress = {()=>this.onMale()}>
                <Image source={Constants.Images.user.male} style={this.state.maleSelect?styles.imageStyle:styles.defaultImageStyle}  />

         </TouchableOpacity>  

 <Text>Male</Text>
         </View>

         <View style={{marginLeft:20,alignItems:'center',justifyContent:'center'}}>
        
         <TouchableOpacity     onPress = {()=>this.onFemale()}>  
              <Image source={Constants.Images.user.female} style={this.state.femaleSelect?styles.imageStyle:styles.defaultImageStyle}  />

            </TouchableOpacity> 
            <Text>
            Female </Text>
            
            </View>


        
            </View>

             <TextInput
                autoFocus={false}
                autoCorrect={false}
               // onBlur={ () => this._onBlur() }
               // onFocus={ () => this._onFocus() }
                style={styles.textInputStyle}
                placeholder='Height'
                placeholderTextColor={'gray'}
                underlineColorAndroid={'red'}
                showPassword={false}
                onChangeText={(height) => this.setState({ height })}
             
                secureTextEntry={true}

              />



  <TouchableOpacity onPress = {()=>this.onContinue()}  style={{ alignSelf:'stretch' ,marginTop: 20,alignItems:'center',color:'white',backgroundColor:Constants.Colors.Purple,padding:10}}    >  
  <Text style={{ color:'white',padding:5 }}>  continue </Text>
            </TouchableOpacity> 
     

  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal:Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    backgroundColor: '#F5FCFF',
     alignItems: 'center',
     justifyContent:'center',
     padding:10
 
  },
  textStyle: {
    color:'white',
    fontSize: 22,
    textAlign: "center",
    
  },
  imageStyle: {
    width: Constants.BaseStyle.DEVICE_WIDTH * 26 / 100,
    height: Constants.BaseStyle.DEVICE_WIDTH * 26 / 100,
    borderRadius: Constants.BaseStyle.DEVICE_WIDTH * 13 / 100,
    borderColor:Constants.Colors.Purple,
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
    flexDirection: "row",
    //justifyContent:"center"
    // alignItems: "center"

  },
  textInputStyle: {
    alignSelf:'stretch',
    color:'white',
    padding: 10,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,

  },
  bottomConatiner: { 
  flex:1,
    marginBottom:Constants.BaseStyle.DEVICE_HEIGHT / 100 *20,
      position: 'absolute',  bottom: 0,
      alignItems: 'center',
    justifyContent: "center",
     //height:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 40,
  },
  subConatiner: {
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT / 100 *5,
    alignItems: 'center',
    flexDirection: "row",
    alignItems: "center"
    
  },
});
const mapStateToProps = state => ({
  frontImage: state.user.frontImage,
 
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(null, mapDispatchToProps)(SelectScreen);

