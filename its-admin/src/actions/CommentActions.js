import axios from "axios";

export const ADD_COMMENT = "ADD_COMMENT";
export const ADDING_COMMENT = "ADDING_COMMENT";
export const COMMENT_ADDED = "COMMENT_ADDED";

export const GETTING_ALL_COMMENTS = "GETTING_ALL_COMMENTS";
export const COMMENTS_RETRIEVED = "COMMENTS_RETRIEVED";

export const GETTING_TICKET_COMMENTS = "GETTING_TICKET_COMMENTS";
export const TICKET_COMMENTS_RETRIEVED = "TICKET_COMMENTS_RETRIEVED";

const COMMENTS_DATASOURCE_URL = `${process.env.REACT_APP_DATASOURCE_URL}api/comments`;
const TICKET_COMMENTS_DATASOURCE_URL = (ticket_id) => (`${process.env.REACT_APP_DATASOURCE_URL}api/tickets/${ticket_id}/comments`);


// Add comment to a ticket
// Requires ticket ID, the comment, commentor ID, email and his/her fullname
export const addComment = (ticketID, comment, user) => (dispatch, getState) => { 
    const user = getState().session.currentUser;

    axios.post(COMMENTS_DATASOURCE_URL, {
        "ticket_id": ticketID,
        "details": comment,
        "commentor_id": user.uid,
        "commentor_email": user.email,
        "commentor_fullname": user.displayName
    }).then(response => {
        dispatch({
            type: COMMENT_ADDED,
            payload: [response.data]
        });
    }).catch(error => {
        console.log(error);
    })
}


// Get all comments of all tickets
export const getAllComments = () => (dispatch, getState) => {
    dispatch({type: GETTING_ALL_COMMENTS});
    axios.get(COMMENTS_DATASOURCE_URL).then(response => {
        dispatch({
            type: COMMENTS_RETRIEVED,
            payload: response.data
        });
    });
}


// Get all comments from specific ticket ID
export const getCommentsByTicketID = (ticket_id) => (dispatch, getState) => {
    dispatch({ type: GETTING_TICKET_COMMENTS });
    axios.get(TICKET_COMMENTS_DATASOURCE_URL(ticket_id))
    .then(response => {
        dispatch({
            type: TICKET_COMMENTS_RETRIEVED,
            payload: response.data
        });
    }).catch(error => {
        console.log("TICKET COMMENTS ERROR", error);
    });
}