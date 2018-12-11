'use strict';
import {
  Platform,
} from 'react-native';
import _ from "lodash";
import { startLoading, stopLoading, showToast, hideToast } from './app';
import RestClient from '../../utilities/RestClient';
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
export const CARD_DETAIL = "CARD_DETAIL";
export const FRONT_IMAGE = "FRONT_IMAGE";
export const SIDE_IMAGE = "SIDE_IMAGE";

// Action Creators

export const STARTUP = () => ({ type: USER_STARTUP});
export const USERINFO = () => ({ type: USER_INFO});
export const USERLOGOUT = () => ({ type: USER_LOGOUT});
export const USERLOGIN = () => ({ type: USER_LOGIN});
export const USERDETAIL = (data) => ({ type: USER_DETAIL,data});
export const USERPHOTO = (data) => ({ type: USER_PHOTO,data});
export const CARDDETAIL = (data) => ({ type: CARD_DETAIL,data});
export const FRONTIMAGE = (data) => ({ type: FRONT_IMAGE,data});
export const SIDEIMAGE = (data) => ({ type: SIDE_IMAGE,data});
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
          dispatch(ToastActionsCreators.displayInfo(error.message));
          dispatch(stopLoading());
      });
    



     
    }).catch(error => {
      console.log("error=> signup", error)
      dispatch(ToastActionsCreators.displayInfo(error.message));
      dispatch(stopLoading());
  });
}

};


export const signInFirebase = (data) => {

	return dispatch => {
    dispatch(startLoading());
    firebase.auth().signInWithEmailAndPassword(data.email,data.password).then((user)=>{

      dispatch(stopLoading());
      dispatch(ToastActionsCreators.displayInfo("User login successfully"));
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
      dispatch(ToastActionsCreators.displayInfo(error.message))
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






export const changePasswordFirebase = (data,callback) => {
  
	return dispatch => {
    dispatch(startLoading());
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email, data.currentPassword);
    firebase.auth().currentUser.reauthenticateWithCredential(cred).then(() => {
      dispatch(stopLoading());
      user.updatePassword(data.newPassword).then(() => {
        dispatch(stopLoading());
       
        dispatch(ToastActionsCreators.displayInfo("Password update successfully"));
        callback();
        dispatch(goBack());
      }).catch((error) => { 
        dispatch(stopLoading());
        dispatch(ToastActionsCreators.displayInfo(error.message));
        console.log(error); });
    }).catch((error) => { 
      dispatch(stopLoading());
      dispatch(ToastActionsCreators.displayInfo("Your current Password does not match "));
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
    firebase.database().ref('UsersList/'+currentUser.uid).once('value', function (snapshot) {
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
          dispatch(ToastActionsCreators.displayInfo(error.message))
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
          dispatch(ToastActionsCreators.displayInfo(error.message))
          dispatch(stopLoading());
      });
}

};

export const addCardListFirebase = (data) => {
  console.log("user input"+data.toString())
  const { currentUser } = firebase.auth();
	return dispatch => {
    dispatch(startLoading());
    firebase.database().ref('UsersList/'+currentUser.uid).update({
    'cardList':data.cards
  }).then((saveData)=>{
    console.log('result card save ******* ',saveData)

  
    dispatch(ToastActionsCreators.displayInfo("user card save successfully"));
    firebase.database().ref('UsersList/'+currentUser.uid).once('value', function (snapshot) {
      console.log("read UPDATE data"+JSON.stringify(snapshot.val()))
      dispatch(CARDDETAIL(snapshot.val()));
      dispatch(goBack());
      dispatch(stopLoading());
  });
  
      }).catch(error => {
        console.log("error=> ", error)
        dispatch(ToastActionsCreators.displayInfo(error.message))
        dispatch(stopLoading());
    });
}

};


export const deleteCardFromFirebase = (data) => {
  console.log("user input"+JSON.stringify(data.toString()))
  const { currentUser } = firebase.auth();
	return dispatch => {
    dispatch(startLoading());
    firebase.database().ref('UsersList/'+currentUser.uid).update({
    'cardList':data.cardList
  }).then((saveData)=>{
    console.log('result card save ******* ',saveData)

  
    dispatch(ToastActionsCreators.displayInfo("user card save successfully"));
    firebase.database().ref('UsersList/'+currentUser.uid).once('value', function (snapshot) {
      console.log("read DELETE data"+JSON.stringify(snapshot.val()))
    let listData = snapshot.val()== null ?[]:snapshot.val()
      dispatch(CARDDETAIL(listData));
     
      dispatch(stopLoading());
  });
  
      }).catch(error => {
        console.log("error=> ", error)
        dispatch(ToastActionsCreators.displayInfo(error.message))
        dispatch(stopLoading());
    });
}

};



export const uploadImage = (data,) => {
  console.log('data ********* ',data)
  let body = new FormData();

  body.append('image', { uri: data.avatarFrontView.uri ,name: data.avatarFrontView.filename, filename: data.avatarFrontView.filename, type: data.avatarFrontView.type});

  // if (data.avatarSource && data.avatarSource.fileName) {
  //   //console.log('inside profile if statemetn ********')
  //   body.append('profilePic', { uri: data.avatarSource.uri, name: data.avatarSource.fileName, filename: data.avatarSource.fileName, type: data.avatarSource.type });
  // }
  // else {
  // //	console.log('inside else profilePic *********')
  //   body.append('profilePic', "")
  // }
  
  
 
  console.log('data body  ********* ',body)

  return dispatch => {
    dispatch(startLoading());
    RestClient.uploadImage("uploads/",body,data.apiKey).then((result) => {
     // console.log('result front image upload ******* ',result)
    //  if(result.status == 1){
      dispatch(stopLoading());
      dispatch(ToastActionsCreators.displayInfo('Data saved successfully'))

      if(data.from == 'frontView'){

        if(result.status){
          dispatch(FRONTIMAGE(result.name));

          console.log('result front image upload ******* ',result)
        }
      
      }else{
        if(result.status){
          dispatch(FRONTIMAGE(result.name));

          console.log('result side image upload ******* ',result)
        }
      
       

      }
          // dispatch(ToastActionsCreators.displayInfo(result.message));
      // }else{
      //   dispatch(stopLoading());
      //   // dispatch(ToastActionsCreators.displayInfo(result.message));
      // }
    }).catch(error => {
        console.log("error=> ", error)
        dispatch(ToastActionsCreators.displayInfo(error.message))
        dispatch(stopLoading());
    });
  }

};


export const ImageParameter = (data) => {
  console.log('data  for front Image ********* ',data)
  let body = new FormData();

  body.append('image',data.frontImg);
  body.append('angle', '0');
  body.append('height', data.height);   
  body.append('gender', data.gender);
  body.append('step', '1')

//  if(data.from == "sideView"){

//   body.append('key', '1')

//  }
  

  return dispatch => {
    dispatch(startLoading());
    RestClient.uploadImage("step/",body,data.apiKey).then((result) => {
      console.log('result front image prameter ******* ',result)
    //  if(result.status == 1){
      dispatch(stopLoading());
      dispatch(ToastActionsCreators.displayInfo('Data saved successfully'))
      console.log('data front body params   ********* ',result)
          // dispatch(ToastActionsCreators.displayInfo(result.message));
      // }else{
      //   dispatch(stopLoading());
      //   // dispatch(ToastActionsCreators.displayInfo(result.message));
      // }
    }).catch(error => {
        console.log("error=> ", error)
        dispatch(ToastActionsCreators.displayInfo(error.message))
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
  cardList:'',
  frontImage:'',
  sideimage:''
 
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
           case CARD_DETAIL:
           return { ...state, cardList: action.data };
           case FRONT_IMAGE:
           return { ...state, frontImage: action.data };
           case SIDE_IMAGE:
           return { ...state, sideimage: action.data };
         
         

        default:
          return state;
    }
}
