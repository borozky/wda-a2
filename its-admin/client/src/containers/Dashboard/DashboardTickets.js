import React, { Component } from 'react';
import DataTable, { DataTableRow } from "../../components/DataTable";
import {connect} from "react-redux";
import Fuse from "fuse.js";
import moment from "moment";
import * as TicketActions from "../../actions/TicketActions";
import TicketStatusBadge from "../../components/TicketStatusBadge";

const DashboardTicketRow = ({onSelectRow, ticket = {}, active = false}) => {
    const {subject, software_issue, operating_system, id, created_at} = ticket;
    return (
        <tr onClick={e => onSelectRow(e, ticket)} className={ active ? "selected" : ""}>
            <td>
                <div className="ticket-summary">
                    <b className="ticket-subject">{subject}</b><br/>
                    <small className="ticket-meta">{software_issue} ({operating_system})</small>
                    <span className="ticket-id">#{id}</span>
                </div>
            </td>
            <td><TicketStatusBadge status={ticket.status}/></td>
            <td><span className="ticket-assigned_to"></span></td>
            <td><span className="ticket-created_at">{moment(created_at).format("DD/MM/YYYY").toString()}</span></td>
        </tr>
    );
};

class DashboardTickets extends Component {
    constructor(props){
        super(props);
        this.handleSelectedTicket = this.handleSelectedTicket.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.state = {
            selectedTicket: null,
            searchedTickets: this.props.tickets
        }
    }

    handleSelectedTicket(e, ticket){
        this.setState({selectedTicket: ticket});
        this.props.onSelectRow(e, ticket);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            searchedTickets: nextProps.tickets
        });
    }

    handleSearch(event, keyword){
        event.preventDefault();
        this.props.searchTickets(keyword);
    }

    render() {
        return (
            <DataTable {...this.props} data={this.state.searchedTickets} onSearch={this.handleSearch}>{ (ticket, index) => 
                <DashboardTicketRow onSelectRow={this.handleSelectedTicket} key={index} ticket={ticket} active={(this.state.selectedTicket && this.state.selectedTicket.id === ticket.id)}/>
            }</DataTable>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        ...props,
        loading: state.tickets.loading,
        columns: ["Tickets", "Status", "Assigned to", "Created"]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchTickets: function(keyword){
            dispatch(TicketActions.searchTickets(keyword));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTickets);