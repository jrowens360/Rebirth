'use strict';
import {
  Platform,
} from 'react-native';
import _ from "lodash";
import { startLoading, stopLoading, showToast, hideToast } from './app';
import { goBack, reset } from './nav';
import { ToastActionsCreators } from 'react-native-redux-toast';


// Actions


// Action Creators


//perform API's

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
