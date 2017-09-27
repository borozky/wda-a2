import {provider, auth, ref} from '../client';
import * as StaffActions from "./StaffActions";

export const LOGGING_IN = "LOGGING_IN";
export const LOGGED_IN = "LOGGED_IN";

export const LOGGING_OUT = "LOGGING_OUT";
export const LOGGED_OUT = "LOGGED_OUT";

export const ASSIGNING_NEW_USER_ROLE = "ASSIGNING_NEW_USER_ROLE";
export const NEW_USER_ROLE_ASSIGNED = "NEW_USER_ROLE_ASSIGNED";


// check user sessions. Also identify what kind of role the user have
export const checkUserSession = () => (dispatch, getState) => {
    dispatch({ type: LOGGING_IN });
    auth().onAuthStateChanged(user => {
        if (user) {
            dispatch({
                type: LOGGED_IN,
                payload: { currentUser: user }
            });
        }
        dispatch(StaffActions.getStaffRole(user.uid));
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


export const assignNewUserRole = (role) => (dispatch, getState) => {
    dispatch({ type: ASSIGNING_NEW_USER_ROLE });

    const userId = getState().session.currentUser.uid;

    ref.child(`staff/${userId}/role`).set(role, function(){
        dispatch({ type: NEW_USER_ROLE_ASSIGNED, payload: role })
    });

}