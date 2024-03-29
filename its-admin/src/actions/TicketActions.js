import faker from "faker";
import axios from "axios";
import * as UserActions from "./UserActions";
import Fuse from "fuse.js";

export const TICKET_DATASOURCE_URL = `${process.env.REACT_APP_DATASOURCE_URL}api/tickets`;
export const USERS_DATASOURCE_URL = `${process.env.REACT_APP_DATASOURCE_URL}api/users`;

export const GET_ALL_TICKETS = "GET_ALL_TICKETS";
export const GETTING_ALL_TICKETS = "GETTING_ALL_TICKETS";
export const TICKETS_RETRIEVED = "TICKETS_RETRIEVED";

export const SEARCHING_TICKETS = "SEARCHING_TICKETS";
export const TICKETS_SEARCHED = "TICKETS_SEARCHED";

export const UPDATING_TICKET = "UPDATING_TICKET";
export const TICKET_UPDATED = "TICKET_UPDATED";
export const TICKET_UPDATE_FAILED = "TICKET_UPDATE_FAILED";


// Get all tickets
export const getAllTickets = () => (dispatch, getState) => {
    dispatch({ type: GETTING_ALL_TICKETS });
    axios.all([
        axios.get(TICKET_DATASOURCE_URL),
        axios.get(USERS_DATASOURCE_URL)
    ])
    .then(axios.spread(function(ticketReponse, usersResponse){

        // users retrieved
        dispatch({
            type: UserActions.USERS_RETRIEVED,
            payload: usersResponse.data
        });

        // supply user information into each ticket
        let tickets = ticketReponse.data.map(ticket => {
            let foundUser = usersResponse.data.filter(user => (ticket.user_id).toString() == (user.id).toString());
            return {
                ...ticket,
                user: foundUser[0] || { fullname: null, email: null, id: null }
            }
        });

        // tickets retrieved
        dispatch({
            type: TICKETS_RETRIEVED,
            payload: tickets
        });

    }));
}


// Search tickets based on their ID, subject, software issue or OS
export const searchTickets = (keyword) => (dispatch, getState) => {
    dispatch({ type: SEARCHING_TICKETS, payload: keyword.toString().trim() });
    
    const tickets = getState().tickets.data;
    if (keyword.trim().length === 0) {
        dispatch({
            type: TICKETS_SEARCHED,
            payload: {
                foundTickets: tickets,
                searchTerm: keyword
            }
        })

    } else {
        const fuse = new Fuse(tickets, {
            shouldSort: true,
            threshold: 0.1,
            location: 0,
            distance: 1000,
            maxPatternLength: 32,
            minMatchCharLength: 0,
            keys: ["id", "subject", "software_issue", "operating_system"]
        });

        dispatch({
            type: TICKETS_SEARCHED,
            payload: {
                foundTickets: fuse.search(keyword),
                searchTerm: keyword,
            }
        })
    }
}


// Update ticket information
export const updateTicket = (ticketID, properties = {}) => (dispatch, getState) => {
    dispatch({ type: UPDATING_TICKET });

    axios.put(TICKET_DATASOURCE_URL + "/" + ticketID, properties).then(function(response){
        console.log("UPDATING TICKET: " + ticketID + " WITH RESPONSE", response);

        dispatch({
            type: TICKET_UPDATED,
            payload: response.data
        });
    }).catch(function(error){
        dispatch({
            type: TICKET_UPDATE_FAILED,
            payload: ticketID
        })
    });
}

