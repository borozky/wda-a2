import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/index"; 
import thunk from "redux-thunk";

//store.subscribe(() => console.log("State", store.getState()));
const stateLogger = store => next => action => {
    let result;
    console.groupCollapsed(`DISPATCHING ${action.type}`);
    console.log("State BEFORE ACTION", store.getState());
    result = next(action);
    console.log("State AFTER ACTION", store.getState());
    console.groupEnd();
    return result;
}

export default (initialState = {}) => {
    return applyMiddleware(thunk, stateLogger)(createStore)(reducers, initialState);
}





