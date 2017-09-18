import React, { Component } from 'react';
import faker from "faker";
import { connect } from "react-redux";

import * as TicketActions from "../../actions/TicketActions";

import DashboardSection from "./DashboardSection";
import DashboardTickets from "./DashboardTickets";
import TicketSummary from "./TicketSummary";

class DashboardSection_NewTickets extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedTicket: null
        }

        this.handleOnSelectRow = this.handleOnSelectRow.bind(this);
    }

    componentDidMount(){
        this.props.getAllTickets();
    }

    handleOnSelectRow(event, ticket){
        console.log("EVENT", event);
        console.log("CLICKED_TICKET", ticket);
        this.setState({selectedTicket: ticket})
    }

    render() {
        return (
            <DashboardSection title="New tickets">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <DashboardTickets onSelectRow={this.handleOnSelectRow} selectedTicket={this.state.selectedTicket}/>
                    </div>
                    <div className="col-xs-12 col-sm-6">{this.state.selectedTicket &&
                        <TicketSummary ticket={this.state.selectedTicket}/>
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

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTickets: function(){
            dispatch(TicketActions.getAllTickets());
        }
    }
}


export default connect((dispatch) => ({}), mapDispatchToProps)(DashboardSection_NewTickets);