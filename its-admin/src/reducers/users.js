import * as UserActions from "../actions/UserActions";

const initialState = {
    data: [],
    loading: false
}

export default function users(state = initialState, action){
    switch (action.type){ 
        case UserActions.GETTING_ALL_USERS:
            return {
                ...state,
                loading: true
            }
        case UserActions.USERS_RETRIEVED:
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        default:
            return state
    }
}