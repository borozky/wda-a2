import React, { Component } from 'react';

import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import * as TicketActions from "../../actions/TicketActions";
import _ from "lodash";

import "../../stylesheets/UpdateTicketForm.css";



class AssignToTechForm extends Component {
    constructor(props){
        super(props);

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleAssignToStaff = this.handleAssignToStaff.bind(this);

        this.state = {
            priority: this.props.priority || "low",
            escalation_level: this.props.ticket.escalation_level,
            assigned_to_uid: this.props.ticket.assigned_to_uid,
            assigned_to_fullname: this.props.ticket.assigned_to_fullname,
            assigned_to_email: this.props.ticket.assigned_to_email
        }
    }

    handleAssignToStaff(event, staffUID){
        if ( ! event.target.value) {
            this.setState({
                escalation_level: this.props.ticket.escalation_level,
                assigned_to_uid: this.props.ticket.assigned_to_uid,
                assigned_to_fullname: this.props.ticket.assigned_to_fullname,
                assigned_to_email: this.props.ticket.assigned_to_email
            })
        }

        const staff = this.props.staff.filter(staff => staff.uid == staffUID);
        if (staff.length > 0) {
            const selectedStaff = staff[0];
            this.setState({
                escalation_level: this.props.ticket.escalation_level || 1,
                assigned_to_email: selectedStaff.email,
                assigned_to_fullname: selectedStaff.fullname,
                assigned_to_uid: selectedStaff.uid
            })
        }
    }

    handleOnSubmit(event){
        event.preventDefault();
        const {priority, escalation_level, assigned_to_uid, assigned_to_email, assigned_to_fullname} = this.state;
        if ( !priority || !escalation_level || !assigned_to_uid || !assigned_to_email || !assigned_to_fullname) {
            alert("Cannot update this ticket");
            return;
        }

        this.props.updateTicket(this.props.ticket.id, {
            status: this.props.ticket.status != "Pending" ? this.props.ticket.status : "In Progress",
            priority: this.state.priority,
            escalation_level: this.state.escalation_level,
            assigned_to_uid: this.state.assigned_to_uid,
            assigned_to_fullname: this.state.assigned_to_fullname,
            assigned_to_email: this.state.assigned_to_email
        });
    }

    render() {
        // do not allow submission if
        // ticket is marked as Resolved/Unresolved
        // ticket is in progress, and currently escalated to level 1
        
        // ticket is disabled if ticket is unassigned/assigned to current staff
        let allowSubmission = true;
        let disabled = false;
        let submitMessage = "Assigning a new technician will mark this ticket as \"In progress\" and escalate this ticket to level 1 (or high level if this ticket is already escalated)"
        if (["Resolved", "Unresolved"].indexOf(this.props.ticket.status) > -1) {
            allowSubmission = false;
            submitMessage = "You cannot update this ticket because it is marked as " + this.props.ticket.status
        }
         else if (this.props.ticket.escalation_level == 1 && this.props.ticket.status == "In Progress") {
            allowSubmission = false;
            submitMessage = "Ticket is marked as \"In Progress\". You can re-assign tickets to different tech if this ticket is escalated to level 2 or 3"
        } 
        else if (this.props.ticket.escalation_level > 1 && this.state.assigned_to_uid == this.props.ticket.assigned_to_uid) {
            disabled = true;
            submitMessage = "Ticket is escalated. Reassign this ticket to another tech employee to allow submission"
        } else if (!this.state.assigned_to_uid) {
            disabled = true;
            submitMessage = "Assign this ticket to a tech employee to allow submission"
        } else if (this.props.updating) {
            disabled = true;
        }

        let disabledProps = {};
        if (disabled) {
            disabledProps.disabled = "Disabled";
        }



        return (
            <form onSubmit={this.handleOnSubmit} method="POST" id="UpdateTicketForm" className={this.props.updating ? "loading" : ""}>
                <p>
                    <b>Status</b><br/>
                    <i>{this.props.ticket.status || " - "}</i>

                </p>
                <p>
                    <b>Priority</b><br/>
                    {
                        this.props.ticket.priority ? <i>{this.props.ticket.priority}</i>:
                        <select value={this.state.priority} onChange={e => {this.setState({priority: e.target.value})}} 
                                name="ticket-priority" id="TicketPriority" style={{margin: "0 10px 10px 0"}}>
                            <option value="low">Low{this.props.ticket.priority === "low" && " *"}</option>
                            <option value="medium">Medium{this.props.ticket.priority === "medium" && " *"}</option>
                            <option value="high">High{this.props.ticket.priority === "high" && " *"}</option>
                        </select>
                    }
                </p>
                <p>
                    <b>Assign{this.state.assigned_to_uid && `ed`} to</b><br/>
                    {
                        (allowSubmission == false) ? 
                        <i>{this.props.ticket.assigned_to_fullname} (tech)</i> :
                        <select value={this.state.assigned_to_uid} onChange={e => {this.handleAssignToStaff(e, e.target.value)}} 
                            name="ticket-assignedto" id="TicketAssignedTo" style={{margin: "0 10px 10px 0"}}>
                            <option value=""> - {(this.props.ticket.assigned_to_uid == null || this.props.ticket.assigned_to_uid == "") && " *"}</option>
                            { 
                                this.props.staff.map((person, index) => 
                                    <option key={index} value={person.uid}>
                                        {person.fullname}{` (${person.role}${(person.role_level > 0) ? ` Lvl ${person.role_level}` : ``})`}{this.props.ticket.assigned_to_uid === person.uid && " *"}
                                    </option>
                                )
                            }
                        </select>
                    }
                    
                </p>
                <p>
                    <b>Escalation Level</b><br/>
                    {
                        (! this.state.escalation_level) ? <small><i>Assign a tech to determine the escalation level</i></small> : 
                        <i>Level {this.state.escalation_level}</i>
                    }
                </p>
                <p>
                    {
                        allowSubmission &&
                        <button {...disabledProps} type="submit" className="btn btn-xs btn-primary">
                            { this.props.updating ? "Assigning..." : "Assign ticket" }
                        </button>
                    }
                    <hr style={{borderTopColor:"#444"}}/>
                    <small>{submitMessage}</small>
                </p>
            </form>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        ...props,   // staff and tickets
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AssignToTechForm));