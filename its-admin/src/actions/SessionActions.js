import {provider, auth, ref} from '../client';
import * as StaffActions from "./StaffActions";

export const LOGGING_IN = "LOGGING_IN";
export const LOGGED_IN = "LOGGED_IN";

export const LOGGING_OUT = "LOGGING_OUT";
export const LOGGED_OUT = "LOGGED_OUT";

export const ASSIGNING_NEW_USER_ROLE = "ASSIGNING_NEW_USER_ROLE";
export const NEW_USER_ROLE_ASSIGNED = "NEW_USER_ROLE_ASSIGNED";

export const SIGNING_UP = "SIGNING_UP";
export const SIGNED_UP = "SIGNED_UP";
export const SIGNUP_FAILED = "SIGNUP_FAILED";

export const USERSESSION_CHECKED = "USERSESSION_CHECKED"


// check user sessions. Also identify what kind of role the user have
export const checkUserSession = () => (dispatch, getState) => {
    dispatch({ type: LOGGING_IN });
    auth().onAuthStateChanged(user => {
        if (user) {
            dispatch({
                type: LOGGED_IN,
                payload: { currentUser: user }
            });
            dispatch(StaffActions.getStaffProfile(user.uid));
        }
        dispatch({ type: USERSESSION_CHECKED });
    });
}

// Login. Also identify what kind of role the user have
export const login = () => (dispatch, getState) => {
    let state = getState();
    if (state.session.currentUser === null) {
        dispatch({ type: LOGGING_IN });
        auth().signInWithPopup(provider).then(result => {
            dispatch({
                type: LOGGED_IN,
                payload: { currentUser: result.user }
            });
        });
    }
}

export const logout = () => (dispatch, getState) => {
    dispatch({ type: LOGGING_OUT });
    auth().signOut().then(result => {
        dispatch({ type: LOGGED_OUT });
    });
}


export const register = (staffDetails = {}) => (dispatch, getState) => {
    const {email, password, fullname} = staffDetails;
    const role = staffDetails.tech ? "tech" : "helpdesk";

    dispatch({ type: SIGNING_UP });

    auth().createUserWithEmailAndPassword(email, password).then(function(user){
        ref.child(`staff/${user.uid}`).set({
            fullname: fullname,
            email: email
        }, function(error){
            if (error) {
                dispatch({type: SIGNUP_FAILED, payload: error.message})
            } else {
                dispatch({
                    type: SIGNED_UP, 
                    payload: {
                        currentUser: user,
                        fullname: fullname,
                        email: email,
                        role: role
                    }
                })
            }
        })
    })
    .catch(function(error){
        dispatch({
            type: SIGNUP_FAILED,
            payload: error.message
        })
    });
}