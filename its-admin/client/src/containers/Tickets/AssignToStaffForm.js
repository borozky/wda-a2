import React, { Component } from 'react';

import * as StaffActions from "../../actions/StaffActions";

import {connect} from "react-redux";

class AssignToStaffForm extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            assignedTo: this.props.assignedTo
        }
    }

    handleSubmit(event){
        event.preventDefault();

        // TODO
    }

    componentDidMount(){
        this.props.getAllStaff();
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignToStaffForm);