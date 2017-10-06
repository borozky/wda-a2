import React, { Component } from 'react';
import "../../stylesheets/TicketFilterForm.css";

class TicketFilterForm extends Component {
    constructor(props){
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        
        this.state = {
            selectedValues: []
        }
    }

    handleOnSubmit(event){
        event.preventDefault();
        this.props.onSubmit(event, this.state.selectedValues);
    }

    handleOnChange(event){
        let selectedValues = []

        // for some reason, when setting an item from the Array this.props.filters[] 
        // passing null values to the defaultValue props in the input[type=checkbox] makes <input type="checkbox" value="on"/>
        let eventVal = event.target.value == "on" ? null : event.target.value;

        // remove item if exists or add otherwise
        if (this.state.selectedValues.indexOf(eventVal) > -1) {
             selectedValues = this.state.selectedValues.filter(value => value != eventVal)
        } else {
            selectedValues = this.state.selectedValues.concat([eventVal])
        }

        this.setState({ selectedValues: selectedValues })
    }

    render() {
        console.log("FILTERS", this.props.filter);

        return (
            <form onSubmit={this.handleOnSubmit} className="ticket-filter-form">
                <table>
                    <thead><tr><td colSpan="2">{this.props.title}</td></tr></thead>
                    <tbody>
                        {this.props.filters.map((f,index) => 
                            <tr key={index}>
                                <td><input {...f} type="checkbox" onChange={this.handleOnChange}  defaultValue={f.defaultValue}  name={this.props.name} /></td>
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