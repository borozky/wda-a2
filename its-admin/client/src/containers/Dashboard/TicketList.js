import React from 'react';
import "../../stylesheets/TicketList.css";


class Ticket {
    constructor(id, user, subject, details, software_issue, operating_system, created_at, status){
        this.id = id;
        this.user = user;
        this.details = details;
        this.software_issue = software_issue;
        this.operating_system = operating_system;
        this.created_at = created_at;
        this.status = status;
    }
}



export default ({tickets}) => {
    return (
        <div className="ticket-list-parent">
            <div className="ticket-list">
                <ul>{tickets.map(ticket => (
                    <li key={ticket.id}>
                        <div className={`ticket ticket-${ticket.status.toLowerCase()}`} id={`Ticket-${ticket.id}`}>
                            <span className="ticket-icon">{ticket.user.fullname.split("")[0]}</span>
                            <span className="ticket-subject">{ticket.subject}</span>
                            <span className="ticket-user">From: {ticket.user.fullname} &lt;{ticket.user.email}&gt;</span>
                            <span className="ticket-status">{ticket.status}</span>
                        </div>
                    </li>
                ))}</ul>
            </div>
        </div>
    );
}