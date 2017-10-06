import React, { Component } from 'react';
import EntryHeader from "../../components/EntryHeader";

class LeaderboardsPage extends Component {
    render() {
        return (
            <div id="LeaderboardsPage">
                <EntryHeader><h3>Leaderboards Page</h3></EntryHeader>
                <div className="container">
                    <div className="site-content"></div>
                </div>
            </div>
        );
    }
}

export default LeaderboardsPage;