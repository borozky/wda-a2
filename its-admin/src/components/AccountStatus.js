import React, {Component} from 'react';
import {provider, auth} from '../client';
import {connect} from "react-redux";
import * as SessionActions from "../actions/SessionActions";
import Loading from "../components/Loading";

const AccountStatus = ({user, onLogin, onLogout, loggingIn}) => {

    let welcomeArray = [];

    if (user === null || Boolean(user) === false) {
        let disabledProps = {};
        if ( loggingIn ) {
            disabledProps.disabled = "disabled"
        }

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

    if (user.fullname) {
        welcomeArray.push(user.fullname)
    } else if (user.displayName) {
        welcomeArray.push(user.displayName)
    } else {
        welcomeArray.push("-no name-")
    }

    let welcomeMessage = welcomeArray.join(" ");

    return (
        <li>
            <span title={user.email}>Welcome, {welcomeMessage}</span>&nbsp; 
            <button id="LogoutButton" 
                    className="btn btn-default btn-xs" 
                    onClick={e => {onLogout()}}>
                Logout
            </button>
        </li>
    );

}


const mapStateToProps = (state) => {
    return {
        user: state.session.currentUser,
        loggingIn: state.session.loggingIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: function(){
            dispatch(SessionActions.login());
        },
        onLogout: function(){
            dispatch(SessionActions.logout());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountStatus);