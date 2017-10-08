import React, { Component } from 'react';
import EntryHeader from "../../components/EntryHeader";
import { Link, withRouter } from "react-router-dom";
import { FixedWidthSidebar, Sidebar, ResponsiveContent } from "../../components/FixedWidthSidebar";
import * as TicketActions from "../../actions/TicketActions";
import * as CommentActions from "../../actions/CommentActions";
import * as StaffActions from "../../actions/StaffActions";
import Comments from "../Tickets/Comments";
import TicketStatusArea from "../Tickets/TicketStatusArea";
import moment from "moment";
import LoadingLayer from "../../components/LoadingLayer";
import xss from "xss";
import ResolveTicketForm from "./ResolveTicketForm";

import "../../stylesheets/TicketPage.css";

import {connect} from "react-redux";

const TicketDetailsArea = ({ticket}) =>  
<div>
    <p><b>Submitted by: </b><br/><span>{ticket.user.fullname}</span></p>
    <p><b>Software Isssue</b><br/><span>{ticket.software_issue}</span></p>
    <p><b>Operating System</b><br/><span>{ticket.operating_system}</span></p>
</div>

const TicketFullDetailsArea = ({ticket}) => 
<div className="ticket-details" style={{minHeight: 140}}>
    <div dangerouslySetInnerHTML={{__html: xss(ticket.details)}}></div>
</div>

const TicketPageEntryHeader = ({nextTicket}) => 
<div className="row clearfix">
    <div className="col-xs-12 col-sm-8"><h3>Ticket Details</h3></div>
    <div className="col-xs-12 col-sm-4" style={{textAlign: "right"}}>
        <br/><br/>{ nextTicket && <Link to={`/tickets/${nextTicket.id}`}>Next ticket</Link> }
    </div>
</div>

class TechTicketPage extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        if (this.props.comments.length == 0) {
            this.props.getCommentsByTicketID(this.props.match.params.id);
        }
        this.props.getAllStaff();
    }

    render() {
        const { ticket, comments, currentUser } = this.props;
        
        if (ticket == null) {
            return null;
        }

        return (
            <div id="TicketsPage">
                <EntryHeader>
                    <TicketPageEntryHeader nextTicket={this.props.nextTicket} />
                </EntryHeader>
                <div className="container">
                    <div className="site-content">
                        <FixedWidthSidebar direction="right">
                            <Sidebar>
                                <ResolveTicketForm ticket={ticket} />
                                <TicketDetailsArea ticket={ticket} />
                            </Sidebar>
                            <ResponsiveContent style={{paddingRight: 20}}>
                                <h4>Subject: {ticket.subject}</h4>
                                <TicketStatusArea ticket={ticket} />
                                <TicketFullDetailsArea ticket={ticket} />
                                <hr/>
                                <div className={`ticket-comment-area${this.props.loadingComments && " loading"}`}>
                                    <b>Comments</b>
                                    <Comments comments={comments} />
                                    <LoadingLayer spinnerStyle={{color: "#444"}} style={{backgroundColor: "rgba(255,255,255,0.5)"}}/>
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
        
        const nextTicketID = Number(ticketID) + 1;
        const nextTicket = tickets.filter(ticket => ticket.id == nextTicketID)[0];
    
        return {
            ticket: foundTicket,
            currentUser: state.session.currentUser,
            comments: sortedComments,
            loadingComments: state.comments.loading,
            nextTicket: nextTicket
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
        },
        getAllStaff: function(){
            dispatch(StaffActions.getAllStaff());
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TechTicketPage));