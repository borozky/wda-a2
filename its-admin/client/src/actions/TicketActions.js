import faker from "faker";
import axios from "axios";
import * as UserActions from "./UserActions";
import Fuse from "fuse.js";

function generateFakeTickets(numberOfTickets = 100){
    const operating_system = ["Windows", "Mac", "Linux"];
    const software_issue = [ "Google services setup", "Service accounts", "Storage", "Cloud storage increase", "Wifi Setup", "Printing", "Misconfigured software", "other"];
    let tickets = [];
    for(let i = 0; i < numberOfTickets; i++){
        tickets.push({
            id: i + 1,
            user: { fullname: faker.name.findName(), email: faker.internet.email() },
            operating_system: operating_system[parseInt(Math.random() * operating_system.length, 10)],
            software_issue: software_issue[parseInt(Math.random() * software_issue.length, 10)],
            subject: faker.lorem.words(),
            details: faker.lorem.text(),
            status: "PENDING",
            created_at: faker.date.recent()
        });
    };
    return tickets.sort((a, b) => b.created_at - a.created_at);
}

export const TICKET_DATASOURCE_URL = `${process.env.REACT_APP_DATASOURCE_URL}api/tickets`;
export const USERS_DATASOURCE_URL = `${process.env.REACT_APP_DATASOURCE_URL}api/users`;
export const GET_ALL_TICKETS = "GET_ALL_TICKETS";
export const GETTING_ALL_TICKETS = "GETTING_ALL_TICKETS";
export const TICKETS_RETRIEVED = "TICKETS_RETRIEVED";
export const SEARCHING_TICKETS = "SEARCHING_TICKETS";
export const TICKETS_SEARCHED = "TICKETS_SEARCHED";

export const getAllTickets = () => (dispatch, getState) => {
    console.log("getting tickets from " + TICKET_DATASOURCE_URL);

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
