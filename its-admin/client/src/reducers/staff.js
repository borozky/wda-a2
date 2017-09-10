import * as StaffActions from "../actions/StaffActions";

const initialState = {
    data: []
}

export default function staff(state = initialState, action){
    switch (action.type) {
        case StaffActions.GET_ALL_STAFF:
            return action.payload;
        default:
            return state;
    }
}
