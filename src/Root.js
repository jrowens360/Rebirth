import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    InteractionManager,
    Platform,
    Alert,
    Linking,
    StatusBar,
    SafeAreaView
} from 'react-native'
import Progress from './components/common/Progress'
import Navigator from "./config/navigator"
import { Toast } from 'react-native-redux-toast';
import Constants from './constants';

export default class Root extends Component{
  /* *
   * @constructor: Default constructor
   * */
  constructor(props){
    super(props);
  }

  /* *
   * @function: Default render function
   * */
  render(){
    return (
      <SafeAreaView style={styles.container}>
       
          <StatusBar
          translucent={true}
            backgroundColor={Constants.Colors.Purple}
            barStyle="dark-content"
          />
        	<Progress/>
          <Navigator/>
          <Toast messageStyle={styles.toastStyle} />
       
        </SafeAreaView>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.White,
  },
  toastStyle:{
     color: Constants.Colors.White,
  }
});

