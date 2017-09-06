import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';
import "./stylesheets/style.css";
import SiteWrapper from "./SiteWrapper";

ReactDOM.render(<BrowserRouter><SiteWrapper /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
