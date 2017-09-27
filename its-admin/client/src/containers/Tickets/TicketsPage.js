import React, { Component } from 'react';
import EntryHeader from "../../components/EntryHeader";
import faker from "faker";
import { Redirect, Link } from "react-router-dom";
import DataTable from "../../components/DataTable";
import {connect} from "react-redux";
import moment from "moment";
import * as TicketActions from "../../actions/TicketActions";

class TicketsPage extends Component {

    constructor(props){
        super(props);
        this.handleOnSelectRow = this.handleOnSelectRow.bind(this);
        this.handleOnSearch = this.handleOnSearch.bind(this);
    }

    componentDidMount(){
        this.props.getAllTickets();
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

    render(){
        const {tickets, searchableItems, columns, loading, searchTickets} = this.props;

        return <div id="TicketsPage">
            <EntryHeader>
                <h3>All Tickets</h3>
            </EntryHeader>
            <div className="site-content">
                <div className="container">
                    <DataTable onSearch={this.handleOnSearch} loading={loading} data={tickets} columns={columns} style={{maxWidth: "100%"}}>{(ticket, index) => 
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
                            <td><span className="ticket-assigned_to"></span></td>
                            <td><span className="ticket-created_at">{moment(ticket.created_at).format("DD/MM/YYYY").toString()}</span></td>
                        </tr>
                    }</DataTable>
                </div>
            </div>
        </div>
    }

}

const mapStateToProps = (state) => {
    return {
        tickets: state.tickets.foundTickets,
        columns: ["Tickets", "Assigned to", "Created"],
        loading: state.tickets.loading
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

export default connect(mapStateToProps, mapDispatchToProps)(TicketsPage);