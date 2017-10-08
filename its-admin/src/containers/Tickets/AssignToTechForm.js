import React, { Component } from 'react';

class AssignToTechForm extends Component {
    constructor(props){
        super(props);

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleEscalationLevel = this.handleEscalationLevel.bind(this);

        this.state = {
            priority: this.props.priority || "low",
            escalation_level: this.props.escalation_level || 1,
            assigned_to_uid: this.props.ticket.assigned_to_uid,
            assigned_to_fullname: this.props.ticket.assigned_to_fullname,
            assigned_to_email: this.props.ticket.assigned_to_email
        }
    }

    handleOnSubmit(event){

    }

    handleEscalationLevel(event){

    }

    render() {
        let disabledProps = {};
        if (this.props.updating) {
            disabledProps.disabled = "Disabled";
        }


        return (
            <form onSubmit={this.handleOnSubmit} method="POST" id="UpdateTicketForm" className={this.props.updating ? "loading" : ""}>
                <p>
                    <b>Priority</b><br/>
                    <select value={this.state.priority} onChange={e => {this.setState({priority: e.target.value})}} 
                            name="ticket-priority" id="TicketPriority" style={{margin: "0 10px 10px 0"}}>
                        <option value="low">Low{this.props.ticket.priority === "low" && " *"}</option>
                        <option value="medium">Medium{this.props.ticket.priority === "medium" && " *"}</option>
                        <option value="high">High{this.props.ticket.priority === "high" && " *"}</option>
                    </select>
                </p>
                <p>
                    <b>Escalation Level</b><br/>
                    <select value={this.state.escalation_level} onChange={this.handleEscalationLevel}
                        name="ticket-escalation-level" id="TicketEscalationLevel" style={{margin: "0 10px 10px 0"}}>
                        <option value="1">Level One{this.props.ticket.escalation_level == "1" && " *"}</option>
                        <option value="2">Level Two{this.props.ticket.escalation_level == "2" && " *"}</option>
                        <option value="3">Level Three{this.props.ticket.escalation_level == "3" && " *"}</option>
                    </select>
                </p>
                <p>
                    <b>Assign to</b><br/>
                    <select value={this.state.assigned_to_uid || ""} onChange={e => {this.handleAssignToStaff(e, e.target.value)}} 
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
                </p>
                <p>
                    <button {...disabledProps} type="submit" className="btn btn-xs btn-primary">
                        { this.props.updating ? "Assigning..." : "Assign ticket" }
                    </button><hr style={{borderTopColor:"#444"}}/>
                    <small>Assigning this ticket to a technician will automatically mark this ticket as "In progress". The ticket's escalation level will be assigned depending on techician's role level</small>
                </p>
            </form>
        );
    }
}

export default AssignToTechForm;