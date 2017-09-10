import React, {Component} from 'react';
import {provider, auth} from '../client';
import {connect} from "react-redux";
import * as SessionActions from "../actions/SessionActions";

const AccountStatus = ({user, onLogin, onLogout}) => {

    if (user === null || Boolean(user) === false) {
        return (
            <li>You are not logged in! 
                <button className="btn btn-xs btn-default pull-right" id="AccountAction" onClick={e => {onLogin()}}>
                    <i className="fa fa-facebook"></i>&nbsp; Login with Facebook
                </button>
            </li>
        );
    }

    return (
        <li>Welcome, { user.displayName }&nbsp; 
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
        user: state.session.currentUser
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