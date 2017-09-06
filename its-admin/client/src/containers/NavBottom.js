import React, { Component } from 'react';
import {NavLink} from "react-router-dom";

class NavBottom extends Component {
    render() {
        return (
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#Navbar" aria-expanded="false" aria-controls="navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a href="#" className="navbar-brand">ITS Ticketing System</a>
                </div>
                <div id="Navbar" className="collapse navbar-collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li><NavLink to="/dashboard" activeClassName="active"><i className="fa fa-tachometer"></i>&nbsp; Dashboard</NavLink></li>
                        <li><NavLink to="/tickets" activeClassName="active"><i className="fa fa-ticket"> </i>&nbsp; Tickets</NavLink></li>
                        <li><NavLink to="/leaderboards" activeClassName="active"><i className="fa fa-bar-chart"> </i>&nbsp; Leaderboards</NavLink></li>
                    </ul>
                </div>
            </div>
            
        );
    }
}

export default NavBottom;