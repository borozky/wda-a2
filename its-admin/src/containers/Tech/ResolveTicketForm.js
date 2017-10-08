import React, { Component } from 'react';

import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import * as TicketActions from "../../actions/TicketActions";
import _ from "lodash";

import LoadingLayer from "../../components/LoadingLayer";

import "../../stylesheets/UpdateTicketForm.css";


class ResolveTicketForm extends Component {
    constructor(props){
        super(props);

        this.handleResolve = this.handleResolve.bind(this);
        this.handleUnresolved = this.handleUnresolved.bind(this);
        this.handleEscalate = this.handleEscalate.bind(this);
    }

    handleResolve(event){
        event.preventDefault();
        this.props.updateTicket(this.props.ticket.id, {
            status: "Resolved"
        });
    }

    handleUnresolved(event){
        event.preventDefault();
        this.props.updateTicket(this.props.ticket.id, {
            status: "Unresolved"
        });
    }

    handleEscalate(event, level){
        event.preventDefault();
        this.props.updateTicket(this.props.ticket.id, {
            escalation_level: Number(level)
        });
    }

    render() {
        return (
            <form onSubmit={e => {return false}} method="POST" id="UpdateTicketForm" className={this.props.updating ? "loading" : ""}>
                <p>
                    <b>Escalation Level: </b><i>Level {this.props.ticket.escalation_level}</i><br/>
                    {
                        (["Resolved", "Unresolved"].indexOf(this.props.ticket.status) == -1) && 
                        <span>
                            {
                                this.props.ticket.escalation_level > 1 &&
                                <i style={{display:"inline-block", margin: "8px 0"}}>Ticket is currently marked with escalation level of {this.props.ticket.escalation_level}. This ticket might be assigned to another technical staff</i>
                            }
                            {
                                this.props.ticket.escalation_level < 2 && 
                                <button className="btn btn-warning btn-block" style={{padding:3,marginTop:5}} onClick={e => {this.handleEscalate(e, 2)}}>Escalate to Level 2</button>
                            }
                            {
                                this.props.ticket.escalation_level < 3 &&
                                <button className="btn btn-danger btn-block" style={{padding:3}} onClick={e => {this.handleEscalate(e, 3)}}>Escalate to Level 3</button>
                            }
                        </span>
                    }
                </p>
                <hr style={{borderTopColor: "#444"}}/>
                <p>
                    <b>Status: </b> <i>{this.props.ticket.status}</i> 
                    {
                        (["Resolved", "Unresolved"].indexOf(this.props.ticket.status) == -1) && 
                        <span>
                            <button className="btn btn-default btn-block" style={{marginTop: 5}} onClick={this.handleUnresolved}>Mark as Unresolved</button>
                            <button className="btn btn-success btn-lg btn-block" style={{marginTop: 10}} onClick={this.handleResolve}>Resolve</button>
                        </span>
                    }
                    <hr/>
                    {
                        (["Resolved", "Unresolved"].indexOf(this.props.ticket.status) > -1) && 
                        <b><i>This ticket has been marked as {this.props.ticket.status}</i></b>
                    }
                </p>
                <LoadingLayer />
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


export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(ResolveTicketForm));