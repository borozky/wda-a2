import React, { Component } from 'react';
import "../../stylesheets/TicketFilterForm.css";

class TicketFilterForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmit} className="ticket-filter-form">
                <table>
                    <thead><tr><td colSpan="2">{this.props.title}</td></tr></thead>
                    <tbody>
                        {this.props.filters.map((f,index) => 
                            <tr key={index}>
                                <td><input type="checkbox" defaultValue={f.defaultValue} {...f} name={this.props.name} /></td>
                                <td><label htmlFor={f.id}>{f.label}</label></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <input type="submit" className="btn btn-xs"/>
            </form>
        );
    }
}

export default TicketFilterForm;