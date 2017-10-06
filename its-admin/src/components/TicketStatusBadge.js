import React from 'react';
import "../stylesheets/TicketStatusBadge.css";

export default (props) => 
    <button {...props} className={`btn btn-xs ticket-status-badge status-${props.status.replace(' ', '-').toLowerCase()}`}>
        {props.status.toString()}
        {props.children}
    </button>