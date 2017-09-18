import React, { Component } from 'react';
import EntryHeader from "../../components/EntryHeader";
import faker from "faker";
import { Redirect } from "react-router-dom";
import DataTable from "../../components/DataTable";
import {connect} from "react-redux";
import moment from "moment";
import * as TicketActions from "../../actions/TicketActions";

class TicketsPage extends Component {

    componentDidMount(){
        this.props.getAllTickets();
    }

    render(){
        const {tickets, searchableItems, columns, loadingTickets} = this.props;

        return <div id="TicketsPage">
            <EntryHeader>
                <h3>All Tickets</h3>
            </EntryHeader>
            <div className="site-content">
                <div className="container">
                    <DataTable loading={loadingTickets} data={tickets} searchableItems={searchableItems} columns={columns} style={{maxWidth: "100%"}}>{(ticket, index) => 
                        <tr>
                            <td>
                                <div className="ticket-summary">
                                    <b className="ticket-subject">{ticket.subject}</b><br/>
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
        tickets: state.tickets.data,
        searchableItems: ["id", "subject", "software_issue", "operating_system"],
        columns: ["Tickets", "Assigned to", "Created"],
        loadingTickets: state.tickets.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTickets: function(){
            dispatch(TicketActions.getAllTickets());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketsPage);