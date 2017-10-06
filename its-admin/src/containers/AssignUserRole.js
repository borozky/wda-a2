import React, { Component } from 'react';
import {Route} from "react-router-dom";
import EntryHeader from "../components/EntryHeader";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import * as StaffActions from "../actions/StaffActions";

class AssignUserRole extends Component {
    constructor(props){
        super(props);
        this.applyForRoleWithLevel = this.applyForRoleWithLevel.bind(this);
    }

    applyForRoleWithLevel(level = 0){
        this.props.applyForRoleWithLevel(this.props.currentUser, level);
    }

    render() {
        return (
            <div className="site-main">
                <Route path="set-role">                  
                    <div id="AssignUserRolePage">
                        <EntryHeader>
                            <h3>Select your role<br/>
                                <small>You aren't assigned a role yet.</small>
                            </h3>
                        </EntryHeader>
                        <div className="site-content">
                            <div className="container">
                                <h4>You are logged in but has no current role<br/>
                                    <small>In order to use this application, you have to select a role that fits you</small>
                                </h4>
                                <hr/>
                                <p>
                                    <h5>Helpdesk role</h5>
                                    <button className="btn btn-lg btn-success" onClick={e => {e.preventDefault(); this.applyForRoleWithLevel(0)}}>Apply as helpdesk staff</button> &nbsp;
                                </p>
                                <hr/>
                                <p>
                                    <h5>Technician roles</h5>
                                    <button className="btn btn-default" onClick={e => {e.preventDefault(); this.applyForRoleWithLevel(1)}}>Apply as Level 1 Technician</button> &nbsp;<br/>
                                    <button className="btn btn-warning" onClick={e => {e.preventDefault(); this.applyForRoleWithLevel(2)}}>Apply as Level 2 Technician</button> &nbsp;<br/>
                                    <button className="btn btn-danger" onClick={e => {e.preventDefault(); this.applyForRoleWithLevel(3)}}>Apply as Level 3 Technician</button> &nbsp;<br/>
                                </p>
                            </div>
                        </div>
                    </div>
                </Route>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        applyForRoleWithLevel: function(user, level = 0){
            let profileDetails = {
                role: level > 0 ? "tech" : "helpdesk",
                role_level: level,
                email: user.email
            }
            dispatch(StaffActions.updateStaffProfile(user.uid, profileDetails));
        }
    }
}



export default withRouter( connect(mapStateToProps, mapDispatchToProps)(AssignUserRole) );