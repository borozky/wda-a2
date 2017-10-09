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

import "../../stylesheets/DashboardNavigation.css";

class HelpdeskDashboard extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        if (this.props.tickets.length == 0) {
            this.props.getAllTickets();
        }
    }

    render() {
        const {numberOfPendingTickets} = this.props;

        return (
            <div id="DashboardPage">
                <EntryHeader>
                    <h3>Dashboard</h3>
                </EntryHeader>
                <div className="site-content">
                    <div className="container">
                        <FixedWidthSidebar direction="left">
                            <Sidebar width={240}>
                            <nav id="DashboardNavigation">
                                <div className="list-group">
                                    <NavLink exact to="/dashboard" className="list-group-item" activeClassName="active">
                                        <span className="badge">{numberOfPendingTickets}</span>
                                        <i className="fa fa-hourglass-half"></i> &nbsp;
                                        Pending tickets
                                    </NavLink>
                                    <NavLink to="/dashboard/escalated-tickets" className="list-group-item" activeClassName="active">
                                        <span className="badge">{this.props.escalatedTickets.length}</span>
                                        <i className="fa fa-level-up"></i> &nbsp;
                                        Escalated tickets
                                    </NavLink>
                                    <NavLink exact to="/dashboard/assigned-tickets" className="list-group-item" activeClassName="active">
                                        <span className="badge">{this.props.assignedTickets.length}</span>
                                        <i className="fa fa-check-square-o"></i> &nbsp;
                                        Assigned tickets
                                    </NavLink>
                                    <NavLink to="/dashboard/staff-members" className="list-group-item" activeClassName="active">
                                        <i className="fa fa-users"></i> &nbsp;
                                        Staff List
                                    </NavLink>
                                </div>
                            </nav>
                            </Sidebar>
                            <ResponsiveContent style={{paddingLeft: 15, marginLeft: 240}} className={this.props.loadingTickets && `loading`}>
                                <Switch>
                                    <Route path="/dashboard/staff-members">
                                        <DashboardStaffList/>
                                    </Route>
                                    <Route path="/dashboard/escalated-tickets">
                                        <DashboardTickets tickets={this.props.escalatedTickets} title="Escalated tickets"/>
                                    </Route>
                                    <Route path="/dashboard/assigned-tickets">
                                        <DashboardTickets tickets={this.props.assignedTickets} title="Assigned tickets"/>
                                    </Route>
                                    <Route path="/dashboard">
                                        <DashboardTickets tickets={this.props.pendingTickets} title="Pending tickets"/>
                                    </Route>
                                </Switch>
                                <LoadingLayer />
                            </ResponsiveContent>
                        </FixedWidthSidebar>
                    </div>
                </div>
            </div>
        );
    }
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
    const pendingTickets = tickets.filter(t => t.status.toLowerCase() == "Pending".toLowerCase());
    const staff = state.staff.data;
    const escalatedTickets = tickets.filter(t => t.assigned_to_uid && t.escalation_level > 1);
    const assignedTickets = tickets.filter(ticket => ticket.assigned_to_uid && ticket.status != "Pending");
    return {
        currentUser: state.session.currentUser,
        tickets: tickets,
        loadingTickets: state.tickets.loading,
        pendingTickets: pendingTickets.sort(sortTicketsByPriority),
        assignedTickets: assignedTickets.sort(sortTicketsByPriority),
        escalatedTickets: escalatedTickets.sort(sortTicketsByPriority),
        numberOfPendingTickets: pendingTickets.length,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTickets: function(){
            dispatch(TicketActions.getAllTickets());
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HelpdeskDashboard));