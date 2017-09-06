import React from 'react';

export default ({title, children}) => 
<div className="dashboard-section clearfix">
    <div className="container clearfix">
        <h4 className="dashboard-section-title">{title}</h4>
        <div className="dashboard-section-body clearfix">
            {children}
        </div>
    </div>
</div>
