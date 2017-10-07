
export const EMIT_NOTIFICATION = "EMIT_NOTIFICATION";
export const CLEAR_NOTIFICATIONS = "CLEAR_NOTIFICATION";
export const CLEAR_FIRST_NOTIFICATION = "CLEAR_FIRST_NOTIFICATION";

export const ALERT_TYPE = {
    SUCCESS: "ALERT_TYPE_SUCCESS",
    INFO: "ALERT_TYPE_INFO",
    WARNING: "ALERT_TYPE_WARNING",
    DANGER: "ALERT_TYPE_DANGER"
}


export function emitNotification(message, type = ALERT_TYPE.INFO){
    return {
        type: EMIT_NOTIFICATION,
        payload: {
            message: message,
            type: type
        }
    };
}

export function clearNotifications(){
    return {
        type: CLEAR_NOTIFICATIONS
    };
}

export function clearFirstNotification(){
    return {
        type: CLEAR_FIRST_NOTIFICATION
    };
}