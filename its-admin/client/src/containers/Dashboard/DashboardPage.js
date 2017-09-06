import React, { Component } from 'react';
import EntryHeader from "../../components/EntryHeader";
import DashboardSection from "./DashboardSection";

import "../../stylesheets/TicketList.css";

//import TicketList from "./TicketList";

class DashboardPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            tickets: [
                {
                    id: 1,
                    user: {fullname: "Joshua Orozco", email: "s3485376@student.rmit.edu.au"},
                    operating_system: "Linux",
                    software_issue: "Google drive setup",
                    subject: "Sample subject",
                    details: "Details blah blah blah blah",
                    status: "PENDING",
                    created_at: new Date()
                },
                {
                    id: 2,
                    user: {fullname: "Joshua Orozco", email: "s3485376@student.rmit.edu.au"},
                    operating_system: "Linux",
                    software_issue: "Another software issue",
                    subject: "Another sample subject",
                    details: "Details blah blah blah blah",
                    status: "PENDING",
                    created_at: new Date()
                }
            ]
        }
    }

    render() {
        return (
            <div id="DashboardPage">
                <EntryHeader><h3>Dashboard Page</h3></EntryHeader>
                <div className="site-content">
                    <DashboardSection title="New tickets">
                        <div className="ticket-list">
                            <ul>{this.state.tickets.map(ticket => (
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
                    </DashboardSection>
                </div>
            </div>
        );
    }
}

export default DashboardPage;