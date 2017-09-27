import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';
import "./stylesheets/style.css";
import App from "./App";
import {Provider} from "react-redux";
import storeFactory from "./Store";
import * as SessionActions from "./actions/SessionActions";

let store = storeFactory();
window.React = React;
window.store = store;

// check user everytime the page is loaded
store.dispatch(SessionActions.checkUserSession());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);

registerServiceWorker();


