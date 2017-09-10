import React, { Component } from 'react';

class DropdownForm extends Component {
    render() {
        return (
            <div className="dropdown">
                <button 
                    className="btn btn-xs dropdown-toggle" 
                    type="button" 
                    id="dropdownMenu1" 
                    data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="true">
                Dropdown
                <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">Separated link</a></li>
                </ul>
            </div>
        );
    }
}

export default DropdownForm;