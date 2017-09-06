import React, { Component } from 'react';
import EntryHeader from "../../components/EntryHeader";
import moment from "moment";
import "../../stylesheets/TicketsPage.css";
import faker from "faker";

class TicketsPage extends Component {

    constructor(props){
        super(props);
        
        const operating_system = ["Windows", "Mac", "Linux"];
        const software_issue = [
            "Google services setup", 
            "Service accounts", 
            "Storage",
            "Cloud storage increase",
            "Wifi Setup",
            "Printing",
            "Misconfigured software",
            "other"
        ];
        let tickets = [];
        for(let i = 0; i < 1000; i++){
            tickets.push({
                id: i + 1,
                user: {
                    fullname: faker.name.findName(), 
                    email: faker.internet.email()
                },
                operating_system: operating_system[parseInt(Math.random() * operating_system.length, 10)],
                software_issue: software_issue[parseInt(Math.random() * software_issue.length, 10)],
                subject: faker.lorem.words(),
                details: faker.lorem.text(),
                status: "PENDING",
                created_at: faker.date.recent()
            });
        }
        let currentPage = 0;
        let itemsPerPage = 10;
        let numPages = Math.ceil(tickets.length / itemsPerPage);
        let firstItemIndex = 0;
        let displayedTickets = tickets.slice(firstItemIndex, firstItemIndex + itemsPerPage)

        let state = {
            searchTerm: "",
            tickets: tickets,
            currentPage: 0,
            itemsPerPage: 10,
            firstItemIndex: currentPage * itemsPerPage,
            numPages: function(){ return Math.ceil(state.tickets.length / state.itemsPerPage)},
            displayedTickets: function(){ return state.tickets.slice(state.firstItemIndex, state.firstItemIndex + state.itemsPerPage)}
        }

        this.state = state;
    }

    handleSearchButtonOnClick(event){
        event.preventDefault();

        // much faster this way!
        let searchTerm = document.getElementById("SearchInput").value.toLowerCase();

        if(searchTerm.split("").length === 0){
            this.setState({displayedTickets: this.state.tickets});
            return;
        } else {
            let displayedTickets = this.state.tickets.filter(ticket => {
                if(ticket.id.toString().indexOf(searchTerm) !== -1) return true;
                if(ticket.user.fullname.replace(" ", "").toLowerCase().indexOf(searchTerm) !== -1) return true;
                if(ticket.user.email.indexOf(searchTerm) !== -1) return true;
                if(ticket.operating_system.replace(" ", "").toLowerCase().indexOf(searchTerm) !== -1) return true;
                if(ticket.software_issue.replace(" ", "").toLowerCase().indexOf(searchTerm) !== -1) return true;
                if(ticket.subject.replace(" ", "").toLowerCase().indexOf(searchTerm) !== -1) return true;
                if(ticket.status.replace(" ", "").toLowerCase().indexOf(searchTerm) !== -1) return true;
            });

            this.setState({
                displayedTickets: displayedTickets.slice(0, 10)
            })
        }
    }


    render() {

        return (
            <div id="TicketsPage">
                <EntryHeader><h3>Tickets</h3></EntryHeader>
                <div className="container">
                    <div className="site-content">
                        <div className="controls clearfix">
                            <div className="controls-left-section">
                                ({this.state.firstItemIndex + 1} - {this.state.itemsPerPage} of {this.state.tickets.length})
                            </div>
                            <div className="controls-right-section">
                                <input type="text" id="SearchInput" name="search" className="form-control input-xs"/>
                                <button className="btn btn-sm btn-primary" onClick={event => this.handleSearchButtonOnClick(event)}>Search</button>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="tickets-table">
                                <thead>
                                    <tr>
                                        <th>Ticket</th>
                                        <th>Status</th>
                                        <th>Assigned to</th>
                                        <th>Created</th>
                                        <th>Last update</th>
                                    </tr>
                                </thead>
                                <tbody>{this.state.displayedTickets().map(ticket => 
                                    <tr key={ticket.id}>
                                        <td>
                                            <div className="ticket-summary">
                                                <b className="ticket-subject">{ticket.subject}</b><br/>
                                                <small className="ticket-meta">{ticket.software_issue} ({ticket.operating_system})</small>
                                                <span className="ticket-id">#{ticket.id}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="ticket-status">{ticket.status.toString().toLowerCase()}</span>
                                        </td>
                                        <td><span className="ticket-assigned_to"></span></td>
                                        <td><span className="ticket-created_at">{moment(ticket.created_at).format("DD/MM/YYYY").toString()}</span></td>
                                        <td><span className="ticket-last_update"></span></td>
                                    </tr>
                                )}</tbody>
                            </table>
                        </div>

                        <div>
                            <button onClick={e => {this.setState({currentPage: this.state.currentPage + 1})}}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TicketsPage;