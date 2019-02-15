import React, { Component } from "react";
import { Alert, NetInfo, Platform } from "react-native";
import { Provider } from 'react-redux'
//import Permissions from 'react-native-permissions';
import configureStore from "./config/configureStore";
import Root from './Root';
//import configureClient, { destroySocketClient } from "./utilities/SocketClient";
import { pushNotificationInit , pushNotificationRemove }from "./utilities/PushNotification";
//import SplashScreen from 'react-native-smart-splash-screen'
//import { checkPermissions }from "./utilities/Locations";
import SplashScreen from 'react-native-splash-screen';

//let socketClient = null;

//currentPage = null, currentRoom=null;

/* *
 * @function: Configuring redux store 
 * */
const store = configureStore();

/**
* Subscribe to store changes.
*/

// store.subscribe(()=>{
//     if(store.getState().user.userDetails){
//     	/* *
// 		 * @function: Configuring socket client
// 		 * */ 
// 		 if(!socketClient)
// 			socketClient = configureClient(store);
//     }else{
//     	destroySocketClient();
//     	socketClient = null;
//     }
// });

/*
 * Main component
 * */
class Main extends Component{

	constructor(props) {
		super(props);
		/* *
		 * @function: Initiliazing location utility
		 * */
		//checkPermissions(store);
	}

	componentWillMount() {


	
		/* *
		 * @function: Initiliazing push notification utility
		 * */
		if(Platform.OS === 'android'){ // remove this condition when ios configuration done
			pushNotificationInit(store);
		}
		 
		function handleFirstConnectivityChange(isConnected) {
	      NetInfo.isConnected.removeEventListener('change',handleFirstConnectivityChange);
	    }
	    NetInfo.isConnected.addEventListener('change',handleFirstConnectivityChange);
	    NetInfo.isConnected.fetch().then(isConnected => {
	      
	    });
	}

	componentWillUnmount() {
		/* *
		 * @function: Stop listening push notification events
		 * */
	 	if(Platform.OS === 'android'){ // remove this condition when ios configuration done
			pushNotificationRemove();
		}
		       
	}

	/* *
	 * @function: Default render function
	 * */
	render(){

		return(
	      <Provider store={store}>
	        <Root/>
	      </Provider>
	    )
	}
}

export default Main