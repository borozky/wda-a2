import React, { Component } from 'react';
import SiteHeader from "./containers/SiteHeader";
import SiteMain from "./containers/SiteMain";
import SiteFooter from "./containers/SiteFooter";

class SiteWrapper extends Component {
    render() {
        return (
            <div className="site-wrapper">
                <SiteHeader />
                <SiteMain />
                <SiteFooter />
            </div>
        );
    }
}

export default SiteWrapper;