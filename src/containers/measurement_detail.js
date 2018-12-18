import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import Constants from '../constants';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import NavigationBar from 'react-native-navbar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as UserActions from '../redux/modules/user';
import Background from '../components/common/BackgroundImg';
import moment from "moment";
import { ToastActionsCreators } from 'react-native-redux-toast';
// import { goBack, reset, goTo } from './nav';
class MeasurementDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyParameters:'',
      // bodyparms: [
      //   {
      //     "parameter": "Chest",
      //     "size": '30'
      //   },
      //   {
      //     "parameter": "Waist",
      //     "size": '20'
      //   },


      // ]


    };
   
  }

  componentWillMount() {
this.setState({
  bodyParameters:this.props.bodyParameters

},()=>{

// console.log("front parameters",this.state.bodyParameters),
// console.log("front from props parameters",this.props)

});

  }

  dashBoard(){

    let { dispatch } = this.props.navigation;
    dispatch({ type: "ResetNavigator" });

  }

  render() {

    // const titleConfig = {
    //   title: 'Measurement Detail',
    //   tintColor: 'white'
    // };
    return (
      <Background style={styles.container}  src={Constants.Images.user.dashboardbg}>

  <ScrollView>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5, alignItems: 'center' }}>
            <TouchableOpacity style={{ paddingHorizontal: 6 }} onPress={() => this.props.navigation.goBack()}>
              <Icon name="angle-left" size={40} color='white' />
            </TouchableOpacity >
            <Text style={styles.headerTxt}> Measurement Detail </Text>
            <View>
            <TouchableOpacity  onPress={() => this.dashBoard()}>
              <Text style={styles.headerTxt} > Done</Text>
            </TouchableOpacity >

            </View>
          </View>
        
        <View style={styles.mainContainer}>
        <ScrollView  showsVerticalScrollIndicator={false}> 
        { Object.keys(this.state.bodyParameters.front_parameters).map((key, index) => {
          const myItem = this.state.bodyParameters.front_parameters[key]
          if(key =="h"){
            
            return ( <View></View>)

          }
          if(key =="height_p"){
           
            return ( <View></View>)

          }
          if(typeof(myItem) === 'object'){
            return ( <View></View>)
         
          }else{
            return ( <View>
              <View style={styles.flatview}>
                <Text >{key}</Text>
                <Text >{Math.round(myItem * 100) / 100}cm</Text>
  
  
              </View>
              <View style={{ borderBottomColor: 'gray', borderBottomWidth: 2 }}></View>
            </View>);


          }
          
          
          
         // <MyComponent myItem={myItem} key={index} />
        })
        
        
        }
       

          {/* <FlatList
            keyExtractor={item => item.parameter}
            data={this.state.bodyparms}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) =>
              <View>
                <View style={styles.flatview}>
                  <Text >{item.parameter}</Text>
                  <Text >{item.size}</Text>


                </View>
                <View style={{ borderBottomColor: 'gray', borderBottomWidth: 2 }}></View>
              </View>
            } */}

          {/* /> */}



</ScrollView>

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

})




const mapStateToProps = state => (
  console.log("state inn components",state.user.bodyParameters.front_parameters),
  {
  bodyParameters: state.user.bodyParameters,
 
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementDetail);

