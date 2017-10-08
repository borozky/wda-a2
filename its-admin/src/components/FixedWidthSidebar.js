import React from 'react';
import "../stylesheets/fixed-width-sidebar.css";

export function Sidebar({children, style, width}){
    let styling = {
        ...style,
        width: width,
        marginRight: -1 * Number(width)
    }
    return <div className="fixed-sidebar" style={styling}>{children}</div>
}

export function ResponsiveContent({children, style, className}){
    return <div className={`responsive-content ${className}`}><div className="inner" style={style}>{children}</div></div>
}

export function FixedWidthSidebar({direction, style, children}){
    return (<div className={`clearfix margin sidebar-${direction}`} style={style}>{children}</div>);
}



