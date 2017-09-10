import React, { Component } from 'react';
import SiteHeader from "./containers/SiteHeader";
import SiteMain from "./containers/SiteMain";
import SiteFooter from "./containers/SiteFooter";

import {provider, auth} from './client';

class App extends Component {

    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);


        this.state = {
            user: null
        }
    }

    login() {
        auth().signInWithPopup(provider).then(result => {
            this.setState({user: result.user});
        });
    }

    logout() {
        auth().signOut().then(() =>{
            this.setState({user: null});
        });
    }

    render() {
        const {user} = this.state
        return (
            <div className="site-wrapper">
                <SiteHeader user={this.state.user} onLogin={this.login} onLogout={this.logout}/>
                <SiteMain />
                <SiteFooter />
            </div>
        );
    }
}

export default App;