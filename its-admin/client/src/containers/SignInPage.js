import React, { Component } from 'react';
import EntryHeader from "../components/EntryHeader";
import { Route, Redirect } from "react-router-dom";
import * as SessionActions from "../actions/SessionActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class SignInPage extends Component {

    render() {
        return (
            <div className="site-main">
                <Route path="signin">                  
                    <div id="SignInPage">
                        <EntryHeader>
                            <h3>Sign In<br/>
                                <small>Please sign in to enable access to this application.</small>
                            </h3>
                        </EntryHeader>
                        <div className="site-content">
                            <div className="container">
                                <button className="btn btn-lg btn-primary" onClick={e => {this.props.onLogin()}}>
                                    <i className="fa fa-facebook"></i> Login with Facebook
                                </button>
                            </div>
                        </div>
                    </div>
                </Route>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: function(){
            dispatch(SessionActions.login());
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(SignInPage));