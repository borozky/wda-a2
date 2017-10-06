import React from 'react';

export default function Loading ({text = "", style = {}}) {
    return <span style={style} className="loading">
        <i className="fa fa-cog fa-spin fa-fw"></i>&nbsp;{text}
    </span>
}