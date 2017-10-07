import React from 'react';
import "../stylesheets/LoadingLayer.css";

const LoadingLayer = () => {
    return (
        <span className="loading-layer">
            <span className="spinner">
                <i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
                <span className="sr-only">Loading...</span>
            </span>
        </span>
    );
};

export default LoadingLayer;