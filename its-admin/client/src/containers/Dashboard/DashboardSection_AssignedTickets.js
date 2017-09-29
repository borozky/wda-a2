import React, { Component } from 'react';

class DashboardSection_AssignedTickets extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <DashboardSection title="New tickets">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <DashboardTickets onSelectRow={this.handleOnSelectRow}/>
                    </div>
                    <div className="col-xs-12 col-sm-6">{this.state.selectedTicket &&
                        <TicketSummary ticket={this.state.selectedTicket}/>
                    }</div>
                </div>
            </DashboardSection>
        );
    }
}

export default DashboardSection_AssignedTickets;