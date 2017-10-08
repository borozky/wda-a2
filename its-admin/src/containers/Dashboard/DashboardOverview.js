import React, { Component } from 'react';
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";

import moment from "moment";
import humanizeDuration from "humanize-duration";

class DashboardOverview extends Component {
    render() {
        const fullname = this.props.currentUser.displayName || "(no name)"

        let averageResolveTimeStr = ""
        if (this.props.averageResolveTime && this.props.averageResolveTime > 0) {
            averageResolveTimeStr = humanizeDuration(this.props.averageResolveTime);
        }

        return (
            <div id="DashboardOverview">
                <div className="row">
                    <div className="col-xs-12">
                        <h4><i className="fa fa-ticket"></i> &nbsp;Ticket information</h4>
                        <p>
                            <b>Number of tickets</b><br/>{this.props.numberOfTickets} <br/>
                            <b>Number of tickets assigned to me:</b><br/> {this.props.numberOfStaffTickets} &nbsp;
                            <Link to="/dashboard/assigned-tickets">View tickets</Link><br/>
                            <b>Number of pending tickets</b><br/> {this.props.numberOfPendingTickets} &nbsp;
                            <Link to="/dashboard/pending-tickets">View pending tickets</Link><br/>
                        </p>
                        <hr/>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <h4><i className="fa fa-user"></i> &nbsp;Profile details</h4>
                        <p>
                            <b>Fullname</b><br/> {fullname}<br/>
                            <b>Email</b><br/> {this.props.currentUser.email}<br/>
                            <b>Role</b><br/> {this.props.currentUser.role || "(no role)"}
                        </p>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <h4><i className="fa fa-tachometer"></i> &nbsp;Performance</h4>
                        <p>
                            <b>Number of resolved tickets</b><br/> {this.props.numberOfResolvedTickets}<br/>
                            <b>Average resolve time</b><br/> { averageResolveTimeStr }<br/>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

function ticketResolveTime ( ticket ) {
    if (ticket.status != "Resolved") {
        return;
    }

    let createAtDate = moment(moment.utc(ticket.created_at)).toDate();
    let updatedAtDate =  moment(moment.utc(ticket.updated_at)).toDate();
    let difference = updatedAtDate.getTime() - createAtDate.getTime();
    return difference;
}

function averageTicketsResolveTime( tickets = [] ){
    if (tickets.length == 0) {
        return;
    }

    let resolveTimes = [];
    tickets.forEach(ticket => {
        let resolveTime = ticketResolveTime( ticket )
        if (resolveTime && resolveTime > 0) {
            resolveTimes.push(resolveTime)
        }
    })

    if (resolveTimes.length == 0) {
        return;
    }

    
    let averageResolveTime = resolveTimes.reduce((prev, next) => prev + next, 0) / resolveTimes.length;
    return averageResolveTime;
}

const mapStateToProps = (state) => {
    const currentUser = state.session.currentUser;
    const assignedTickets = state.tickets.data.filter(ticket => ticket.assigned_to_uid === currentUser.uid);
    const resolvedTickets = assignedTickets.filter(ticket => ticket.status == "Resolved");

    return {
        currentUser: currentUser,
        numberOfTickets: state.tickets.data.length,
        numberOfPendingTickets: state.tickets.data.filter(ticket => ticket.status === "Pending").length,
        numberOfStaffTickets: assignedTickets.length,
        numberOfResolvedTickets: resolvedTickets.length,
        numberOfStaffMembers: state.staff.data.length,
        averageResolveTime: Math.floor(averageTicketsResolveTime(resolvedTickets) / 1000) * 1000
    }
}


export default withRouter(connect(mapStateToProps)(DashboardOverview));