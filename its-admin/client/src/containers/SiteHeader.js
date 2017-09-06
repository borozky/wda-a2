import React, { Component } from 'react';
import Navtop from "./Navtop";
import NavBottom from "./NavBottom";

class SiteHeader extends Component {
    render() {
        return (
            <div className="site-header">
              <nav className="navbar">
                <Navtop />
                <NavBottom />
              </nav>
            </div>
        );
    }
}

export default SiteHeader;