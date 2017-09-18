import faker from "faker";
import axios from "axios";

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
export const GET_ALL_TICKETS = "GET_ALL_TICKETS";
export const GETTING_ALL_TICKETS = "GETTING_ALL_TICKETS";
export const TICKETS_RETRIEVED = "TICKETS_RETRIEVED";

export const getAllTickets = () => (dispatch, getState) => {
    console.log("getting tickets from " + TICKET_DATASOURCE_URL);

    dispatch({ type: GETTING_ALL_TICKETS });
    
    axios.get(TICKET_DATASOURCE_URL).then(response => {
        dispatch({
            type: TICKETS_RETRIEVED,
            payload: response.data
        });
    });
}