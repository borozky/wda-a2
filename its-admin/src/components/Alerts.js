import React from 'react';

const Alert = ({type, children}) => {
    return (
        <div className={`alert alert-${type}`}>
            <div className="container">
                {children}
            </div>
        </div>
    );
};

Alert.defaultProps = {
    type: "info"
}

export default Alert;