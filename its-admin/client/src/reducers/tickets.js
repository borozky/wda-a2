import * as TicketActions from "../actions/TicketActions";
import * as CommentActions from "../actions/CommentActions";

const initialState = {
    data: [],
    foundTickets: [],
    searchTerm: "",
    loading: false
}

export default function tickets(state = initialState, action){
    switch (action.type) {
        case TicketActions.GETTING_ALL_TICKETS:
            return {
                ...state,
                loading: true
            };
        case TicketActions.TICKETS_RETRIEVED:
            return {
                ...state,
                data: action.payload,
                foundTickets: action.payload,
                loading: false
            };
        case TicketActions.SEARCHING_TICKETS:
            return {
                ...state,
                searchTerm: action.payload,
                loading: true
            }
        case TicketActions.TICKETS_SEARCHED:
            return {
                ...state,
                searchTerm: action.payload.searchTerm,
                foundTickets: action.payload.foundTickets,
                loading: false
            }
        default:
            return state;
    }
}
