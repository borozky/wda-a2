import axios from "axios";

export const ADD_COMMENT = "ADD_COMMENT";
export const ADDING_COMMENT = "ADDING_COMMENT";
export const COMMENT_ADDED = "COMMENT_ADDED";
export const GETTING_ALL_COMMENTS = "GETTING_ALL_COMMENTS";
export const COMMENTS_RETRIEVED = "COMMENTS_RETRIEVED";

const COMMENTS_DATASOURCE_URL = `${process.env.REACT_APP_DATASOURCE_URL}api/comments`;

export const addComment = (ticketID, comment) => (dispatch, getState) => { 
    const user = getState().session.currentUser;
    const date = (new Date()).toISOString();

    dispatch({
        type: COMMENT_ADDED,
        payload: {
            id: null,
            ticketID: ticketID,
            user: user,
            details: comment,
            date: date
        }
    });
}

export const getAllComments = () => (dispatch, getState) => {
    dispatch({type: GETTING_ALL_COMMENTS});
    axios.get(COMMENTS_DATASOURCE_URL).then(response => {
        dispatch({
            type: COMMENTS_RETRIEVED,
            payload: response.data
        });
    });
}