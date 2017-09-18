
import React, { Component } from 'react';
import Fuse from "fuse.js";
import "../stylesheets/DataTable.css";

const DataTableLoading = ({numCols}) => <tr><td colSpan={numCols} style={{textAlign: "center"}}>Loading...</td></tr>
const DataTableNoItems = ({numCols}) => <tr><td colSpan={numCols} style={{textAlign: "center"}}>No items found.</td></tr>

/**
 * DataTable component
 * 
 * REQUIRED PROPS:
 * - children(item, index) - children must be an anonymous function
 * - data[]
 * - columns[]
 * - searchableItems[]
 * 
 * Optional Props
 * - currentPage=1
 * - itemsPerPage=10
 * - onSelectRow()
 * - onPaginate()
 * - onSearch()
 * - loading: false
 */
class DataTable extends Component {

    constructor(props){
        super(props);
        this.data = props.data; // cache data here
        this.state = { currentPage: this.props.currentPage, itemsPerPage: this.props.itemsPerPage, data: [], searchTerm: "" };
        this.firstItemIndex = this.firstItemIndex.bind(this);
        this.numPages = this.numPages.bind(this);
        this.displayedData = this.displayedData.bind(this);
        this.handleOnSearch = this.handleOnSearch.bind(this);
        this.handlePaginate = this.handlePaginate.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }


    // computed properties
    firstItemIndex(){ return (this.state.currentPage - 1) * this.state.itemsPerPage };
    numPages(){ return Math.ceil(this.state.data.length / this.state.itemsPerPage); }
    displayedData(){ return this.state.data.slice(this.firstItemIndex(), this.firstItemIndex() + this.state.itemsPerPage); }


    // Use componentWillReceiveProps when working with fetching data outside this component
    // eg. fetching from ajax
    componentWillReceiveProps(nextProps){
        this.data = nextProps.data;
        this.setState({ 
            data: this.data 
        });
    }


    // handle search functionality via Fuse.js
    handleOnSearch(event){
        event.preventDefault();
        const keyword = document.getElementById("DatatableSearch").value.toString();
        if (keyword.trim().length === 0) {
            this.setState({ currentPage: 1, data: this.data, searchTerm: keyword });
        } else {
            this.setState({
                data: this.props.onSearch(event, keyword, this.props.searchableItems), 
                currentPage: 1,
                searchTerm: keyword
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


    handleOnChange(event){
        event.preventDefault();
        let value = "";
        if(event.target.tagName === "INPUT"){
            value = event.target.value;
        }
        if(value.trim().length === 0){
            this.setState({data: this.data});  // display original data when search box is empty
        }
    }


    render() {

        // handles the num of results label
        // eg "1 - 10 of 1000 results"
        let label = `${this.firstItemIndex() + 1} - ${this.firstItemIndex() + this.state.itemsPerPage} of ${this.state.data.length}`;
        if(this.props.data.length === 0){
            label = "0";
        } else if(this.firstItemIndex() + this.state.itemsPerPage > this.props.data.length){
            label = `${this.firstItemIndex()} - ${this.props.data.length} of ${this.props.data.length}`;
        }

        const {searchTerm, currentPage} = this.state;
        const {columns, children} = this.props;
        const items = this.state.data.length > 0 ? 
                        this.displayedData().map((item, index) => children(item, index)) : 
                        <DataTableNoItems numCols={columns.length} />;

        return (
            <div className="datatable-wrapper" style={this.props.style}>
                <div className="datatable-controls">
                    <div className="datatable-control-left">{label} results</div>
                    <div className="datatable-search">
                        <form onSubmit={this.handleOnSearch.bind(this)}>
                            <input type="search" id="DatatableSearch" placeholder="Search" defaultValue={searchTerm} onChange={this.handleOnChange}/>
                        </form>
                    </div>
                </div>
                <div className="datatable-parent">
                    <table className="datatable">
                        <thead>
                            <tr>
                                {columns.map((column, index) => <th key={index}>{column.toString()}</th>)}
                            </tr>
                        </thead>
                        <tbody>{ this.props.loading ? <DataTableLoading numCols={columns.length}/> : items }</tbody>
                    </table>
                </div>
                <div className="datatable-pagination">
                    <button className="datatable-first" onClick={e => {this.handlePaginate(e, 1)}}>First</button>
                    <button className="datatable-previous" onClick={e => {this.handlePaginate(e, currentPage - 1)}}>Previous</button>
                    <button className="datatable-next" onClick={e => {this.handlePaginate(e, currentPage + 1)}}>Next</button>
                    <button className="datatable-last" onClick={e => {this.handlePaginate(e, this.numPages())}}>Last</button>
                </div>
            </div>
        );
    }
}


DataTable.defaultProps = {
    currentPage: 1,
    itemsPerPage: 10,
    style: {},
    loading: false,
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