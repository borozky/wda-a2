import {Actions} from "../helpers/Constants";
import * as SessionActions from "../actions/SessionActions";

const initialSession = {
    currentUser: null,
    loggingIn: false
}

export default function session(state = initialSession, action){
    switch(action.type){
        case SessionActions.LOGGING_IN:
            return {
                ...state,
                loggingIn: true
            };
        case SessionActions.LOGGED_IN:
            return {
                ...state,
                currentUser: action.payload.currentUser,
                loggingIn: false
            };
        case SessionActions.LOGGING_OUT:
        case SessionActions.LOGGED_OUT:
            return {
                ...state,
                currentUser: null,
                loggingIn: false
            }
        default:
            return state;
    }
}
