'use strict';

import React, { Component, PropTypes } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View
} from 'react-native'; 
import Constants from '../../constants';


export default class Background extends Component<{}> {
  constructor(props) {
    super(props);
  
  }
  render() {
    return (
      <ImageBackground 
      
        source={this.props.src}
        style={[styles.container, this.props.style]}>
          {this.props.children}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex  : 1,
    width : Constants.BaseStyle.DEVICE_WIDTH
  },
});



