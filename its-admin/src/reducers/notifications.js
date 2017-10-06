import * as NotificationActions from "../actions/NotificationActions";

const initialState = [];

export default function notification(state = initialState, action){
    switch(action.type){
        case NotificationActions.EMIT_NOTIFICATION:
            return initialState.concat([
                action.payload
            ]);
        case NotificationActions.CLEAR_NOTIFICATIONS:
            return [];
        case NotificationActions.CLEAR_FIRST_NOTIFICATION:
            return state.slice(1);
        default:
            return state
    }
}