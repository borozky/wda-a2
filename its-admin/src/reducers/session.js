import {Actions} from "../helpers/Constants";
import * as SessionActions from "../actions/SessionActions";
import * as StaffActions from "../actions/StaffActions";

const initialSession = {
    currentUser: null,
    loggingIn: false,
    assigningRole: false,
    signingUp: false,
    updatingProfile: false,
    loadingProfile: false,
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
        case SessionActions.LOGIN_FAIL: 
            return {
                ...state,
                loggingIn: false,
            };
        case SessionActions.USERSESSION_CHECKED:
            return {
                ...state,
                loggingIn: false,
                signingUp: false,
                assigningRole: false
            };
        case SessionActions.LOGGING_OUT:
        case SessionActions.LOGGED_OUT:
            return {
                ...state,
                currentUser: null,
                loggingIn: false
            }
        case SessionActions.SIGNING_UP:
            return {
                ...state,
                signingUp: true
            };
        case SessionActions.SIGNED_UP:
            return {
                ...state,
                signingUp: false,
                currentUser: {
                    ...action.payload.currentUser,
                    role: action.payload.role,
                    displayName: action.payload.fullname
                }
            };
        case SessionActions.SIGNUP_FAILED:
            return {
                ...state,
                signingUp: false
            };
        case StaffActions.UPDATING_STAFF_PROFILE:
            return {
                ...state,
                updatingProfile: true
            }
        case StaffActions.STAFF_PROFILE_UPDATED:
            return {
                ...state,
                currentUser: {...state.currentUser, ...action.payload},
                updatingProfile: false,
            }
        case StaffActions.PROFILE_UPDATE_FAILED:
            return {
                ...state,
                updatingProfile: false
            }

        case StaffActions.GETTING_STAFF_PROFILE:
            return { ...state, loadingProfile: true };
        case StaffActions.STAFF_PROFILE_RETRIEVED:
            return {
                ...state,
                currentUser: {...state.currentUser, ...action.payload},
                loadingProfile: false
            };
        case StaffActions.STAFF_PROFILE_NOT_FOUND:
            return { ...state, loadingProfile: false }

        default:
            return state;
    }
}
