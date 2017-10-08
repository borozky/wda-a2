import React, { Component } from 'react';
import SiteHeader from "./containers/SiteHeader";
import SiteMain from "./containers/SiteMain";
import SiteFooter from "./containers/SiteFooter";
import SignInPage from "./containers/SignInPage";
import * as SessionActions from "./actions/SessionActions";
import LoadingLayer from "./components/LoadingLayer";

import { connect } from "react-redux";
import {provider, auth} from './client';
import { withRouter, Redirect } from "react-router-dom";

class App extends Component {
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login(e) {
        SessionActions.login();
    }

    logout(e) {
        SessionActions.logout();
    }

    render() {

        // if current user is not logged in and not in the sign-in page
        // Go to SIGN IN PAGE
        if (this.props.currentUser == null && this.props.location.pathname.indexOf("/signin") == -1) {
            return <Redirect to="/signin"/>
        }

        // if logged in and inside the signin page
        // Go to DASHBOARD PAGE
        else if (this.props.currentUser != null && this.props.location.pathname.indexOf("/signin") > -1) {
            return <Redirect to="/dashboard"/>
        } 

        // RENDER THE APP
        else {
            return (
                <div className={this.props.loggingIn ? "site-wrapper loading" : "site-wrapper"}>
                    <SiteHeader user={this.props.currentUser} onLogin={this.login} onLogout={this.logout}/>
                    {(this.props.currentUser && !this.props.signingUp) ? <SiteMain/> : <SignInPage/>}
                    <SiteFooter />
                    <LoadingLayer style={{backgroundColor:"#005453", color:"#fff"}} text="Signing In..."/>
                </div>
            );
        }

        
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.currentUser,
        signingUp: state.session.signingUp,
        loggingIn: state.session.loggingIn
    }
}


export default withRouter(connect(mapStateToProps)(App));