import React, { Component } from 'react';
import AccountStatus from "../components/AccountStatus";
import SwitchRoleForm from "../containers/SwitchRoleForm";
import {provider, auth} from '../client';

import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import * as SessionActions from "../actions/SessionActions";

const NavtopLeft = (props) => 
    <ul id="Navtop-left" className="hidden-xs">
        <li><SwitchRoleForm /></li>
    </ul>

const NavtopRight = (props) =>
    <ul id="Navtop-right">
        <AccountStatus {...props} />
    </ul>

const Container = ({children}) => <div className="container clearfix">{children}</div>


class Navtop extends Component {
    render() {
        return (
            <div id="Navtop">
                <Container>
                    <NavtopLeft />
                    <NavtopRight {...this.props}/>
                </Container>
            </div>
        );
    }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navtop));