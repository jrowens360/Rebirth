'use strict';
import Idx from "../../utilities/Idx";
import {
    Platform

  } from 'react-native';
import { NavigationActions } from "react-navigation";
import { AppNavigator } from "../../config/navigator";
import { REHYDRATE } from "redux-persist/constants";
import { USER_STARTUP,USER_INFO,USER_LOGOUT} from './user';

//Actions
const GOBACK            = "GOBACK";
const ResetNavigator    = "ResetNavigator";
const GOTO              = "GOTO";

// Action Creators
export const goBack = () => ({ type: GOBACK });
export const reset  = (data) => {
    //console.log("ravi kumar")  
    return({ type: ResetNavigator, data })
};
export const goTo   = (data) => ({ type: GOTO, data });


const initialState = AppNavigator.router.getStateForAction(NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: 'Loader',
      }),
    ],
}));

export default function reducer(state = initialState, action) {
    //console.log('action *********',action.payload)
    let firstState = "SignIn";
    if(action.payload && action.payload.user && action.payload.user.userStatus){
        firstState = "dashboard"
    }
    switch (action.type) {
    
        case ResetNavigator:
        // console.log("test test")
            return AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: "dashboard" })],
                }),
                state
            );

            case USER_STARTUP:
            console.log('move user USER_STARTUP');
                return AppNavigator.router.getStateForAction(
                    NavigationActions.reset({
                      index: 0,
                      actions: [NavigationActions.navigate({ routeName: "startup" })],
                    }),
                    state
                );

                case USER_INFO:
                console.log('move user USER_INFO');
                return AppNavigator.router.getStateForAction(
                    NavigationActions.reset({
                      index: 0,
                      actions: [NavigationActions.navigate({ routeName: "Info" })],
                    }),
                    state
                );
                case USER_LOGOUT:
                console.log('move user start up');
                return AppNavigator.router.getStateForAction(
                    NavigationActions.reset({
                      index: 0,
                      actions: [NavigationActions.navigate({ routeName: "startup" })],
                    }),
                    state
                );
            
            
            
            // return this.props.navigation.navigate("Home")

        case GOBACK:
            return AppNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            );

        case GOTO:
        //console.log('route name ******* ',action.data.route)
        return AppNavigator.router.getStateForAction(
            NavigationActions.navigate({
                routeName: action.data.route,
                params: action.data.params || {},
            }),
            state
        );

        // case LOG_OUT:
        // //alert("Logout")
        // // return this.props.navigation.navigate("MainScreen")
        //     return AppNavigator.router.getStateForAction(
        //         NavigationActions.reset({
        //           index: 0,
        //           key: null,
        //           actions: [NavigationActions.navigate({ routeName: "Welcome" })],
        //         }),
        //         state
        //     );
            

        case REHYDRATE:
            return AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: firstState })],
                }),
                state
            );

        default:
            return AppNavigator.router.getStateForAction(action, state);
    }
}