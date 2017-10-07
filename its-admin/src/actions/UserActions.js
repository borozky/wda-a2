import axios from "axios";
import * as UserActions from "../actions/UserActions";

export const GETTING_ALL_USERS = "GETTING_ALL_USERS";
export const USERS_RETRIEVED = "USERS_RETRIEVED";
export const USERS_DATASOURCE_URL = `${process.env.REACT_APP_DATASOURCE_URL}api/users`;

// Get all users of all tickets
// This is not the users who manage tickets
export const getAllUsers = () => (dispatch, getState) => {
    dispatch({
        type: GETTING_ALL_USERS
    })

    axios.get(USERS_DATASOURCE_URL).then(response => {
        let users = response.data;
        dispatch({
            type: USERS_RETRIEVED,
            payload: users
        })
    });
}