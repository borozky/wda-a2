import React from 'react';
import Alert from "../../components/Alerts";
import TicketStatusBadge from "../../components/TicketStatusBadge";
import "../../stylesheets/TicketStatusArea.css";

const TicketStatusArea = ({ticket}) => {
    let priorityElem = null;
    switch (ticket.priority) {
        case "high":
            priorityElem = <span className="label label-default">HIGH PRIORITY</span>
            break;
        case "medium":
            priorityElem = <span className="label label-warning">medium priority</span>
            break;
        default:
            priorityElem = null;
    }
    return <div><TicketStatusBadge status={ticket.status}/> &nbsp;{priorityElem}<hr/></div>
};

export default TicketStatusArea;