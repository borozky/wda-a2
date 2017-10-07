import React, { Component } from 'react';

import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import * as TicketActions from "../../actions/TicketActions";
import _ from "lodash";

import "../../stylesheets/UpdateTicketForm.css";

class UpdateTicketForm extends Component {

    constructor(props){
        super(props);

        this.handleAssignToStaff = this.handleAssignToStaff.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);

        this.state = {
            status: _.startCase(_.lowerCase(this.props.ticket.status)),
            priority: this.props.ticket.priority,
            escalation_level: this.props.ticket.escalation_level,
            assigned_to_uid: this.props.ticket.assigned_to_uid,
            assigned_to_fullname: this.props.ticket.assigned_to_fullname,
            assigned_to_email: this.props.ticket.assigned_to_email
        }
    }

    handleAssignToStaff(event, staffUID){
        const staff = this.props.staff.filter(staff => staff.uid == staffUID);
        if (staff.length > 0) {
            const selectedStaff = staff[0];
            this.setState({
                assigned_to_email: selectedStaff.email,
                assigned_to_fullname: selectedStaff.fullname,
                assigned_to_uid: selectedStaff.uid
            })
        }
    }

    componentWillReceiveProps(nextProps){
        // The selectbox will change option back to default value while updating. 
        // To avoid that, do not enable componentWillReceiveProps while updating
        if (nextProps.updating) {
            return;
        }
        this.setState({
            status: _.startCase(_.lowerCase(nextProps.ticket.status)),
            priority: nextProps.ticket.priority,
            escalation_level: nextProps.ticket.escalation_level,
            assigned_to_uid: nextProps.ticket.assigned_to_uid,
            assigned_to_fullname: nextProps.ticket.assigned_to_fullname,
            assigned_to_email: nextProps.ticket.assigned_to_email
        });
    }

    handleOnSubmit(event){
        event.preventDefault();

        // Do not allow new details with value of empty string ""
        let newDetails = {}
        Object.keys(this.state).forEach(key => {
             if (this.state[key]) { // According to JS, Boolean("") === false
                 newDetails[key] = this.state[key];
             }
        })

        this.props.updateTicket(this.props.ticket.id, newDetails);
    }

    render() {

        // disable button using disabled props
        let disabledProps = {};
        if (this.props.updating) {
            disabledProps.disabled = "Disabled";
        }

        return (
            <form onSubmit={this.handleOnSubmit} method="POST" id="UpdateTicketForm" className={this.props.updating ? "loading" : ""}>
                <p>
                    <b>Status</b><br/>
                    <select name="ticket-status"  value={this.state.status} id="TicketStatus" style={{marginRight: 5, fontSize: 13}} onChange={e => {this.setState({status: e.target.value})}}>
                        <option value="Pending">Pending{this.props.ticket.status == "Pending" && " *"}</option>
                        <option value="In Progress">In Progress{this.props.ticket.status == "In Progress" && " *"}</option>
                        <option value="Unresolved">Unresolved{this.props.ticket.status == "Unresolved" && " *"}</option>
                        <option value="Resolved">Resolved{this.props.ticket.status == "Resolved" && " *"}</option>
                    </select>
                </p>
                <p>
                    <b>Priority</b><br/>
                    <select value={this.state.priority || ""} onChange={e => {this.setState({priority: e.target.value})}} 
                            name="ticket-priority" id="TicketPriority" style={{margin: "0 10px 10px 0"}}>
                        <option value=""> - {(this.props.ticket.priority == null || this.props.ticket.priority == "") && " *"}</option>
                        <option value="low">Low{this.props.ticket.priority === "low" && " *"}</option>
                        <option value="medium">Medium{this.props.ticket.priority === "medium" && " *"}</option>
                        <option value="high">High{this.props.ticket.priority === "high" && " *"}</option>
                    </select>
                </p>
                <p>
                    <b>Escalation Level</b><br/>
                    <select value={this.state.escalation_level || ""} onChange={e => {this.setState({escalation_level: e.target.value})}} 
                        name="ticket-escalation-level" id="TicketEscalationLevel" style={{margin: "0 10px 10px 0"}}>
                        <option value=""> - {(this.props.ticket.escalation_level == null || this.props.ticket.escalation_level == "") && " *"}</option>
                        <option value="1">Level One{this.props.ticket.escalation_level === "1" && " *"}</option>
                        <option value="2">Level Two{this.props.ticket.escalation_level === "2" && " *"}</option>
                        <option value="3">Level Three{this.props.ticket.escalation_level === "3" && " *"}</option>
                    </select>
                </p>
                <p>
                    <b>Assigned to</b><br/>
                    <select value={this.state.assigned_to_uid || ""} onChange={e => {this.handleAssignToStaff(e, e.target.value)}} 
                            name="ticket-assignedto" id="TicketAssignedTo" style={{margin: "0 10px 10px 0"}}>
                        <option value=""> - {(this.props.ticket.assigned_to_uid == null || this.props.ticket.assigned_to_uid == "") && " *"}</option>
                        { this.props.staff.map((person, index) => 
                            <option key={index} value={person.uid}>
                                {person.fullname}{this.props.ticket.assigned_to_uid === person.uid && " *"}
                            </option>
                        )}
                    </select>
                </p>
                <p>
                    <button {...disabledProps} type="submit" className="btn btn-xs btn-primary">
                        { this.props.updating ? "Updating..." : "Update ticket" }
                    </button>
                </p>
                <span className="loading-layer">
                    <span className="spinner">
                        <i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
                        <span className="sr-only">Loading...</span>
                    </span>
                </span>
            </form>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        ...props,
        staff: state.staff.data,
        updating: state.tickets.updating,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateTicket: function(ticketID, newDetails = {}){
            dispatch(TicketActions.updateTicket(ticketID, newDetails));
        }
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateTicketForm));