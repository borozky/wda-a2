import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/index"; 
import thunk from "redux-thunk";

import * as StaffActions from "./actions/StaffActions";
import * as SessionActions from "./actions/SessionActions";

const stateLogger = store => next => action => {
    let result;
    console.groupCollapsed(`DISPATCHING ${action.type}`);
    console.log("State BEFORE ACTION", store.getState());
    result = next(action);
    console.log("State AFTER ACTION", store.getState());
    console.groupEnd();
    return result;
}

const onSwitchRole = store => next => action => {
    let result;
    let previousUser = store.getState().session.currentUser;
    
    result = next(action)

    if ( ! previousUser ) {
        return result;
    }

    if ( previousUser.role == null ) {
        return result;
    }

    let previousRole = previousUser.role_level;
    if ( ! store.getState().session.currentUser) {
        return result;
    }
    let newRole = store.getState().session.currentUser.role_level;

    if (previousRole != newRole) {
        alert("CURRENT ROLE HAS  BEEN CHANGED");
        console.log("CURRENT ROLE HAS BEEN CHANGED");
    }

    return result;
}

export default (initialState = {}) => {
    return applyMiddleware(thunk, stateLogger, onSwitchRole)(createStore)(reducers, initialState);
}







