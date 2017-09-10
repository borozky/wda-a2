import React, { Component } from 'react';
import moment from "moment";

export function TicketsTableParent({children}){
    return <div className="tickets-table-parent">{children}</div>
}

export function TicketsTableControls({current, numItems, onSearch, itemsPerPage, changeItemsPerPage}){
    let label = `${current} - ${current + itemsPerPage - 1} of ${numItems}`;

    if(numItems === 0){
        label = "0";
    } else if(current + itemsPerPage > numItems){
        label = `${current} - ${numItems} of ${numItems}`;
    }

    return <div className="tickets-table-controls">
               <div className="tickets-table-results-label">
                   {label} results &nbsp;
                   <select name="items-per-page" onChange={e => {changeItemsPerPage(e, Number(e.target.value))}}>
                       <option value="10" selected="selected">10 items per page</option>
                       <option value="25">25 items per page</option>
                       <option value="50">50 items per page</option>
                   </select>
               </div>
               <form className="tickets-table-search" onSubmit={e => onSearch(e, document.getElementById("SearchInput").value)}>
                   <input type="text" id="SearchInput" name="search" className="form-control input-xs" onChange={e => onSearch(e, document.getElementById("SearchInput").value)}/>
                   <button type="submit" className="btn btn-sm btn-primary">Search</button>
               </form>
           </div>
}

function TicketsTableRow({ticket, onSelectRow}){
    return <tr onClick={e => {onSelectRow(e, ticket)}}>
        <td>
            <div className="ticket-summary">
                <b className="ticket-subject">{ticket.subject}</b><br/>
                <small className="ticket-meta">{ticket.software_issue} ({ticket.operating_system})</small>
                <span className="ticket-id">#{ticket.id}</span>
            </div>
        </td>
        <td><span className="ticket-status">{ticket.status.toString().toLowerCase()}</span></td>
        <td><span className="ticket-assigned_to"></span></td>
        <td><span className="ticket-created_at">{moment(ticket.created_at).format("DD/MM/YYYY").toString()}</span></td>
        <td><span className="ticket-last_update"></span></td>
    </tr>
}

export function TicketsTable({ headers, onSelectHeader, rows, onSelectRow}){
    return <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>{headers.map((item, index) => 
                        <th key={index} onClick={e => onSelectHeader(e, item)}>{item}</th>)}
                    </tr>
                </thead>
                <tbody>{rows.map((item, index) => 
                    <TicketsTableRow key={index} ticket={item} onSelectRow={onSelectRow} />
                )}</tbody>
            </table>
        </div>
}

export function TicketsTablePagination({currentPage, numPages, goToPage}){
    return <div>
        <button onClick={e => {goToPage(e, 1)}}>First</button>
        <button onClick={e => {goToPage(e, currentPage - 1)}}>Previous</button>
        <button onClick={e => {goToPage(e, currentPage + 1)}}>Next</button>
        <button onClick={e => {goToPage(e, numPages)}}>Last</button>
    </div>
}