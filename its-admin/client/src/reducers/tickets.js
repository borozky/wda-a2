import * as TicketActions from "../actions/TicketActions";
import * as CommentActions from "../actions/CommentActions";

const initialState = {
    data: [],
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
                loading: false
            };
        default:
            return state;
    }
}
