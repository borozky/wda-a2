import React from 'react';

export default ({title = "", children}) => {
    return <div className="dashboard-section clearfix">
        {title.length > 0 && <h4 className="dashboard-section-title">{title}</h4>}
        <div className="dashboard-section-body clearfix">{children}</div>
    </div>
}

