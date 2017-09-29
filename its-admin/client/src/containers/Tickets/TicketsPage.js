import React, { Component } from 'react';
import EntryHeader from "../../components/EntryHeader";
import { FixedWidthSidebar, Sidebar, ResponsiveContent } from "../../components/FixedWidthSidebar";
import faker from "faker";
import { Redirect, Link } from "react-router-dom";
import DataTable from "../../components/DataTable";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import moment from "moment";
import * as TicketActions from "../../actions/TicketActions";
import TicketStatusBadge from "../../components/TicketStatusBadge";
import TicketFilterForm from "./TicketFilterForm";

class TicketsPage extends Component {

    constructor(props){
        super(props);
        this.handleOnSelectRow = this.handleOnSelectRow.bind(this);
        this.handleOnSearch = this.handleOnSearch.bind(this);

        this.filterTicketStatus = this.filterTicketStatus.bind(this);
        this.filterTicketEscalation = this.filterTicketEscalation.bind(this);
        this.filterTicketPriority = this.filterTicketPriority.bind(this);

        this.state = {
            filteredTickets: this.props.tickets
        }
    }

    componentDidMount(){
        this.props.getAllTickets();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            filteredTickets: nextProps.tickets
        });
    }

    handleOnSelectRow(event, ticket){
        event.preventDefault();
        console.log(ticket);
        this.props.history.push({
            pathname: `/tickets/${ticket.id}`,
            state: { ticket: ticket }
        });
    }

    handleOnSearch(event, keyword){
        event.preventDefault();
        this.props.searchTickets(keyword);
    }

    filterTicketStatus(event, statuses = []){
        if (statuses.length == 0) {
            this.setState({filteredTickets: this.props.tickets});
            return;
        }

        const filteredTickets = this.props.tickets.filter((ticket, index) => {
            return statuses.indexOf(ticket.status) > -1;
        })

        this.setState({ filteredTickets: filteredTickets })
    }

    filterTicketEscalation(event, escalationLevels = []){
        if (escalationLevels.length == 0) {
            this.setState({ filteredTickets: this.props.tickets });
            return;
        }

        const filteredTickets = this.props.tickets.filter((ticket, index) => {
            return escalationLevels.indexOf(ticket.escalation_level) > -1
        })

        this.setState({ filteredTickets: filteredTickets })
    }

    filterTicketPriority(event, priorityLevels = []){
        if (priorityLevels.length == 0) {
            this.setState({ filteredTickets: this.props.tickets });
            return;
        }

        const filteredTickets = this.props.tickets.filter((ticket, index) => {
            return priorityLevels.indexOf(ticket.priority) > -1
        })

        this.setState({ filteredTickets: filteredTickets })
    }

    render(){
        const {tickets, searchableItems, columns, loading, searchTickets} = this.props;

        return <div id="TicketsPage">
            <EntryHeader>
                <h3>All Tickets</h3>
            </EntryHeader>
            <div className="site-content">
                <div className="container">
                    <FixedWidthSidebar direction="left">
                        <Sidebar>
                            <h4>Filter</h4>
                            <TicketFilterForm {...this.props.filterSettings[0]} onSubmit={this.filterTicketStatus}/>
                            <TicketFilterForm {...this.props.filterSettings[1]} onSubmit={this.filterTicketEscalation}/>
                            <TicketFilterForm {...this.props.filterSettings[2]} onSubmit={this.filterTicketPriority}/>
                        </Sidebar>
                        <ResponsiveContent style={{paddingRight: 20}}>
                            <DataTable onSearch={this.handleOnSearch} loading={loading} data={this.state.filteredTickets} columns={columns} style={{maxWidth: "100%"}}>{(ticket, index) => 
                                <tr key={index}>
                                    <td>
                                        <div className="ticket-summary">
                                            <Link to={`/tickets/${ticket.id}`}>
                                                <b className="ticket-subject">{ticket.subject}</b>
                                            </Link><br/>
                                            <small className="ticket-meta">{ticket.software_issue} ({ticket.operating_system})</small>
                                            <span className="ticket-id">#{ticket.id}</span>
                                        </div>
                                    </td>
                                    <td><TicketStatusBadge status={ticket.status}/></td>
                                    <td><span className="ticket-assigned-to"></span></td>
                                    <td><span className="ticket-created_at">{moment(ticket.created_at).format("DD/MM/YYYY").toString()}</span></td>
                                </tr>
                            }</DataTable>
                        </ResponsiveContent>
                    </FixedWidthSidebar>
                </div>
            </div>
        </div>
    }

}

const mapStateToProps = (state) => {
    return {
        tickets: state.tickets.foundTickets,
        columns: ["Tickets", "Status", "Assigned to", "Created"],
        loading: state.tickets.loading,
        filterSettings: [
            {
                title: "Ticket status",
                name: "ticket-status",
                filters: [
                    {
                        label: "Pending",
                        defaultValue: "Pending",
                        id: "TicketStatus-Pending"
                    },
                    {
                        label: "In Progress",
                        defaultValue: "In Progress",
                        id: "TicketStatus-In_Progress"
                    },
                    {
                        label: "Unresolved",
                        defaultValue: "Unresolved",
                        id: "TicketStatus-Unresolved"
                    },
                    {
                        label: "Resolved",
                        defaultValue: "Resolved",
                        id: "TicketStatus-Resolved"
                    }
                ]
            },
            {
                title: "Escalation",
                name: "ticket-escalation",
                filters: [
                    {
                        label: "No escalation level",
                        defaultValue: null,
                        id: "TicketEscalationNoLevel"
                    },
                    {
                        label: "Level 1",
                        defaultValue: 1,
                        id: "TicketEscalationLevel1"
                    },
                    {
                        label: "Level 2",
                        defaultValue: 2,
                        id: "TicketEscalationLevel2"
                    },
                    {
                        label: "Level 3",
                        defaultValue: 3,
                        id: "TicketEscalationLevel3"
                    },
                ]
            },
            {
                title: "Priority",
                name: "ticket-priority",
                filters: [
                    {
                        label: "No priority",
                        defaultValue: null,
                        id: "TicketPriority-PriorityNotAssigned"
                    },
                    {
                        label: "Low",
                        defaultValue: "low",
                        id: "TicketPriority-Low"
                    },
                    {
                        label: "Medium",
                        defaultValue: "medium",
                        id: "TicketPriority-Medium"
                    },
                    {
                        label: "High",
                        defaultValue: "high",
                        id: "TicketPriority-High"
                    },
                ]
            },
            
        ]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTickets: function(){
            dispatch(TicketActions.getAllTickets());
        },
        searchTickets: function(keyword){
            dispatch(TicketActions.searchTickets(keyword));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TicketsPage));