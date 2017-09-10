import {provider, auth} from '../client';

export const LOGGING_IN = "LOGGING_IN";
export const LOGGED_IN = "LOGGED_IN";
export const LOGGING_OUT = "LOGGING_OUT";
export const LOGGED_OUT = "LOGGED_OUT";

export const checkUserSession = () => (dispatch, getState) => {
    auth().onAuthStateChanged(user => {
        if (user) {
            dispatch({
                type: LOGGED_IN,
                payload: { currentUser: user }
            });
        }
    });
}

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