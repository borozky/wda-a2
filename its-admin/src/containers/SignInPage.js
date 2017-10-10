import React, { Component } from 'react';
import EntryHeader from "../components/EntryHeader";
import { Route, Redirect } from "react-router-dom";
import * as SessionActions from "../actions/SessionActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import RegisterForm from "./RegisterForm";
import SignInForm from "./SignInForm";


const Container = ({children}) => 
    <div className="container">{children}</div>

const Row = ({children}) => 
    <div className="row">{children}</div>

const SiteContentContainerRow = ({children}) => 
    <div className="site-content">
        <Container>
            <Row>{children}</Row>
        </Container>
    </div>

const ColXs12 = ({children, className}) => 
    <div className={`col-xs-12 ${className}`}>{children}</div>

const SignInRegistrationArea = ({login}) => 
    process.env.REACT_APP_ENABLE_CREATE_ACCOUNT_WITH_EMAIL_PASSWORD && <Row>
        <ColXs12 className="col-sm-4">
            <SignInForm login={login}/>
        </ColXs12>
        <ColXs12 className="col-sm-4">
            <RegisterForm />
        </ColXs12>
    </Row>

const SignInWithFacebookArea = ({onLogin}) =>
    <ColXs12 className="col-sm-12">
        <h4>Sign in with Facebook <br/><small>Signing in using Facebook is recommended.</small></h4>
        <button className="btn btn-lg btn-primary" onClick={e => {onLogin()}}>
            <i className="fa fa-facebook"></i> Login with Facebook
        </button>
        <hr/><br/>
    </ColXs12>


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
                        <SiteContentContainerRow>
                            {
                                /* 
                                Do not use 'this.props.onLogin()' with parenthesis 
                                or else you automatically log the user in when the component is loaded */
                                <SignInWithFacebookArea onLogin={this.props.onLogin} />
                            }
                            {
                                /* 
                                This application allow registration with email and password. 
                                You can enable/disable it by editing the .ENV file */
                                <SignInRegistrationArea onLogin={this.props.signInWithEmailAndPassword} />
                            }
                            <br/>
                        </SiteContentContainerRow>
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