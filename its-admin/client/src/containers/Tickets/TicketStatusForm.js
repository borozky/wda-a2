import React, { Component } from 'react';
import TicketStatusBadge from "../../components/TicketStatusBadge";
import "../../stylesheets/TicketStatusForm.css";
import * as TicketActions from "../../actions/TicketActions";
import {connect} from "react-redux";

class TicketStatusForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            status: this.props.status
        }
    }

    render() {
        return (
            <div className="ticket-status-form">
                <form>
                <b>Status:</b><br/>
                <select name="ticket-status" value={this.state.status} id="TicketStatus" style={{marginRight: 5, fontSize: 13}} onChange={e => {this.setState({status: e.target.value})}}>
                    <option value="Pending">Pending{this.props.status == "Pending" && " *"}</option>
                    <option value="In Progress">In Progress{this.props.status == "In Progress" && " *"}</option>
                    <option value="Unresolved">Unresolved{this.props.status == "Unresolved" && " *"}</option>
                    <option value="Resolved">Resolved{this.props.status == "Resolved" && " *"}</option>
                </select>
                { this.state.status !== this.props.status && <button className="btn btn-xs btn-primary" type="submit">Update</button> }
                </form>
            </div>
            
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

export default connect(null, mapDispatchToProps)(TicketStatusForm);