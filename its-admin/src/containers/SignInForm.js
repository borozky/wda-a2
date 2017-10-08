import React, { Component } from 'react';
import * as SessionActions from "../actions/SessionActions";

import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class SignInForm extends Component {

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            email: "",
            password: ""
        }
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.login(this.state.email, this.state.password);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="signin-form" method="POST">
                <h4>Sign in<br/>
                <small> Sign in with your email and password</small></h4>
                <table>
                    <tbody>
                        <tr>
                            <td style={{textAlign: "right"}}>Email</td>
                            <td><input type="email" name="staff-email" onChange={e => {this.setState({email: e.target.value})}} style={{margin: "0px 0px 4px 4px"}}/></td>
                        </tr>
                        <tr>
                            <td style={{textAlign: "right"}}>Password</td>
                            <td><input type="password" name="staff-password" defaultValue={""} onChange={e => {this.setState({password: e.target.value})}} style={{margin: "0px 0px 4px 4px"}}/></td>
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

export default SignInForm;