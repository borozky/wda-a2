import * as StaffActions from "../actions/StaffActions";

const initialState = {
    data: [],
    loading: false
}

export default function staff(state = initialState, action){
    switch (action.type) {
        case StaffActions.GETTING_ALL_STAFF:
            return {
                ...state,
                loading: true
            };
        case StaffActions.STAFF_RETRIEVED:
            return {
                data: action.payload,
                loading: false
            };
        default:
            return state;
    }
}
