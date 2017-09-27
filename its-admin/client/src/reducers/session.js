import {Actions} from "../helpers/Constants";
import * as SessionActions from "../actions/SessionActions";
import * as StaffActions from "../actions/StaffActions";

const initialSession = {
    currentUser: null,
    loggingIn: false,
    assigningRole: false
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
        case SessionActions.ASSIGNING_NEW_USER_ROLE:
            return {
                ...state,
                assigningRole: true
            };
        case SessionActions.NEW_USER_ROLE_ASSIGNED:
            return {
                ...state,
                assigningRole: false,
                currentUser: {
                    ...state.currentUser,
                    role: action.payload
                }
            }
        case StaffActions.GETTING_STAFF_ROLE:
            if (state.currentUser == null) {
                return state;
            }
            if (typeof state.currentUser.role == "undefined") {
                return state;
            }
            if (state.currentUser.uid == action.payload.uid) {
                return {
                    ...state,
                    currentUser: {
                        ...state.currentUser,
                        role: action.payload.role
                    }
                }
            }
        default:
            return state;
    }
}
