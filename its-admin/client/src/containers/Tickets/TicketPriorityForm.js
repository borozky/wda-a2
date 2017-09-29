import React, { Component } from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import * as TicketActions from "../../actions/TicketActions";

class TicketPriorityForm extends Component {
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            priority: this.props.priority
        }
    }

    handleSubmit(event){
        event.preventDefault();

        const ticketID = this.props.ticket.id;
        this.props.updateTicket(ticketID, {
            priority: this.state.priority
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <b>Priority</b><br/>
                <select value={this.state.priority} onChange={e => {this.setState({priority: e.target.value})}} 
                        name="ticket-priority" id="TicketPriority" style={{margin: "0 10px 10px 0"}}>
                    <option value=""> - </option>
                    <option value="low">Low{this.props.priority === "low" && " *"}</option>
                    <option value="medium">Medium{this.props.priority === "medium" && " *"}</option>
                    <option value="high">High{this.props.priority === "high" && " *"}</option>
                </select>
                { this.state.priority != this.props.priority && <button className="btn btn-xs btn-primary" type="submit">Submit</button> }
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

export default connect(null, mapDispatchToProps)(TicketPriorityForm);