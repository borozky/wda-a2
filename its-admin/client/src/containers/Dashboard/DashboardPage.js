import React, { Component } from 'react';
import { connect } from "react-redux";

import EntryHeader from "../../components/EntryHeader";
import DashboardSection from "./DashboardSection";
import DashboardSection_NewTickets from "./DashboardSection_NewTickets";

import "../../stylesheets/TicketList.css";
import "../../stylesheets/Dashboard.css";

class DashboardPage extends Component {
    render() {
        return (
            <div id="DashboardPage">
                <EntryHeader>
                    <h3>Welcome, {this.props.currentUser.displayName}<br/>
                        <small>In this application, you can manage, assign and add comments to all tickets</small>
                    </h3>
                </EntryHeader>
                <div className="site-content">
                    <DashboardSection_NewTickets/>
                    <DashboardSection title="Users">
                        Users
                    </DashboardSection>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.currentUser
    }
}


export default connect(mapStateToProps)(DashboardPage);