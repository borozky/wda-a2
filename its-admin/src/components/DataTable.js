
import React, { Component } from 'react';
import Fuse from "fuse.js";
import "../stylesheets/DataTable.css";
import PropTypes from 'prop-types';

const DataTableLoading = ({numCols}) => <tr><td colSpan={numCols} style={{textAlign: "center"}}>Loading...</td></tr>
const DataTableNoItems = ({numCols}) => <tr><td colSpan={numCols} style={{textAlign: "center"}}>No items found.</td></tr>
const DataTableWrapper = ({children, style}) => <div className="datatable-wrapper" style={style}>{children}</div>
const DataTableControls = ({label, onSubmit, defaultValue}) => 
    <div className="datatable-controls">
        <div className="datatable-control-left">{label} results</div>
        <div className="datatable-search">
            <form onSubmit={onSubmit}>
                <input type="search" id="DatatableSearch" placeholder="Search" defaultValue={defaultValue}/>
            </form>
        </div>
    </div>
const DataTablePagination = ({onFirst, onPrevious, onNext, onLast}) =>
    <div className="datatable-pagination">
        <button className="datatable-first" onClick={onFirst}>First</button>
        <button className="datatable-previous" onClick={onPrevious}>Previous</button>
        <button className="datatable-next" onClick={onNext}>Next</button>
        <button className="datatable-last" onClick={onLast}>Last</button>
    </div>
const DataTableParent = ({children, loading=false}) => 
    <div className={`datatable-parent ${ loading ? " loading" : "" }`}>{children}</div>


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

    static defaultProps = {
        currentPage: 1,
        itemsPerPage: 10,
        style: {},
        loading: false,
        onPaginate: function(event, page){
            return;
        },
        onSelectRow: function(event, item){
            return;
        }
    }

    static propTypes = {
        onSearch: PropTypes.func.isRequired,
        currentPage: PropTypes.number,
        itemsPerPage: PropTypes.number,
        loading: PropTypes.bool,
        onPaginate: PropTypes.func,
        onSelectRow: PropTypes.func,
        children: PropTypes.func.isRequired
    }

    constructor(props){
        super(props);
        this.data = props.data; // cache data here
        this.state = { currentPage: this.props.currentPage, itemsPerPage: this.props.itemsPerPage, data: this.props.data, searchTerm: "" };
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


    // Use componentWillReceiveProps when working with fetching data outside this component
    // eg. fetching from ajax
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        this.data = nextProps.data;
        this.setState({ 
            data: nextProps.data 
        });
    }


    // delegate search functionality to parent component
    handleOnSearch(event){
        event.preventDefault();
        const keyword = document.getElementById("DatatableSearch").value.toString();
        this.props.onSearch(event, keyword);
        this.setState({ currentPage: 1 });
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

        return (
            <DataTableWrapper style={this.props.style}>
                <DataTableControls onSubmit={this.handleOnSearch} defaultValue={searchTerm} label={label}/>
                <DataTableParent loading={this.props.loading}>
                    <table className="datatable">
                        <thead>
                            <tr>
                                {columns.map((column, index) => <th key={index}>{column.toString()}</th>)}
                            </tr>
                        </thead>
                        <tbody>{ 
                            /* 
                            the children of this component SHOULD BE a FUNCTION, not a COMPONENT!!! (ie. children(item, index))
                            This allows component to render different types of table rows */
                            this.displayedData().length > 0 ? 
                                this.displayedData().map((item, index) => children(item, index)) : 
                                <DataTableNoItems numCols={columns.length} />
                        }</tbody>
                    </table>
                </DataTableParent>
                <DataTablePagination 
                    onFirst={e => {this.handlePaginate( e, 1 )}} 
                    onPrevious={e => {this.handlePaginate( e, currentPage - 1 )}}
                    onNext={e =>{this.handlePaginate( e, currentPage + 1 )}}
                    onLast={e => {this.handlePaginate( e, this.numPages() )}}
                    />
            </DataTableWrapper>
        );
    }
}


export default DataTable;