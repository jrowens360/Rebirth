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
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_LOGIN = "USER_LOGIN";
export const USER_DETAIL = "USER_DETAIL";
export const USER_PHOTO = "USER_PHOTO";

// Action Creators

export const STARTUP = () => ({ type: USER_STARTUP});
export const USERINFO = () => ({ type: USER_INFO});
export const USERLOGOUT = () => ({ type: USER_LOGOUT});
export const USERLOGIN = () => ({ type: USER_LOGIN});
export const USERDETAIL = (data) => ({ type: USER_DETAIL,data});
export const USERPHOTO = (data) => ({ type: USER_PHOTO,data});
//perform API's



export const signUpFirebase = (data) => {
  console.log("user input"+data.toString())
	return dispatch => {
    dispatch(startLoading());
    firebase.auth().createUserWithEmailAndPassword(data.email,data.password).then((userData)=>{
console.log("user output"+JSON.stringify(userData))
      firebase.database().ref('UsersList/'+userData.user.uid).set({
        name:data.name,
        email:data.email,
        phone:data.phone,
        height:data.height,
        weight:data.weight,
        dob:data.dob,
        profileImg:data.imageUrl
    }).then((saveData)=>{
      console.log('result signup ******* ',saveData)

      dispatch(stopLoading());
      dispatch(ToastActionsCreators.displayInfo("user register successfully"));
      dispatch(USERLOGIN());
      dispatch(USERINFO());
            
    
        }).catch(error => {
          console.log("error=> ", error)
          dispatch(stopLoading());
      });
    



     
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

      dispatch(stopLoading());
      dispatch(ToastActionsCreators.displayInfo("user login successfully"));
      dispatch(USERLOGIN());
      dispatch(USERINFO());
    

    }).catch(error => {
      console.log("error=> ", error)
      dispatch(ToastActionsCreators.displayInfo(error.message))
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


export const logoutFirebase = () => {

	return dispatch => {
    dispatch(USERLOGOUT());
//     dispatch(startLoading());
//     firebase.auth().signOut().then((user)=>{
//       dispatch(stopLoading());
//       console.log('result forgot  password ******* ',user)
//       dispatch(ToastActionsCreators.displayInfo("user logout"));

//       dispatch(USERLOGOUT());

//     }).catch(error => {
//       console.log("error=> ", error)
//       dispatch(ToastActionsCreators.displayInfo(error));
//       dispatch(stopLoading());
//   });
 }

};






export const changePasswordFirebase = () => {
  
	return dispatch => {
    dispatch(startLoading());
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email, data.currentPassword);
    firebase.auth().currentUser.reauthenticateWithCredential(cred).then(() => {
      dispatch(stopLoading());
      user.updatePassword(data.newPassword).then(() => {
        dispatch(stopLoading());
      
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






// export const writeUserData = (data) => {
 

//   const { currentUser } = firebase.auth();
// 	return dispatch => {
//     dispatch(startLoading());
//   firebase.database().ref('UsersList/').push({
//     name:data.name,
//     email:data.email,
//     phone:data.phone,
//     height:data.height,
//     weight:data.weight,
//     dob:data.dob,
//     profileImg:data.imageUrl
// }).then((user)=>{
//       dispatch(stopLoading());
//       console.log('result save data ******* ',user)
//       dispatch(ToastActionsCreators.displayInfo(user));

        

//     }).catch(error => {
//       console.log("error=> ", error)
//       dispatch(stopLoading());
//   });
// }

// };



export const readUserData = () => {
 

  const { currentUser } = firebase.auth();
	return dispatch => {
    dispatch(startLoading());
    firebase.database().ref('UsersList/'+currentUser.uid).on('value', function (snapshot) {
      console.log("read data"+snapshot.val())
      dispatch(USERDETAIL(snapshot.val()));
      dispatch(stopLoading());
  });
}

};


export const updateUserData = (data) => {
 
console.log(data)
  const { currentUser } = firebase.auth();
	return dispatch => {
    dispatch(startLoading());
    firebase.database().ref('UsersList/'+currentUser.uid).update({
      name:data.name,
      email:data.email,
      phone:data.phone,
      height:data.height,
      weight:data.weight,
      dob:data.dob,
      profileImg:data.imageUrl

    }).then( () =>{
      dispatch(stopLoading());
      dispatch(ToastActionsCreators.displayInfo("User profile updated successfully"));

      console.log("user data updated")
  }).catch(error => {
          console.log("error=> ", error)
          dispatch(ToastActionsCreators.displayInfo("User profile not updated"));
          dispatch(stopLoading());
      });
}

};
export const updateUserPhoto = (data) => {
 

  const { currentUser } = firebase.auth();
	return dispatch => {
    dispatch(startLoading());
    firebase.database().ref('UsersList/'+currentUser.uid).update({
      
      profileImg:data.imageUrl

    }).then( () =>{
      dispatch(stopLoading());
    //  dispatch(USERPHOTO(data.imageUrl));
      
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
 
  userStatus:false,
  userDetail:'',
 
};

/**
* Reducer
*/
export default function reducer(state = initialState, action) {
    switch (action.type) {
        // case LOG_IN_SUCCESS:
        //   return { ...state, userDetails: action.data };
           case USER_LOGOUT:
           return { ...state, userStatus: false };
           case USER_LOGIN:
           return { ...state, userStatus: true };
           case USER_DETAIL:
           return { ...state, userDetail: action.data };
         

        default:
          return state;
    }
}
