'use strict';
import {
  Platform,
} from 'react-native';
import _ from "lodash";
import { startLoading, stopLoading, showToast, hideToast } from './app';
import { goBack, reset } from './nav';
import { ToastActionsCreators } from 'react-native-redux-toast';
var firebase = require("firebase");


// Actions
export const USER_STARTUP = "USER_STARTUP";
export const USER_INFO = "USER_INFO";

// Action Creators

export const STARTUP = () => ({ type: USER_STARTUP});
export const USERINFO = () => ({ type: USER_INFO});
//perform API's



export const signUpFirebase = (data) => {

	return dispatch => {
    dispatch(startLoading());
    firebase.auth().createUserWithEmailAndPassword(data.email,data.password).then((user)=>{

      console.log('result signup ******* ',user)

      dispatch(stopLoading());
      dispatch(ToastActionsCreators.displayInfo("user register"));
     dispatch(USERINFO());
    }).catch(error => {
      console.log("error=> ", error)
      dispatch(stopLoading());
  });
}

};


export const signInFirebase = (data) => {

	return dispatch => {
    dispatch(startLoading());
    firebase.auth().signInWithEmailAndPassword(data.email,data.password).then((user)=>{

      console.log('result signup ******* ',user)
    
      dispatch(stopLoading());
      dispatch(ToastActionsCreators.displayInfo("user login"));
      dispatch(USERINFO());

    }).catch(error => {
      console.log("error=> ", error)
      dispatch(stopLoading());
  });
}

};


export const forgotPasswordFirebase = (data) => {

	return dispatch => {
    dispatch(startLoading());
    firebase.auth().sendPasswordResetEmail(data.email).then((user)=>{
      dispatch(stopLoading());
      console.log('result forgot  password ******* ',user)
      dispatch(ToastActionsCreators.displayInfo(user));

      dispatch(goBack());

    }).catch(error => {
      console.log("error=> ", error)
      dispatch(stopLoading());
  });
}

};

export const changePasswordFirebase = (data) => {

	return dispatch => {
    dispatch(startLoading());
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email, data.currentPassword);
    firebase.auth().currentUser.reauthenticateWithCredential(cred).then(() => {
      dispatch(stopLoading());
      user.updatePassword(data.newPassword).then(() => {
        dispatch(stopLoading());
        console.log("Email updated!");
        dispatch(ToastActionsCreators.displayInfo("password update"));
      }).catch((error) => { 
        dispatch(stopLoading());
        dispatch(ToastActionsCreators.displayInfo("please enter correct current password "));
        console.log(error); });
    }).catch((error) => { 
      dispatch(stopLoading());
      dispatch(ToastActionsCreators.displayInfo("password Not update"));
      console.log(error); });
  
}

};






export const writeUserData = (data) => {
  const { currentUser } = firebase.auth();
	return dispatch => {
    dispatch(startLoading());
  firebase.database().ref('UsersList/').push({
    name:data.name,
    email:data.email,
    phone:data.phone,
    height:data.height,
    weight:data.weight,
    dob:data.dob
}).then((user)=>{
      dispatch(stopLoading());
      console.log('result save data ******* ',user)
      dispatch(ToastActionsCreators.displayInfo(user));

  

    }).catch(error => {
      console.log("error=> ", error)
      dispatch(stopLoading());
  });
}

};








/**
* Initial state
*/
const initialState = {
  userDetails : null,
  deviceToken : "test",
};

/**
* Reducer
*/
export default function reducer(state = initialState, action) {
    switch (action.type) {
        // case LOG_IN_SUCCESS:
        //   return { ...state, userDetails: action.data };

        default:
          return state;
    }
}
