import React, {Component} from 'react';
import {provider, auth} from '../client';
import {connect} from "react-redux";
import * as SessionActions from "../actions/SessionActions";
import Loading from "../components/Loading";

const AccountStatus = ({user, onLogin, onLogout, loggingIn}) => {

    // If user is logged in display something like "Welcome, Joshua Orozco" or "Welcome, -no name-"
    let welcomeArray = [];
    let welcomeMessage = "";
    if (user) {
        if (user.fullname) {
            welcomeArray.push(user.fullname)
        } else if (user.displayName) {
            welcomeArray.push(user.displayName)
        } else {
            welcomeArray.push("-no name-")
        }
        welcomeMessage = welcomeArray.join(" ");
    }

    // disable button while logging in
    let disabledProps = {};
    if ( loggingIn ) {
        disabledProps.disabled = "disabled"
    }


    // when user is not logged in, this is displayed
    if (user) {
        return (
            <li>
                <span title={user.email}>Welcome, {welcomeMessage}</span>&nbsp; 
                <button id="LogoutButton" className="btn btn-default btn-xs" onClick={e => {onLogout()}}>
                    Logout
                </button>
            </li>
        );
    }

    // or display a message saying you are not logged in
    return (
        <li>
            { loggingIn && <Loading text="Logging in"/> }
            You are not logged in! 
            <button {...disabledProps} className="btn btn-xs btn-default pull-right" id="AccountAction" onClick={e => {onLogin()}}>
                <i className="fa fa-facebook"></i>&nbsp; Login with Facebook
            </button>
        </li>
    );


}

export default AccountStatus;