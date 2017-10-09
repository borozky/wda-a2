import React, { Component } from 'react';
import {NavLink, Link} from "react-router-dom";

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
                    <Link to="/dashboard" className="navbar-brand">ITS Ticketing System</Link>
                </div>
                <div id="Navbar" className="collapse navbar-collapse">
                    {
                        this.props.user &&
                        <ul className="nav navbar-nav navbar-right">
                            <li><NavLink to="/dashboard" activeClassName="active"><i className="fa fa-tachometer"></i>&nbsp; Dashboard</NavLink></li>
                            {
                                (this.props.user.role && this.props.user.role == "helpdesk") &&
                                <li>
                                    <NavLink to="/tickets" activeClassName="active"><i className="fa fa-ticket"> </i>&nbsp; Tickets</NavLink>
                                </li>
                            }
                            {
                                (this.props.user.role && this.props.user.role == "tech") &&
                                <li>
                                    <NavLink to="/profile" activeClassName="active"><i className="fa fa-user"> </i>&nbsp; Profile</NavLink>
                                </li>
                            }
                        </ul>
                    }
                </div>
            </div>
            
        );
    }
}

export default NavBottom;