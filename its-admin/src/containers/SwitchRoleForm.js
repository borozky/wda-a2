import React, { Component } from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as StaffActions from "../actions/StaffActions";
import "../stylesheets/SwitchRoleForm.css";

// DROPDOWN TOGGLE BUTTON
const DropdownToggle = ({currentUser}) =>                 
    <button className="btn btn-xs dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
        Current role: {currentUser.role && currentUser.role.toString().toUpperCase()} &nbsp;
        <span className="caret"></span>
    </button>

// Role option
// - this is just a radio button that is wrapped in a label
// - this component is used when user tries to switch roles
const RoleOption = ({role="helpdesk", onChange, text="", level=0, checked=false}) =>
    <label htmlFor="role-helpdesk-level-0">
        <input type="radio" name="role" value={level} onChange={onChange} id={`role-${role}-level-${level}`} checked={checked}/> {text}
    </label>

// Dropdown menu form
// similar to bootstrap's dropdown, but this dropdown is a submittable form
const DropdownMenuForm = ({children, onSubmit}) => 
    <form onSubmit={onSubmit} className="dropdown-menu" aria-labelledby="dropdownMenu1">{children}</form>


// SwitchRoleForm 
// smart component
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
                <DropdownToggle currentUser={this.props.currentUser} />
                <DropdownMenuForm onSubmit={this.handleOnSubmit}>
                    <b>Switch Role</b><br/>
                    <RoleOption role="helpdesk" level="0" text="Helpdesk" onChange={this.handleOnChange} checked={this.state.role_level == false} /><br/>
                    <RoleOption role="tech" level="1" text="Level 1 Technician" onChange={this.handleOnChange} checked={(this.props.currentUser && this.state.role_level == 1)}/><br/>
                    <RoleOption role="tech" level="2" text="Level 2 Technician" onChange={this.handleOnChange} checked={(this.props.currentUser && this.state.role_level == 2)}/><br/>
                    <RoleOption role="tech" level="3" text="Level 3 Technician" onChange={this.handleOnChange} checked={(this.props.currentUser && this.state.role_level == 3)}/><br/>
                    <button {...disabledProps} className="btn btn-xs btn-primary">Switch Role</button>
                </DropdownMenuForm>
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