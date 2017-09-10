import React from 'react';
import moment from "moment";

const DashboardTicketRow = (props) => {
    return (
        <tr onClick={e => {props.onSelectRow(e, props.ticket)}} className={ props.active ? "selected" : ""}>
            <td>
                <div className="ticket-summary">
                    <b className="ticket-subject">{props.ticket.subject}</b><br/>
                    <small className="ticket-meta">{props.ticket.software_issue} ({props.ticket.operating_system})</small>
                    <span className="ticket-id">#{props.ticket.id}</span>
                </div>
            </td>
            <td><span className="ticket-assigned_to"></span></td>
            <td><span className="ticket-created_at">{moment(props.ticket.created_at).format("DD/MM/YYYY").toString()}</span></td>
        </tr>
    );
};

export default DashboardTicketRow;