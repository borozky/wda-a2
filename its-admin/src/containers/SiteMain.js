import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";

import DashboardPage from "./Dashboard/DashboardPage";
import TicketsPage from "./Tickets/TicketsPage";
import TicketPage from "./Tickets/TicketPage";

import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'


class SiteMain extends Component {
    render() {
        return (
            <div className="site-main">
                <Switch>
                    <Route exact path="/" component={DashboardPage} />
                    <Route path="/dashboard" component={DashboardPage} />
                    <Route exact path="/tickets" component={TicketsPage}/>
                    <Route exact path="/tickets/:id" component={TicketPage} />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.currentUser
    }
}

export default withRouter(connect(mapStateToProps)(SiteMain));