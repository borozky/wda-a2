import React, { Component } from 'react';
import DashboardSection from "./DashboardSection";
import DashboardTickets from "./DashboardTickets";
import TicketSummary from "./TicketSummary";

import moment from "moment";
import {connect} from "react-redux";

class DashboardSection_AssignedTickets extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedTicket: null,
            tickets: this.props.tickets
        }
        this.handleOnSelectRow = this.handleOnSelectRow.bind(this);
    }

    handleOnSelectRow(event, ticket){
        console.log("EVENT", event);
        console.log("CLICKED_TICKET", ticket);
        this.setState({selectedTicket: ticket})
    }


    render() {
        return (
            <DashboardSection title={`Tickets assigned to ${this.props.fullname}`}>
                <div className="row">
                    <div className="col-xs-12 col-sm-8">
                        <DashboardTickets onSelectRow={this.handleOnSelectRow} tickets={this.props.tickets}/>
                    </div>
                    <div className="col-xs-12 col-sm-4">{this.state.selectedTicket ?
                        <TicketSummary ticket={this.state.selectedTicket}/> :
                        <span>Select a ticket to preview</span>
                    }</div>
                </div>
            </DashboardSection>
        );
    }
}

const mapStateToProps = (state) => {
    const email = state.session.currentUser.email;
    return {
        email: email,
        fullname: state.session.currentUser.displayName,
        tickets: state.tickets.foundTickets.filter(ticket => ticket.assigned_to_email === email).sort(function(ticketA, ticketB){
            const dateA = moment(ticketA.created_at).toDate();
            const dateB = moment(ticketB.created_at).toDate();
            return dateA < dateB;
        }) || []
    }
}

export default connect(mapStateToProps)(DashboardSection_AssignedTickets);