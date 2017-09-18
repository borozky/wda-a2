import React, { Component } from 'react';
import DataTable, { DataTableRow } from "../../components/DataTable";
import {connect} from "react-redux";
import Fuse from "fuse.js";
import moment from "moment";

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
            <td><span className="ticket-assigned_to"></span></td>
            <td><span className="ticket-created_at">{moment(created_at).format("DD/MM/YYYY").toString()}</span></td>
        </tr>
    );
};

class DashboardTickets extends Component {
    render() {
        const {tickets, onSelectRow, columns, searchableItems, selectedTicket} = this.props;
        return (
            <DataTable {...this.props} data={tickets}>{ (ticket, index) => 
                <DashboardTicketRow {...this.props} key={index} ticket={ticket} active={(selectedTicket && selectedTicket.id === ticket.id)}/>
            }</DataTable>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tickets: state.tickets.data,
        searchableItems: ["id", "subject", "software_issue", "operating_system"],
        columns: ["Tickets", "Assigned to", "Created"]
    }
}

export default connect(mapStateToProps)(DashboardTickets);