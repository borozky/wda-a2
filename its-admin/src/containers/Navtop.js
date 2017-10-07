import React, { Component } from 'react';
import AccountStatus from "../components/AccountStatus";
import SwitchRoleForm from "../containers/SwitchRoleForm";

class Navtop extends Component {
    render() {
        return (
            <div id="Navtop">
                <div className="container clearfix">
                    <ul id="Navtop-left" className="hidden-xs">
                        <li>
                            <SwitchRoleForm />
                        </li>
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