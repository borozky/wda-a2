import React, { Component } from 'react';
import EntryHeader from "../../components/EntryHeader";
import "../../stylesheets/TicketsPage.css";
import faker from "faker";
import {TicketsTableParent, TicketsTableControls, TicketsTable, TicketsTablePagination} from "../../components/TicketsTable";

class TicketsPage extends Component {

    constructor(props){
        super(props);

        // store all tickets here
        this.tickets = this.getTickets();

        // event binding
        this.handleOnSearch = this.handleOnSearch.bind(this);
        this.handleGoToPage = this.handleGoToPage.bind(this);
        this.handleChangeItemsPerPage = this.handleChangeItemsPerPage.bind(this);
        
        // use functions to compute properties
        this.state = { currentPage: 1, itemsPerPage: 10, tickets: this.tickets };
        this.state.firstItemIndex = () => (this.state.currentPage - 1) * this.state.itemsPerPage;
        this.state.numPages = () =>Math.ceil(this.state.tickets.length / this.state.itemsPerPage);
        this.state.displayedTickets = () => this.state.tickets.slice(this.state.firstItemIndex(), this.state.firstItemIndex() + this.state.itemsPerPage);
    }

    // randomly generate tickets using faker.js
    getTickets(){
        const operating_system = ["Windows", "Mac", "Linux"];
        const software_issue = [ "Google services setup", "Service accounts", "Storage", "Cloud storage increase", "Wifi Setup", "Printing", "Misconfigured software", "other"];
        let tickets = [];

        for(let i = 0; i < 1000; i++){
            tickets.push({
                id: i + 1,
                user: { fullname: faker.name.findName(), email: faker.internet.email() },
                operating_system: operating_system[parseInt(Math.random() * operating_system.length, 10)],
                software_issue: software_issue[parseInt(Math.random() * software_issue.length, 10)],
                subject: faker.lorem.words(),
                details: faker.lorem.text(),
                status: "PENDING",
                created_at: faker.date.recent()
            });
        };

        return tickets.sort((a, b) => b.created_at - a.created_at);
    }

    // handle search
    handleOnSearch(event, keyword){
        event.preventDefault();

        let searchTerm = keyword.replace(" ", "").toLowerCase();

        // search with empty string will display all tickets
        if(searchTerm.split("").length === 0){
            this.setState({ currentPage: 1, tickets: this.tickets });
            return;
        } 
        
        // filter tickets
        else {
            let filteredTickets = this.tickets.filter(ticket => {
                if(ticket.id.toString().indexOf(searchTerm) !== -1) return true;
                if(ticket.user.fullname.replace(" ", "").toLowerCase().indexOf(searchTerm) !== -1) return true;
                if(ticket.user.email.indexOf(searchTerm) !== -1) return true;
                if(ticket.operating_system.replace(" ", "").toLowerCase().indexOf(searchTerm) !== -1) return true;
                if(ticket.software_issue.replace(" ", "").toLowerCase().indexOf(searchTerm) !== -1) return true;
                if(ticket.subject.replace(" ", "").toLowerCase().indexOf(searchTerm) !== -1) return true;
                if(ticket.status.replace(" ", "").toLowerCase().indexOf(searchTerm) !== -1) return true;
            });

            this.setState({ tickets: filteredTickets });
        }

    }

    // sort by column
    handleOnSelectHeader(event, header){
        event.preventDefault();
        console.log(header);
    }

    // handler when ticket is selected
    handleOnSelectRow(event, ticket){
        event.preventDefault();
        console.log(ticket);
    }

    // handler for pagination
    handleGoToPage(event, page){
        console.log(page);
        if(page > 0 && page <= this.state.numPages()){
            this.setState({currentPage: page});
        }
    }


    handleChangeItemsPerPage(event){
        let itemsPerPage = Number(event.target.value);
        this.setState({itemsPerPage: itemsPerPage});
    }



    render() {
        return <div id="TicketsPage">
                    <EntryHeader><h3>Tickets</h3></EntryHeader>
                    <div className="container">
                        <div className="site-content">
                            <TicketsTableParent>
                                <TicketsTableControls 
                                    current={this.state.firstItemIndex() + 1} 
                                    itemsPerPage={this.state.itemsPerPage} 
                                    numItems={this.state.tickets.length} 
                                    changeItemsPerPage={this.handleChangeItemsPerPage}
                                    onSearch={this.handleOnSearch} />
                                <TicketsTable 
                                    headers={["Tickets", "Status", "Assigned to", "Created", "Last update"]} 
                                    onSelectHeader={this.handleOnSelectHeader} 
                                    rows={this.state.displayedTickets()} 
                                    onSelectRow={this.handleOnSelectRow} />
                                <TicketsTablePagination 
                                    currentPage={this.state.currentPage} 
                                    numPages={this.state.numPages()} 
                                    goToPage={this.handleGoToPage} />
                            </TicketsTableParent>
                        </div>
                    </div>
                </div>;
    }
}

export default TicketsPage;