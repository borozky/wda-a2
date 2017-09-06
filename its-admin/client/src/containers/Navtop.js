import React, { Component } from 'react';
import AccountStatus from "../components/AccountStatus";

class Navtop extends Component {
    render() {
        return (
            <div id="Navtop">
                <div className="container clearfix">
                    <ul id="Navtop-left" className="hidden-xs">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                    <ul id="Navtop-right">
                        <AccountStatus />
                    </ul>
                </div>
            </div>
        );
    }
}

export default Navtop;