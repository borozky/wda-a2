import React from 'react';
import "../stylesheets/LoadingLayer.css";

const LoadingLayer = ({style, spinnerStyle={}}) => {
    return (
        <span className="loading-layer" style={style}>
            <span className="spinner" style={spinnerStyle}>
                <i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
                <span className="sr-only">Loading...</span>
            </span>
        </span>
    );
};

export default LoadingLayer;