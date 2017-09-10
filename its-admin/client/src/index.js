import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';
import "./stylesheets/style.css";
import App from "./App";
import {Provider} from "react-redux";
import storeFactory from "./Store";

// import everything to help with type-hinting in VSCode
import * as TicketActions from "./actions/TicketActions";
import * as SessionActions from "./actions/SessionActions";
import * as CommentActions from "./actions/CommentActions";

let store = storeFactory();
window.React = React;
window.store = store;

store.dispatch(SessionActions.checkUserSession());
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);


// store.dispatch(TicketActions.getAllTickets());

// //store.dispatch(SessionActions.login());
// //store.dispatch(CommentActions.addComment(1, "This is a comment"));
// store.dispatch(CommentActions.getAllComments());
registerServiceWorker();


