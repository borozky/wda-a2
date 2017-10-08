import React, { Component } from 'react';
import EntryHeader from "../components/EntryHeader";
import { Route, Redirect } from "react-router-dom";
import * as SessionActions from "../actions/SessionActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import RegisterForm from "./RegisterForm";
import SignInForm from "./SignInForm";

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
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12">
                                        <h4>Sign in with Facebook <br/><small>Signing in using Facebook is recommended.</small></h4>
                                        <button className="btn btn-lg btn-primary" onClick={e => {this.props.onLogin()}}>
                                            <i className="fa fa-facebook"></i> Login with Facebook
                                        </button>
                                        <hr/>
                                        <br/>
                                    </div>
                                </div>
                                {
                                    process.env.REACT_APP_ENABLE_CREATE_ACCOUNT_WITH_EMAIL_PASSWORD &&
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-4">
                                            <SignInForm login={this.props.signInWithEmailAndPassword}/>
                                        </div>
                                        <div className="col-xs-12 col-sm-4">
                                            <RegisterForm />
                                        </div>
                                    </div>
                                }
                                <br/>
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
        },
        signInWithEmailAndPassword: function(email, password) {
            dispatch(SessionActions.signInWithEmailAndPassword(email, password));
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(SignInPage));