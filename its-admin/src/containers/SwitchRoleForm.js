import React, { Component } from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import * as StaffActions from "../actions/StaffActions";

import "../stylesheets/SwitchRoleForm.css";

class SwitchRoleForm extends Component {
    constructor(props){
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);

        this.state = {
            role: this.props.currentUser.role,
            role_level: this.props.currentUser.role_level || 0
        }
    }

    handleOnSubmit(event){
        event.preventDefault();
        this.props.updateProfile(this.props.currentUser.uid, this.state);
    }

    componentWillReceiveProps({currentUser}){
        this.setState({
            role: currentUser.role,
            role_level: currentUser.role_level
        });
    }

    handleOnChange(event){
        this.setState({
            role: event.target.value > 0 ? "tech" : "helpdesk",
            role_level: event.target.value
        });
    }

    render() {
        if ( ! this.props.currentUser.role) {
            return null;
        }

        let allowRoleSwitch = true;
        if (Number(this.state.role_level) === Number(this.props.currentUser.role_level)) {
            allowRoleSwitch = false;
        }

        let disabledProps = {};
        if (allowRoleSwitch == false) {
            disabledProps["disabled"] = "disabled";
        }

        return (
            <div className="dropdown" id="SwitchRoleForm">
                <button className="btn btn-xs dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Current role: {this.props.currentUser.role && this.props.currentUser.role.toString().toUpperCase()} &nbsp;
                    <span className="caret"></span>
                </button>
                <form onSubmit={this.handleOnSubmit} className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <b>Switch Role</b><br/>
                    <label htmlFor="role-helpdesk-level-0">
                        <input type="radio" name="role" value="0" onChange={this.handleOnChange}
                                id="role-helpdesk-level-0" checked={this.state.role_level == false}/> Helpdesk
                    </label><br/>
                    <label htmlFor="role-tech-level-1">
                        <input type="radio" name="role" value="1" onChange={this.handleOnChange}
                                id="role-tech-level-1" checked={(this.props.currentUser && this.state.role_level == 1)}/> Level 1 Technician
                    </label><br/>
                    <label htmlFor="role-tech-level-2">
                        <input type="radio" name="role" value="2" onChange={this.handleOnChange}
                                id="role-tech-level-2" checked={(this.props.currentUser && this.state.role_level == 2)}/> Level 2 Technician
                    </label><br/>
                    <label htmlFor="role-tech-level-3">
                        <input type="radio" name="role" value="3" onChange={this.handleOnChange}
                                id="role-tech-level-3" checked={(this.props.currentUser && this.state.role_level == 3)}/> Level 3 Technician
                    </label><br/>
                    <button {...disabledProps} className="btn btn-xs btn-primary">Switch Role</button>
                </form>
            </div>
           
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.currentUser || {}
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: function(userID, newDetails = {}){
            dispatch(StaffActions.updateStaffProfile(userID, newDetails));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SwitchRoleForm)) ;