import React, { Component } from 'react';
import {NavLink} from "react-router-dom";

import "../../stylesheets/DashboardNavigation.css";

class DashboardNavigation extends Component {
    render() {
        return (
            <nav id="DashboardNavigation">
                <div className="list-group">
                    <NavLink exact to="/dashboard" className="list-group-item" activeClassName="active">
                        <i className="fa fa-list"></i> &nbsp;
                        Overview
                    </NavLink>
                    <NavLink to="/dashboard/assigned-tickets" className="list-group-item" activeClassName="active">
                    <i className="fa fa-check-square-o"></i> &nbsp;
                        Tickets assigned to me
                    </NavLink>
                    <NavLink to="/dashboard/pending-tickets" className="list-group-item" activeClassName="active">
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

export default DashboardNavigation;