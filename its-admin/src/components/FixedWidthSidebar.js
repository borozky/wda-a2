import React from 'react';
import "../stylesheets/fixed-width-sidebar.css";

import PropTypes from 'prop-types';


/**
 * @augments {Component<{children: React.Component, style: Object, width: number}, {}>}
 */
export function Sidebar({children, style, width}){
    let styling = {
        ...style,
        width: width,
        marginRight: -1 * Number(width)
    }
    return <div className="fixed-sidebar" style={styling}>{children}</div>
}



/**
 * The main content for the fixed width sidebar
 * 
 * @param {Object} props.children - Children component
 * @param {Object} props.style - The style of the responsive content
 * @param {string} props.className - Additional classes for the responsive content
 */
export function ResponsiveContent({children, style, className}){
    return <div className={`responsive-content ${className}`}><div className="inner" style={style}>{children}</div></div>
}


/**
 * Wrapper for fixed width sidebar and responsive contents
 * 
 * @param {string} props.direction - Left or right
 * @param {Object} props.style - Style of this wrapper
 * @param {Object} props.children - The children components. Must have 1 <Sidebar /> and 1 <ResponsiveContent />
 */
export function FixedWidthSidebar({direction, style, children}){
    return (<div className={`clearfix margin sidebar-${direction}`} style={style}>{children}</div>);
}



