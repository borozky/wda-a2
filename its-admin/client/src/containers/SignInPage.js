import React, { Component } from 'react';
import EntryHeader from "../components/EntryHeader";
import { Route, Redirect } from "react-router-dom";

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
                            Sign in page
                        </div>
                    </div>
                </Route>
            </div>
        );
    }
}

export default SignInPage;