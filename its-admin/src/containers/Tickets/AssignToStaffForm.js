import React, { Component } from 'react';

import * as StaffActions from "../../actions/StaffActions";
import * as TicketActions from "../../actions/TicketActions";

import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class AssignToStaffForm extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.state = {
            assignedTo: this.props.assignedTo   // UID of the staff
        }
    }

    handleSubmit(event){
        event.preventDefault();
        
        let foundStaff = this.props.staff.filter(staff => staff.uid == this.state.assignedTo)[0];
        let ticketID = this.props.ticket.id;
        let updatedDetails = {
            assigned_to_fullname: foundStaff.fullname,
            assigned_to_uid: foundStaff.uid,
            assigned_to_email: foundStaff.email
        };
        
        this.props.updateTicket(ticketID, updatedDetails);
        
    }

    componentDidMount(){
        this.props.getAllStaff();
    }
    
    componentWillReceiveProps(nextProps){
        this.setState({
            assignedTo: nextProps.assignedTo
        })
    }

    render() {
        let disabledProps = {};
        if (this.props.updating) {
            disabledProps.disabled = "Disabled";
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <b>Assigned to</b><br/>
                <select value={this.state.assignedTo} onChange={e => {this.setState({assignedTo: e.target.value})}} 
                        name="ticket-assignedto" id="TicketAssignedTo" style={{margin: "0 10px 10px 0"}}>
                    <option value=""> - </option>
                    { this.props.staff.map((person, index) => 
                        <option key={index} value={person.uid}>
                            {person.fullname}{this.props.assignedTo === person.uid && " *"}
                        </option>
                    )}
                </select>
                { this.state.assignedTo != this.props.assignedTo && <button {...disabledProps} className="btn btn-xs btn-primary" type="submit">Submit</button> }
            </form>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        ...props,
        updating: state.tickets.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllStaff: function(){
            dispatch(StaffActions.getAllStaff());
        },
        updateTicket: function(ticketID, newDetails = {}){
            dispatch(TicketActions.updateTicket(ticketID, newDetails));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AssignToStaffForm));