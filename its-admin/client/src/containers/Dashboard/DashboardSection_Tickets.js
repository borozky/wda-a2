import React, { Component } from 'react';
import faker from "faker";
import * as TicketActions from "../../actions/TicketActions";
import DashboardSection from "./DashboardSection";
import DashboardTickets from "./DashboardTickets";
import TicketSummary from "./TicketSummary";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import moment from "moment";

class DashboardSection_Tickets extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedTicket: null,
            tickets: this.props.tickets
        }
        this.handleOnSelectRow = this.handleOnSelectRow.bind(this);
    }

    handleOnSelectRow(event, ticket){
        console.log("EVENT", event);
        console.log("CLICKED_TICKET", ticket);
        this.setState({selectedTicket: ticket})
    }

    componentDidMount(){
        this.props.getAllTickets();
    }

    render() {
        return (
            <DashboardSection title="Pending Tickets">
                <div className="row">
                    <div className="col-xs-12 col-sm-8">
                        <DashboardTickets onSelectRow={this.handleOnSelectRow} tickets={this.props.tickets}/>
                    </div>
                    <div className="col-xs-12 col-sm-4">{this.state.selectedTicket ?
                        <TicketSummary ticket={this.state.selectedTicket}/> :
                        <span>Select a ticket to preview</span>
                    }</div>
                </div>
            </DashboardSection>
        );
    }

    getTickets(){
        const operating_system = ["Windows", "Mac", "Linux"];
        const software_issue = [ "Google services setup", "Service accounts", "Storage", "Cloud storage increase", "Wifi Setup", "Printing", "Misconfigured software", "other"];
        let tickets = [];
        for(let i = 0; i < 100; i++){
            tickets.push({
                id: i + 1,
                user: { fullname: faker.name.findName(), email: faker.internet.email() },
                operating_system: operating_system[parseInt(Math.random() * operating_system.length, 10)],
                software_issue: software_issue[parseInt(Math.random() * software_issue.length, 10)],
                subject: faker.lorem.words(),
                details: faker.lorem.text(),
                status: "PENDING",
                created_at: faker.date.recent()
            });
        };
        return tickets.sort((a, b) => b.created_at - a.created_at);
    }
}

const mapStateToProps = (state) => {
    return {
        tickets: state.tickets.foundTickets.filter(ticket => ticket.status === "Pending").sort(function(ticketA, ticketB){
            const dateA = moment(ticketA.created_at).toDate();
            const dateB = moment(ticketB.created_at).toDate();
            return dateA < dateB;
        })
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTickets: function(){
            dispatch(TicketActions.getAllTickets());
        }
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardSection_Tickets));