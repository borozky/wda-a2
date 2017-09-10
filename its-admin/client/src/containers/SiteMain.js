import React, { Component } from 'react';
import { Route } from "react-router-dom";

import DashboardPage from "./Dashboard/DashboardPage";
import TicketsPage from "./Tickets/TicketsPage";
import TicketPage from "./Tickets/TicketPage";
import LeaderboardsPage from "./Leaderboards/LeaderboardsPage";


class SiteMain extends Component {
    render() {
        return (
            <div className="site-main">
                <Route exact path="/" component={DashboardPage} />
                <Route path="/dashboard" component={DashboardPage} />
                <Route exact path="/tickets" component={TicketsPage}/>
                <Route exact path="/tickets/:id" component={TicketPage} />
                <Route path="/leaderboards" component={LeaderboardsPage} />
            </div>
        );
    }
}

export default SiteMain;