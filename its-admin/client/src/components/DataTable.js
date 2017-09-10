
import React, { Component } from 'react';
import Fuse from "fuse.js";
import "../stylesheets/DataTable.css";

class DataTable extends Component {

    constructor(props){
        super(props);
        this.data = props.data; // cache data here
        this.state = { currentPage: this.props.currentPage, itemsPerPage: this.props.itemsPerPage, data: [] };
        this.firstItemIndex = this.firstItemIndex.bind(this);
        this.numPages = this.numPages.bind(this);
        this.displayedData = this.displayedData.bind(this);
        this.handleOnSearch = this.handleOnSearch.bind(this);
        this.handlePaginate = this.handlePaginate.bind(this);
    }

    // computed properties
    firstItemIndex(){ return (this.state.currentPage - 1) * this.state.itemsPerPage };
    numPages(){ return Math.ceil(this.state.data.length / this.state.itemsPerPage); }
    displayedData(){ return this.state.data.slice(this.firstItemIndex(), this.firstItemIndex() + this.state.itemsPerPage); }

    componentWillReceiveProps(nextProps){
        this.data = nextProps.data;
        this.setState({ 
            data: this.data 
        });
    }

    // handle search - default search mechanism is provided by Fuse.js
    handleOnSearch(event, keyword){
        event.preventDefault();

        if (keyword.trim().length === 0) {
            this.setState({ currentPage: 1, data: this.data });
        } else {
            this.setState({
                data: this.props.onSearch(event, keyword, this.props.searchableItems), 
                currentPage: 1
            });
        }
    }

    // handle pagination
    handlePaginate(event, page){
        event.preventDefault();
        if(page > 0 && page <= this.numPages()){
            this.props.onPaginate(event, page);
            this.setState({currentPage: page});
        }
    }

    render() {
        let label = `${this.firstItemIndex()} - ${this.firstItemIndex() + this.state.itemsPerPage - 1} of ${this.state.data.length}`;
        if(this.props.data.length === 0){
            label = "0";
        } else if(this.firstItemIndex() + this.state.itemsPerPage > this.props.data.length){
            label = `${this.firstItemIndex()} - ${this.props.data.length} of ${this.props.data.length}`;
        }

        return (
            <div className="datatable-wrapper">
                <div className="datatable-controls">
                    <div className="datatable-control-left">{label} results</div>
                    <div className="datatable-search">
                        <form onSubmit={e => {this.handleOnSearch(e, document.getElementById("DatatableSearch").value)}}>
                            <input type="search" id="DatatableSearch"/>
                            <button type="submit">Search</button>
                        </form>
                    </div>
                </div>
                <div className="datatable-parent">
                    <table className="datatable">
                        <thead>
                            <tr>
                                {this.props.columns.map((column, index) => <th key={index}>{column.toString()}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {this.displayedData().map((item, index) => this.props.children(item, index))}
                        </tbody>
                    </table>
                </div>
                <div className="datatable-pagination">
                    <button className="datatable-first" onClick={e => {this.handlePaginate(e, 1)}}>First</button>
                    <button className="datatable-previous" onClick={e => {this.handlePaginate(e, this.state.currentPage - 1)}}>Previous</button>
                    <button className="datatable-next" onClick={e => {this.handlePaginate(e, this.state.currentPage + 1)}}>Next</button>
                    <button className="datatable-last" onClick={e => {this.handlePaginate(e, this.numPages())}}>Last</button>
                </div>
            </div>
        );
    }
}

DataTable.defaultProps = {
    currentPage: 1,
    itemsPerPage: 10,
    onSearch: function(event, keyword, searchableItems){
        const fuse = new Fuse(this.data, {
            shouldSort: true,
            threshold: 0.2,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 0,
            keys: searchableItems
        });
        return fuse.search(keyword);
    },
    onPaginate: function(event, page){
        return;
    },
    onSelectRow: function(event, item){
        return;
    }
}


export default DataTable;