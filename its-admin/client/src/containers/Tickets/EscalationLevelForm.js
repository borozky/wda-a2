import React, { Component } from 'react';
import * as TicketActions from "../../actions/TicketActions";
import {withRouter} from "react-router-dom";
import { connect } from "react-redux";

class EscalationLevelForm extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            escalationLevel: this.props.escalationLevel
        }
    }

    handleSubmit(event){
        event.preventDefault();

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <b>Update Escalation Level to:</b><br/>
                <select value={this.state.escalationLevel} onChange={e => {this.setState({escalationLevel: e.target.value})}} 
                        name="ticket-escalation-level" id="TicketEscalationLevel" style={{margin: "0 10px 10px 0"}}>
                    <option value=""> - </option>
                    <option value="1">Level One{this.props.escalationLevel === "1" && " *"}</option>
                    <option value="2">Level Two{this.props.escalationLevel === "2" && " *"}</option>
                    <option value="3">Level Three{this.props.escalationLevel === "3" && " *"}</option>
                </select>
                { this.state.escalationLevel != this.props.escalationLevel && <button className="btn btn-xs btn-primary" type="submit">Submit</button> }
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateTicket: function(ticketID, properties){
            dispatch(TicketActions.updateTicket(ticketID, properties));
        }
    }
}


export default connect(null, mapDispatchToProps)(EscalationLevelForm);