import React, { Component } from 'react';
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";
import EntryHeader from "../../components/EntryHeader";

import moment from "moment";
import humanizeDuration from "humanize-duration";

const TicketInformation = (props) =>
    <div className="col-xs-12 col-sm-6">
        <h4><i className="fa fa-ticket"></i> &nbsp;Ticket information</h4>
        <p>
            <b>Number of tickets assigned to me:</b> &nbsp;<i>{props.numberOfAssignedTickets}</i><br/>
            <b>Number of resolved tickets:</b> &nbsp;<i>{props.numberOfResolvedTickets}</i> &nbsp;<br/>
            <b>Number of unresolved tickets:</b> &nbsp;<i>{props.numberOfUnresolvedTickets}</i>
        </p>
    </div>

const PerformanceDetails = ({numberOfResolvedTickets, averageResolveTimeStr}) => 
    <div className="col-xs-12 col-sm-6">
        <h4><i className="fa fa-tachometer"></i> &nbsp;Performance</h4>
        <p>
            <b>Number of resolved tickets</b><br/> <i>{numberOfResolvedTickets}</i><br/>
            <b>Average resolve time</b><br/> <i>{ averageResolveTimeStr }</i><br/>
        </p>
    </div>

const ProfileDetails = (props) => 
    <div className="col-xs-12 col-sm-12">
        <hr/>
        <h4><i className="fa fa-user"></i> &nbsp;Profile details</h4>
        <p>
            <b>Fullname</b><br/> <i>{props.currentUser.displayName || props.currentUser.fullname || "(no name)"}</i> <br/>
            <b>Email</b><br/> <i>{props.currentUser.email}</i> <br/>
            <b>Role</b><br/> <i>{props.currentUser.role || "(no role)"}</i> 
        </p>
    </div>



class ProfilePage extends Component {
    render() {
        const fullname = this.props.currentUser.displayName || "(no name)"

        let averageResolveTimeStr = ""
        if (this.props.averageResolveTime && this.props.averageResolveTime > 0) {
            averageResolveTimeStr = humanizeDuration(this.props.averageResolveTime);
        }

        return (
            <div id="DashboardOverview">
                <EntryHeader><h3>Profile</h3></EntryHeader>
                <div className="site-content">
                    <div className="container">
                        <div className="row">
                            <TicketInformation {...this.props} />
                            <PerformanceDetails { ...this.props} averageResolveTimeStr={averageResolveTimeStr}/>
                            <ProfileDetails {...this.props} />
                        </div>
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
        numberOfAssignedTickets: assignedTickets.length,
        numberOfResolvedTickets: resolvedTickets.length,
        numberOfUnresolvedTickets: assignedTickets.filter(t => t.status == "Unresolved").length,
        averageResolveTime: Math.floor(averageTicketsResolveTime(resolvedTickets) / 1000) * 1000
    }
}


export default withRouter(connect(mapStateToProps)(ProfilePage));