import React, { Component } from 'react';
import SiteHeader from "./containers/SiteHeader";
import SiteMain from "./containers/SiteMain";
import SiteFooter from "./containers/SiteFooter";
import SignInPage from "./containers/SignInPage";
import * as SessionActions from "./actions/SessionActions";
import AssignUserRole from "./containers/AssignUserRole";

import { connect } from "react-redux";
import {provider, auth} from './client';
import { withRouter } from "react-router-dom";

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

        return (
            <div className="site-wrapper">
                <SiteHeader user={this.props.currentUser} onLogin={this.login} onLogout={this.logout}/>
                {(this.props.currentUser && !this.props.signingUp) ? ((this.props.currentUser.role)?<SiteMain/>:<AssignUserRole/>) : <SignInPage/>}
                <SiteFooter />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.currentUser,
        signingUp: state.session.signingUp
    }
}


export default withRouter(connect(mapStateToProps)(App));