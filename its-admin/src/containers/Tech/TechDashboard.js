import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Route, Switch, NavLink } from "react-router-dom";

import { FixedWidthSidebar, Sidebar, ResponsiveContent } from "../../components/FixedWidthSidebar";

import EntryHeader from "../../components/EntryHeader";
import DashboardTickets from "../Dashboard/DashboardTickets";
import DashboardStaffList from "../Dashboard/DashboardStaffList";
import LoadingLayer from "../../components/LoadingLayer";
import * as TicketActions from "../../actions/TicketActions";
import moment from "moment";
import TicketStatusBadge from "../../components/TicketStatusBadge";

import "../../stylesheets/DashboardNavigation.css";

const TechDashboardTicketRow = ({onSelectRow, ticket = {}, active = false}) => {
    const {subject, software_issue, operating_system, id, created_at} = ticket;
    return (
        <tr onClick={e => onSelectRow(e, ticket)} className={ active ? "selected" : ""}>
            <td>
                <div className="ticket-summary">
                    <b className="ticket-subject">{subject}</b><br/>
                    <small className="ticket-meta">{software_issue} ({operating_system})</small> &nbsp;
                    <span className="ticket-id">#{id}</span>
                </div>
            </td>
            <td><TicketStatusBadge status={ticket.status}/></td>
            <td>{ticket.escalation_level && `Level ${ticket.escalation_level}`}</td>
            <td className={`ticket-priority-${ticket.priority}`}>{ticket.priority}</td>
            <td>
                <span className="ticket-created_at">{moment(created_at).format("DD/MM/YYYY").toString()}</span><br/>
                <small><i>{moment(moment.utc(created_at)).local().fromNow()}</i></small>
            </td>
        </tr>
    );
};

class TechDashboard extends Component {
    constructor(props){
        super(props);

        this.handleSelectedTicket = this.handleSelectedTicket.bind(this);
    }
    
    componentDidMount(){
        if (this.props.tickets.length == 0) {
            this.props.getAllTickets();
        }
    }

    handleSelectedTicket(e, ticket){
        this.setState({selectedTicket: ticket});
        this.props.history.push(`/tickets/${ticket.id}`);
    }

    render() {
        const {numberOfCurrentlyAssignedTickets} = this.props;

        return (
            <div id="DashboardPage">
                <EntryHeader>
                    <h3>Dashboard</h3>
                </EntryHeader>
                <div className="site-content">
                    <div className="container">
                        <div className={this.props.loadingTickets && `loading`}>
                             <DashboardTickets tickets={this.props.assignedTickets} 
                                                columns={["Tickets", "Status", "Escalation level", "Priority" ,"Created"]} 
                                                title="Assigned tickets">{(ticket, index) => 
                                <TechDashboardTicketRow onSelectRow={this.handleSelectedTicket} key={index} ticket={ticket}/>
                             }</DashboardTickets>
                            <LoadingLayer />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// recent tickets first
function sortTicketsByDate(ticketA, ticketB){
    const dateA = moment(ticketA.created_at).toDate();
    const dateB = moment(ticketB.created_at).toDate();
    return dateA < dateB;
}

// TICKET SORTING ALGORITHM
// Resolved/Unresolved tickets are displayed last
// Tickets with higher priority displayed first, or
// Sort by escalation level
// if everything is equal, sort by date
function sortTicketsByPriority (ticketA, ticketB) {
    const dateA = moment(ticketA.created_at).toDate();
    const dateB = moment(ticketB.created_at).toDate();
    const importance = { "low": 1, "medium": 2, "high": 3 };
    const statusImportance = {"Pending": 3, "In Progress": 2, "Unresolved": 1, "Resolved": 0};
    if (ticketA.status == "Resolved" || ticketA.status == "Unresolved") {
        return Infinity;
    }

    if (ticketA.priority == ticketB.priority) {
        if (ticketA.status == ticketB.status) {
            if (ticketA.escalation_level != ticketB.escalation_level) {
                return (ticketB.escalation_level || 0) - (ticketA.escalation_level || 0);
            }
        }
        return dateA < dateB
    } else {
        return importance[ticketB.priority] - importance[ticketA.priority];
    }
}

const mapStateToProps = (state) => {
    const tickets = state.tickets.data;
    const assignedTickets = tickets.filter(ticket => ticket.assigned_to_uid === state.session.currentUser.uid)

    return {
        currentUser: state.session.currentUser,
        tickets: tickets,
        loadingTickets: state.tickets.loading,
        numbnumberOfCurrentlyAssignedTickets: assignedTickets.length,
        assignedTickets: assignedTickets.sort(sortTicketsByPriority),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllTickets: function(){
            dispatch(TicketActions.getAllTickets());
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TechDashboard));