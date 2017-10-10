import React, { Component } from 'react';
import {NavLink, Link} from "react-router-dom";

const NavbarToggle = () => 
    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#Navbar" aria-expanded="false" aria-controls="navbar">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
    </button>

const NavbarBrand = ({to}) => 
    <Link to={to} className="navbar-brand">ITS Ticketing System</Link>

const NavbarHeader = ({children}) => 
    <div className="navbar-header">{children}</div>

const NavbarCollapse = ({children}) => 
    <div id="Navbar" className="collapse navbar-collapse">{children}</div>

const NavbarNav = ({children, direction="right"}) => 
    <ul className={`nav navbar-nav navbar-${direction}`}>{children}</ul>


class NavBottom extends Component {
    render() {
        return (
            <div className="container">
                <NavbarHeader>
                    <NavbarToggle />
                    <NavbarBrand to="/dashboard"/>
                </NavbarHeader>
                <NavbarCollapse>
                    {
                        this.props.user &&
                        <NavbarNav direction="right">
                            <li><NavLink to="/dashboard" activeClassName="active"><i className="fa fa-tachometer"></i>&nbsp; Dashboard</NavLink></li>
                            {
                                (this.props.user.role && this.props.user.role == "helpdesk") &&
                                <li><NavLink to="/tickets" activeClassName="active"><i className="fa fa-ticket"> </i>&nbsp; Tickets</NavLink></li>
                            }
                            {
                                (this.props.user.role && this.props.user.role == "tech") &&
                                <li><NavLink to="/profile" activeClassName="active"><i className="fa fa-user"> </i>&nbsp; Profile</NavLink></li>
                            }
                        </NavbarNav>
                    }
                </NavbarCollapse>
            </div>
        );
    }
}

export default NavBottom;