import React, { Component } from 'react';
import EntryHeader from "../../components/EntryHeader";

import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class AccountPage extends Component {
    render() {
        return (
            <div id="AccountPage">
                <EntryHeader>
                    <h3>{this.props.currentUser.displayName}</h3>
                </EntryHeader>
                <div className="site-content">
                    <div className="container">
                        
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        currentUser: state.session.currentUser
    }
}

export default withRouter(connect(mapStateToProps)(AccountPage));