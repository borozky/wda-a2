import {combineReducers} from "redux";
import tickets from "./tickets";
import session from "./session";
import comments from "./comments";
import staff from "./staff";
import users from "./users";
import notifications from "./notifications";
// TODO: additional reducer imports here

export default combineReducers({
    tickets: tickets,
    session: session,
    comments: comments,
    staff: staff,
    notifications: notifications,
    users: users
});