import React, { Component } from 'react';
import {NavLink, withRouter} from "react-router-dom";
import {connect} from "react-redux";

import "../../stylesheets/DashboardNavigation.css";

class DashboardNavigation extends Component {
    render() {
        const {numberOfPendingTickets, numberOfCurrentlyAssignedTickets} = this.props;

        return (
            <nav id="DashboardNavigation">
                <div className="list-group">
                    <NavLink exact to="/dashboard" className="list-group-item" activeClassName="active">
                        <i className="fa fa-list"></i> &nbsp;
                        Overview
                    </NavLink>
                    <NavLink to="/dashboard/assigned-tickets" className="list-group-item" activeClassName="active">
                    <span className="badge">{numberOfCurrentlyAssignedTickets}</span>
                    <i className="fa fa-check-square-o"></i> &nbsp;
                        Tickets assigned to me
                    </NavLink>
                    <NavLink to="/dashboard/pending-tickets" className="list-group-item" activeClassName="active">
                        <span className="badge">{numberOfPendingTickets}</span>
                        <i className="fa fa-hourglass-half"></i> &nbsp;
                        Pending tickets
                    </NavLink>
                    <NavLink to="/dashboard/staff-members" className="list-group-item" activeClassName="active">
                        <i className="fa fa-users"></i> &nbsp;
                        Staff List
                    </NavLink>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    let currentUser = state.session.currentUser;
    let numberOfPendingTickets = state.tickets.data.filter(t => t.status == "Pending").length;

    return {
        numberOfPendingTickets: numberOfPendingTickets,
        numberOfCurrentlyAssignedTickets: state.tickets.data.filter(t => t.assigned_to_uid == currentUser.uid).length
    }
}

export default withRouter(connect(mapStateToProps)(DashboardNavigation));