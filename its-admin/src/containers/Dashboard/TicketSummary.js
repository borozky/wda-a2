import React from 'react';
import { Link } from "react-router-dom";

const TicketSummary = ({ticket, ticket: {user: user}, onClick, location}) => {
    return (
        <div className="ticket-summary">
            <div>
                <b>Subject: {ticket.subject}</b><br/>
                <span>Software issue: {ticket.software_issue}</span><br/>
                <i><small>From: {user.fullname} &lt;{user.email}&gt;</small></i><br/>
            </div>
            <br/>
            {/* <div>{ticket.details}</div> */}
            <div>
                <hr/>
                <Link to={`/tickets/${ticket.id}`} onClick={onClick} className="btn btn-xs btn-success">View more details</Link>
            </div>
            
        </div>
    );
};

export default TicketSummary;