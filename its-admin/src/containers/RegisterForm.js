import React, { Component } from 'react';
import {provider, auth, ref} from '../client';
import "../stylesheets/RegisterForm.css";
import * as SessionActions from "../actions/SessionActions";

import {connect} from "react-redux";


class RegisterForm extends Component {

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            email: "",
            password: "",
            fullname: ""
        }
    }

    handleSubmit(event){
        event.preventDefault();

        // some validation here ???

        this.props.register({
            email: this.state.email,
            password: this.state.password,
            fullname: this.state.fullname
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="register-form">
                <h4>Register</h4>
                <table>
                    <tbody>
                        <tr>
                            <td>Fullname</td>
                            <td><input type="text" required={true} name="staff-fullname" onChange={e => {this.setState({fullname: e.target.value})}}/></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td><input type="email" required={true} name="staff-email" onChange={e => {this.setState({email: e.target.value})}}/></td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td><input type="password" required={true} name="staff-password" defaultValue={""} onChange={e => {this.setState({password: e.target.value})}}/></td>
                        </tr>
                        <tr className="form-submission-row">
                            <td colSpan="2">
                                <input type="submit" className="btn btn-sm btn-success" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        ...props,
        signinUp: state.session.signinUp
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: function(staffDetails = {}){
            dispatch(SessionActions.register(staffDetails));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);