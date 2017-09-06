import React from 'react';

const AccountStatus = ({user}) => {

    // empty user
    if (user === null || Boolean(user) === false) {
        return (
            <li>You are not logged in! 
                <a href="#" className="btn btn-xs btn-default pull-right" id="AccountAction">
                    <i className="fa fa-facebook"></i>&nbsp; Login with Facebook
                </a>
            </li>
        );
    }

    return (
        <li>Welcome, { user.fullname }&nbsp; <a href="#" id="LogoutButton" className="btn btn-default btn-xs">Logout</a></li>
    );
};

AccountStatus.defaultProps = {
    user: null
}

export default AccountStatus;