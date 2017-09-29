import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import xss from "xss";
import moment from "moment";


import "../../stylesheets/Comments.css";

class Comments extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const {comments} = this.props;
        if (comments == null || comments.length == 0) {
            return (<div className="ticket-comments">
                    <span>There are no comments in this ticket</span>
                </div>);
        } else {
            return (<div className="ticket-comments">
                        {
                            comments.map((comment, index) => <li className="comment" key={index}>
                                <span className="commenter">By: {comment.commentor_fullname}</span> - <small><i>{comment.commentor_email}</i></small><br/>
                                <div className="comment-details" dangerouslySetInnerHTML={{__html: xss(comment.details)}}></div>
                                <small>{moment(moment.utc(comment.created_at)).local().fromNow()}</small>
                            </li>)
                        }
                    </div>);
        }
    }
}


export default Comments;