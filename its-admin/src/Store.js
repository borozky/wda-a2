import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/index"; 
import thunk from "redux-thunk";

const stateLogger = store => next => action => {
    let result;
    console.groupCollapsed(`DISPATCHING ${action.type}`);
    console.log("State BEFORE ACTION", store.getState());
    result = next(action);
    console.log("State AFTER ACTION", store.getState());
    console.groupEnd();
    return result;
}

const checkAuth = store => next => action => {

    let result;
    result = next(action);

    let session = store.getState().session;
    if (session.currentUser == null) {
        console.log("USER IS NOT LOGGED IN");
    }
    return result;  
}

const checkUserRole = store => next => action => {
    let result;
    result = next(action);
    let session = store.getState().session;

    if (session.currentUser) {
        if (typeof session.currentUser.role == "undefined") {
            console.log("CURRENT USER HAS NO ROLE");
        }
    }
    return result; 
}

export default (initialState = {}) => {
    return applyMiddleware(thunk, stateLogger, checkAuth, checkUserRole)(createStore)(reducers, initialState);
}







