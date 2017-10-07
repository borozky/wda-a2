import React, { Component } from 'react';
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";

class DashboardOverview extends Component {
    render() {
        const fullname = this.props.currentUser.displayName || "(no name)"

        return (
            <div id="DashboardOverview">
                <h4>Ticket information</h4>
                <p>
                    <b>Number of tickets</b><br/>{this.props.numberOfTickets} <br/>
                    <b>Number of tickets assigned to me:</b><br/> {this.props.numberOfStaffTickets} &nbsp;
                    <Link to="/dashboard/assigned-tickets">View tickets</Link><br/>
                    <b>Number of pending tickets</b><br/> {this.props.numberOfPendingTickets} &nbsp;
                    <Link to="/dashboard/pending-tickets">View pending tickets</Link><br/>
                </p>
                <hr/>

                <h4>Profile details</h4>
                <p>
                    <b>Fullname</b><br/> {fullname}<br/>
                    <b>Email</b><br/> {this.props.currentUser.email}<br/>
                    <b>Role</b><br/> {this.props.currentUser.role || "(no role)"}
                </p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const currentUser = state.session.currentUser;

    return {
        currentUser: currentUser,
        numberOfTickets: state.tickets.data.length,
        numberOfPendingTickets: state.tickets.data.filter(ticket => ticket.status === "Pending").length,
        numberOfStaffTickets: state.tickets.data.filter(ticket => ticket.assigned_to_uid === currentUser.uid).length,
        numberOfStaffMembers: state.staff.data.length,
    }
}


export default withRouter(connect(mapStateToProps)(DashboardOverview));