import React, { Component } from 'react';
import EntryHeader from "../../components/EntryHeader";
import { Link } from "react-router-dom";
import { FixedWidthSidebar, Sidebar, ResponsiveContent } from "../../components/FixedWidthSidebar";
import TicketStatusBadge from "../../components/TicketStatusBadge";
import TinyMCE from 'react-tinymce';

class TicketPage extends Component {

    constructor(props){
        super(props)
        this.state = {
            ticket: this.props.location.state.ticket,
            comments: []
        }
    }

    render() {
        return (
            <div id="TicketsPage">
                <EntryHeader>
                    <h3>Ticket Details</h3> 
                </EntryHeader>
                <div className="container">
                    <div className="site-content">
                        <FixedWidthSidebar direction="right">
                            <Sidebar>
                                <p>
                                    <b>Status:</b><br/>
                                    <TicketStatusBadge status={this.state.ticket.status}/>
                                </p>
                                <p>
                                    <b>Submitted by: </b><br/>
                                    <span>{this.state.ticket.user.fullname}</span>
                                </p>
                                <p>
                                    <b>Software Isssue</b><br/>
                                    <span>{this.state.ticket.software_issue}</span>
                                </p>
                                <p>
                                    <b>Operating System</b><br/>
                                    <span>{this.state.ticket.operating_system}</span>
                                </p>
                                
                            </Sidebar>
                            <ResponsiveContent style={{paddingRight: 20}}>
                                <h4>Subject: {this.state.ticket.subject}</h4>
                                <div className="ticket-details" style={{minHeight: 140}}>
                                    {this.state.ticket.details}
                                </div>
                                <hr/>
                                <div className="ticket-comment-area">
                                    <b>Comments</b>
                                    <div className="ticket-comments">
                                        {this.state.comments.length === 0 && <span>There are no comments in this ticket</span>}
                                    </div>
                                    <hr/>
                                    <form>
                                        <b>Add comment</b>
                                        <p>
                                            <TinyMCE content="" config={{plugins: 'link image code', toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code' }} onChange={this.handleEditorChange} />
                                        </p>
                                        <p><button type="submit" id="SubmitCommentButton" className="btn btn-xs btn-success">Submit comment</button></p>
                                    </form>
                                </div>
                            </ResponsiveContent>
                        </FixedWidthSidebar>
                    </div>
                </div>
            </div>
        );
    }
}

export default TicketPage;