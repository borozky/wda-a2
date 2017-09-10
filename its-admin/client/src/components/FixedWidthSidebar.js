import React from 'react';
import "../stylesheets/fixed-width-sidebar.css";

export function Sidebar({children, style}){
    return <div className="fixed-sidebar">{children}</div>
}

export function ResponsiveContent({children, style}){
    return <div className="responsive-content"><div className="inner" style={style}>{children}</div></div>
}

export function FixedWidthSidebar({direction, style, children}){
    return (<div className={`clearfix margin sidebar-${direction}`} style={style}>{children}</div>);
}

/*
<div class="clearfix margin sidebar-right">
	<div class="fixed-sidebar">.fixed-sidebar</div>
	<div class="responsive-content">
		<div class="inner">
			<code>.responsive-content</code> using css <code>calc()</code>.<br>
			<code>.inner</code> is <b>optional</b> when using the <code>calc()</code> method.
		</div>
	</div>
</div>
*/



