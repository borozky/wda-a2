import React, { Component } from 'react';

const Container = ({children}) => <div className="container clearfix">{children}</div>

class SiteFooter extends Component {
    render() {
        return (
            <div className="site-footer">
                <Container>
                    Copyright &copy; 2017 All Rights Reserved. <br/><small>Created and designed by Joshua Orozco</small>
                </Container>
            </div>
        );
    }
}

export default SiteFooter;