import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image
} from 'react-native';
import Constants from '../constants';


export default class InfoProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={this.props.img} style={styles.imageStyle} resizeMode='contain' />

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flex: 1,

  },
  imageStyle: {

    backgroundColor: 'white',
    //flex:1,
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,


  },

  mainContainer: {
    flex: 1,
    paddingTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
    //paddingBottom:Constants.BaseStyle.DEVICE_HEIGHT/100*10,
    marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6,
    backgroundColor: Constants.Colors.White,
    //marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*2,
    borderRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,

  },

})