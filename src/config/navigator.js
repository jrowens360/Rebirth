import React, { Component } from 'react'
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import routes from "./routes";
import { BackHandler, Alert } from 'react-native';
import dashboard from '../containers/dashboard';

/* *
 * React Navigation's Configuration
 * */
const stackNavigatorConfiguration = {
  headerMode: "none",
  mode:"card",
  navigationOptions: {
    gesturesEnabled: false,
  },
};

/* *
 * @function: Making React navigation's stack navigator with routes and configuration 
 * */
const AppNavigator = StackNavigator(routes, stackNavigatorConfiguration);

/* *
 * @function: Providing dispatch and nav state into app 
 * */
class AppWithNavigationState extends Component{ 
  constructor(props){
    super(props);
  }  
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  alertBox(){


    Alert.alert(
      'Exit App',
      'Are you sure you want to exit?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => {
          BackHandler.exitApp() ; 
          return true;
        }},
      ],
      { cancelable: false }
    )

  }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    console.log("nav",nav.routes.length);

    if(nav.routes.length == 1){
      if(nav.routes[0].routeName =="dashboard"){
    
        this.alertBox();

        return true;
   
  }

    }
    if(nav.routes.length == 2){

      if (nav.routes[1].routeName =="startup") {
       
        this.alertBox();
      return true;
    
      }

    }
    if(nav.routes.length == 2){

      if (nav.routes[1].routeName =="dashboard") {
       
        this.alertBox();
      return true;
    
      }

    }


    dispatch(NavigationActions.back());
    return true;
  };
  
  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator
        navigation={addNavigationHelpers({ dispatch, state: nav })}
      />
    );
  }
}

export { AppNavigator }

/* *
 * @function: Providing redux store's data in props 
 * */

const mapStateToProps = state => ({
  nav: state.nav
})


/* *
 * @function: Connects a React component to a Redux store 
 * */
export default connect(
  mapStateToProps
)(AppWithNavigationState)