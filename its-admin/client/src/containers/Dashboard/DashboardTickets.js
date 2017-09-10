import React, { Component } from 'react';
import DataTable, { DataTableRow } from "../../components/DataTable";
import DashboardTicketRow from "./DashboardTicketRow";
import {connect} from "react-redux";

class DashboardTickets extends Component {
    render() {
        console.log("TICKETS", this.props.data);
        let props = this.props;
        return (
            <DataTable 
                data={props.data} 
                onSelectRow={props.onSelectRow} 
                columns={["Tickets", "Assigned to", "Created"]} 
                searchableItems={["id", "subject", "software_issue", "operating_system"]}>{ (ticket, index) => 
                <DashboardTicketRow {...props} key={index} ticket={ticket} active={(props.selectedTicket && props.selectedTicket.id === ticket.id)}/>
            }</DataTable>
        );
    }


}

const mapStateToProps = (state) => {
    return {
        data: state.tickets.data
    }
}

export default connect(mapStateToProps)(DashboardTickets);