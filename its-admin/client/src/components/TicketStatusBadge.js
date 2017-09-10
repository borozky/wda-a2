import React from 'react';
import "../stylesheets/TicketStatusBadge.css";

export default ({status}) => 
    <span className={`btn btn-xs ticket-status-badge status-${status.replace('_', '-').toLowerCase()}`}>
        {status.toString()}
    </span>