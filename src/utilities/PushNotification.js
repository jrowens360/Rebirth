/*
 * @file: PushNotification.js
 * @description: Initiliazing push notification , Redirection on push notifications
 * @author: Ankush Rishi
 * */
'use strict';
import React, { Component } from "react";
import { Platform } from 'react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import { mongoid } from 'mongoid-js';
import _ from "lodash";
import Idx from './Idx';
import moment from "moment";
import * as userActions from '../redux/modules/user';
import { goTo } from '../redux/modules/nav';
let notificationListener,refreshTokenListener;
let notificationToken = 'dummytoken';

/**
* Initiliazing push notification
*/ 

export function pushNotificationInit(store) {
    console.log('I am here ****** ')
	FCM.requestPermissions(); // for iOS
    // FCM token on intial app load.
    FCM.getFCMToken().then(token => {
        if(token){
            console.log(" firebase token ",token);
        	//store.dispatch(userActions.setDeviceToken(token));
        }
    });

    // Receive Notification in kill state, inactive state or bankground state.
	FCM.getInitialNotification().then(res=>{
		let context = this;
		if(JSON.stringify(res)){
		    setTimeout(function(){
		        onNotificationRedirection(res,store);
		    },500);
		}
	});

	// Receive Notification in forground
	notificationListener = FCM.on(FCMEvent.Notification, async (res) => {
		let context = this;
		if(res.opened_from_tray){
		    setTimeout(function(){
		    	onNotificationRedirection(res,store);
		    },500);
	    }
	});

	// Fcm token may not be available on first load, catch it here
	refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
		if(token){
		//  store.dispatch(userActions.setDeviceToken(token));
		}
	});
}


/**
* Schedule Local Notifications.
*/

export function scheduleNotifications(data){ 
	let fire_date = parseInt(moment(data.date).seconds(0).format("x"));  // eliminate secs.
	FCM.scheduleLocalNotification({
    fire_date: fire_date,
    id: data.id,
    body: 'notification body',
    show_in_foreground: true,
    priority: 'high',
    lights: true,   
    vibrate: 500,
    notificationType : 6,
    sound: "default",
  });
};


/**
* Get Scheduled Notifications List.
*/

export function getScheduleNotifications(data,callback){
	FCM.getScheduledLocalNotifications().then(notification=>{
		 if(_.isFunction(callback)){
        callback(notification);
        }
    });
};

/**
*  Removes all future local notifications.
*/

export function cancelAllLocalNotifications(){
    FCM.cancelAllLocalNotifications();
};

/**
* Redirection on Notification Tap. 
*/

export function onNotificationRedirection(res,store){
    // if(res.my_key == 'rate_stylist'){
    //     store.dispatch(goTo({
    //         route : 'Home',
    //         params: {
    //             rateStylist: 'rate',
    //             notiData: JSON.parse(res.noti_data)
    //         }
    //     }));
    // }
    // if (Idx(store.getState().user, _ => _.userDetails.auth.token)) {
    //     if(res.my_key == 'rate_stylist')
    //     store.dispatch(goTo({
    //         route : 'Home',
    //         // params:{
    //         //     appointmentStatus:res.noti_data.appointment_status
    //         // }
    //     }));
    // }
}

/**
* Stop listening push notification events
*/

export function pushNotificationRemove(store) {
	notificationListener.remove();
	refreshTokenListener.remove();
}
