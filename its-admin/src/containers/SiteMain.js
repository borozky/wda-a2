import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";

import TicketsPage from "./Tickets/TicketsPage";

import HelpdeskDashboard from "./Helpdesk/HelpdeskDashboard";
import HelpdeskTicketPage from "./Helpdesk/HelpdeskTicketPage";

import TechDashboard from "./Tech/TechDashboard";
import TechTicketPage from "./Tech/TechTicketPage";
import ProfilePage from "./Tech/ProfilePage";

import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import * as TicketActions from "../actions/TicketActions";


class SiteMain extends Component {

    render() {
        if (this.props.currentUser.role && this.props.currentUser.role == "helpdesk") {
            return (
                <div className="site-main">
                    <Switch>
                        <Route exact path="/" component={HelpdeskDashboard} />
                        <Route path="/dashboard" component={HelpdeskDashboard} />
                        <Route exact path="/tickets" component={TicketsPage} />
                        <Route path="/tickets/:id" component={HelpdeskTicketPage} />
                    </Switch>
                </div>
            );
        } 
        else if (this.props.currentUser.role && this.props.currentUser.role == "tech") {
            return (
                <div className="site-main">
                    <Switch>
                        <Route exact path="/" component={TechDashboard} />
                        <Route path="/dashboard" component={TechDashboard} />
                        <Route path="/tickets/:id" component={TechTicketPage} />
                        <Route path="/profile" component={ProfilePage} />
                    </Switch>
                </div>
            );
        }
        else {
            return <div className="site-main"></div>;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.currentUser
    }
}

export default withRouter(connect(mapStateToProps)(SiteMain));