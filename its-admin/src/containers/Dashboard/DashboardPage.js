import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";

import { FixedWidthSidebar, Sidebar, ResponsiveContent } from "../../components/FixedWidthSidebar";

import EntryHeader from "../../components/EntryHeader";
import DashboardSection from "./DashboardSection";
import DashboardSection_Tickets from "./DashboardSection_Tickets";
import DashboardSection_AssignedTickets from "./DashboardSection_AssignedTickets";
import DashboardNavigation from "./DashboardNavigation";
import DashboardTickets from "./DashboardTickets";
import DashboardOverview from "./DashboardOverview";
import DashboardStaffList from "./DashboardStaffList";
import RefreshTickets from "../../components/RefreshTickets";
import * as TicketActions from "../../actions/TicketActions";

import moment from "moment";


import "../../stylesheets/TicketList.css";
import "../../stylesheets/Dashboard.css";

class DashboardPage extends Component {

    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        if (this.props.tickets.length == 0) {
            this.props.getAllTickets();
        }
    }

    render() {
        return (
            <div id="DashboardPage">
                <EntryHeader>
                    <h3>Dashboard<br/>
                        <Switch>
                            <Route path="/dashboard/assigned-tickets"><small> Tickets assigned to me</small></Route>
                            <Route path="/dashboard/assigned-tickets"><small> Pending tickets</small></Route>
                            <Route path="/dashboard"><small> Overview</small></Route>
                        </Switch>
                    </h3>
                </EntryHeader>
                <div className="site-content">
                    <div className="container">
                        <FixedWidthSidebar direction="left">
                            <Sidebar width={240}>
                                <DashboardNavigation />
                            </Sidebar>
                            <ResponsiveContent style={{paddingLeft: 15, marginLeft: 240}}>
                                <Switch>
                                    <Route path="/dashboard/assigned-tickets">
                                        <DashboardTickets tickets={this.props.assignedTickets} title="Assigned tickets"/>
                                    </Route>
                                    <Route path="/dashboard/pending-tickets">
                                        <DashboardTickets tickets={this.props.pendingTickets} title="Pending tickets"/>
                                    </Route>
                                    <Route path="/dashboard/staff-members">
                                        <DashboardStaffList/>
                                    </Route>
                                    <Route path="/dashboard">
                                        <DashboardOverview />
                                    </Route>
                                </Switch>
                            </ResponsiveContent>
                        </FixedWidthSidebar>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.currentUser,
        tickets: state.tickets.data,
        pendingTickets: state.tickets.data.filter(ticket => ticket.status === "Pending").sort(function(ticketA, ticketB){
            const dateA = moment(ticketA.created_at).toDate();
            const dateB = moment(ticketB.created_at).toDate();
            return dateA < dateB;
        }),
        assignedTickets: state.tickets.data.filter(ticket => ticket.assigned_to_uid === state.session.currentUser.uid).sort(function(ticketA, ticketB){
            const dateA = moment(ticketA.created_at).toDate();
            const dateB = moment(ticketB.created_at).toDate();
            return dateA < dateB;
        }),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTickets: function(){
            dispatch(TicketActions.getAllTickets());
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardPage));