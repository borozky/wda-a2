import React from 'react';

export default ({tickets}) => 
<table className="tickets-table">
    <thead>
        <tr>
            <th>ID</th>
            <th>Ticket details</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>{tickets.map(ticket => 
        <tr key={ticket.id}>
            <td>
                {ticket.id}
            </td>
            <td>
                <b>{ticket.subject}</b><br/>
                <small>From: {ticket.user.fullname}</small>
            </td>
            <td>{ticket.status}</td>
        </tr>
    )}</tbody>
</table>