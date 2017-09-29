import React, { Component } from 'react';
import EntryHeader from "../../components/EntryHeader";
import { Link } from "react-router-dom";
import { FixedWidthSidebar, Sidebar, ResponsiveContent } from "../../components/FixedWidthSidebar";
import * as TicketActions from "../../actions/TicketActions";
import * as CommentActions from "../../actions/CommentActions";
import Comments from "./Comments";
import TicketStatusForm from "./TicketStatusForm";
import EscalationLevelForm from "./EscalationLevelForm";
import TicketPriorityForm from "./TicketPriorityForm";
import moment from "moment";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import "../../stylesheets/TicketPage.css";

import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class TicketPage extends Component {

    constructor(props){
        super(props);
        this.state = { comment: "" }
        this.addComment = this.addComment.bind(this);
        this.props.getAllTickets();
        this.handleEditorChange = this.handleEditorChange.bind(this);

        window.moment = moment;
    }

    addComment(e){
        e.preventDefault();
        const ticket_id = this.props.match.params.id;
        const user = this.props.currentUser;
        this.props.addComment(ticket_id, this.state.comment, user);
        this.setState({ comment: "" }); 
    }

    handleEditorChange(value){
        this.setState({ comment: value });
    }

    componentDidMount(){
        console.log("TICKET ID", this.props.match.params.id);
        this.props.getCommentsByTicketID(this.props.match.params.id);
    }

    render() {
        const { ticket, comments } = this.props;
        console.log(this.props);

        if (ticket == null) {
            return null;
        }

        return (
            <div id="TicketsPage">
                <EntryHeader>
                    <h3>Ticket Details</h3> 
                </EntryHeader>
                <div className="container">
                    <div className="site-content">
                        <FixedWidthSidebar direction="right">
                            <Sidebar>
                                <TicketStatusForm ticket={ticket} status={ticket.status}/>
                                <EscalationLevelForm ticket={ticket} escalationLevel={ticket.escalation_level} />
                                <TicketPriorityForm ticket={ticket} priority={ticket.priority || ""}/>
                                <p>
                                    <b>Submitted by: </b><br/>
                                    <span>{ticket.user.fullname}</span>
                                </p>
                                <p>
                                    <b>Software Isssue</b><br/>
                                    <span>{ticket.software_issue}</span>
                                </p>
                                <p>
                                    <b>Operating System</b><br/>
                                    <span>{ticket.operating_system}</span>
                                </p>
                                
                            </Sidebar>
                            <ResponsiveContent style={{paddingRight: 20}}>
                                <h4>Subject: {ticket.subject}</h4>
                                <div className="ticket-details" style={{minHeight: 140}}>
                                    {ticket.details}
                                </div>
                                <hr/>
                                <div className="ticket-comment-area">
                                    <form onSubmit={ this.addComment } style={{height: 200}}>
                                        <b>Add comment</b><br/>
                                        <ReactQuill value={this.state.comment} onChange={this.handleEditorChange}/>
                                        <button type="submit" id="SubmitCommentButton" className="btn btn-xs btn-success">Submit comment</button>
                                    </form>
                                    <hr/>
                                    <b>Comments</b>
                                    <Comments comments={comments} />
                                </div>
                            </ResponsiveContent>
                        </FixedWidthSidebar>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {

    const params = props.match.params; 
    const ticketID = params.id;
    const tickets = state.tickets.data;
    const comments = state.comments.data;
    const foundTicket = tickets.filter(ticket => ticket.id == ticketID)[0] || null;
    const foundComments = foundTicket ? comments.filter(comment => comment.ticket_id == foundTicket.id) : [];
    const sortedComments = foundComments.sort(function(commentA, commentB){
        const dateA = moment(commentA.created_at).toDate();
        const dateB = moment(commentB.created_at).toDate();

        // latest comment first
        return dateA < dateB;
    });

    return {
        ticket: foundTicket,
        currentUser: state.session.currentUser,
        comments: sortedComments,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTickets: function(ticketID){
            dispatch(TicketActions.getAllTickets());
        },
        addComment: function(ticketID, comment, user){
            dispatch(CommentActions.addComment(ticketID, comment, user));
        },
        getAllComments: function(){
            dispatch(CommentActions.getAllComments());
        },
        getCommentsByTicketID: function(ticketID){
            dispatch(CommentActions.getCommentsByTicketID(ticketID));
        }
    }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TicketPage));