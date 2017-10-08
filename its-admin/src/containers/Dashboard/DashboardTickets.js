import React, { Component } from 'react';
import DataTable, { DataTableRow } from "../../components/DataTable";
import {connect} from "react-redux";
import Fuse from "fuse.js";
import moment from "moment";
import * as TicketActions from "../../actions/TicketActions";
import TicketStatusBadge from "../../components/TicketStatusBadge";
import {withRouter} from "react-router-dom";

const DashboardTicketRow = ({onSelectRow, ticket = {}, active = false}) => {
    const {subject, software_issue, operating_system, id, created_at} = ticket;
    return (
        <tr onClick={e => onSelectRow(e, ticket)} className={ active ? "selected" : ""}>
            <td>
                <div className="ticket-summary">
                    <b className="ticket-subject">{subject}</b><br/>
                    <small className="ticket-meta">{software_issue} ({operating_system})</small> &nbsp;
                    <span className="ticket-id">#{id}</span>
                </div>
            </td>
            <td><TicketStatusBadge status={ticket.status}/></td>
            <td>
                <span className="ticket-assigned_to">
                    {ticket.assigned_to_fullname}
                </span>
            </td>
            <td>
                <span className="ticket-created_at">{moment(created_at).format("DD/MM/YYYY").toString()}</span><br/>
                <small><i>{moment(moment.utc(created_at)).local().fromNow()}</i></small>
            </td>
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
        this.props.history.push(`/tickets/${ticket.id}`);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            searchedTickets: nextProps.tickets
        });
    }

    handleSearch(event, keyword){
        event.preventDefault();

        // on empty search, return all tickets
        if (keyword.trim().length == 0) {
            this.setState({ searchedTickets: this.props.tickets });
            return;
        }

        // use the Fuse library to search
        const fuse = new Fuse(this.props.tickets, {
            shouldSort: true,
            threshold: 0.1,
            location: 0,
            distance: 1000,
            maxPatternLength: 32,
            minMatchCharLength: 0,
            keys: ["id", "subject", "software_issue", "operating_system"]
        });
        this.setState({ searchedTickets: fuse.search(keyword) });
    }

    render() {
        return (
            <div>
                {this.props.title && <h4>{this.props.title}</h4> }
                <DataTable {...this.props} data={this.state.searchedTickets} onSearch={this.handleSearch}>{ (ticket, index) => 
                    <DashboardTicketRow onSelectRow={this.handleSelectedTicket} key={index} ticket={ticket} active={(this.state.selectedTicket && this.state.selectedTicket.id === ticket.id)}/>
                }</DataTable>
            </div>
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

const mapDispatchToProps = (dispatch, props) => {
    return {
        searchTickets: function(keyword){
            dispatch(TicketActions.searchTickets(keyword));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardTickets));