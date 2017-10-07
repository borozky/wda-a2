import React, { Component } from 'react';
import DataTable from "../../components/DataTable";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as StaffActions from "../../actions/StaffActions";

const DashboardStaffRow = ({staff = {}}) => {
    let role = staff.role;
    if (staff.role_level && staff.role_level > 0) {
        role = role.concat(" (Level " + staff.role_level + ")");
    }
    return (
        <tr>
            <td>
                <b>{staff.fullname}</b><br/>
                <i>{staff.email}</i>
            </td>
            <td>{role}</td>
            <td>{staff.assignedTickets.length}</td>
            <td>{staff.assignedTickets.filter(t => t.status == "Resolved").length}</td>
        </tr>
    );
};

class DashboardStaffList extends Component {

    constructor(props){
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.state = {
            foundStaff: this.props.staff
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({ foundStaff: nextProps.staff })
    }

    handleSearch(event, keyword){
        if (keyword.length == 0) {
            this.setState({foundStaff: this.props.staff});
        } else {
            let foundStaff = this.props.staff.filter(person => {
                return person.email.indexOf(keyword) > -1 || person.fullname.indexOf(keyword) > -1 || person.role.indexOf(keyword) > -1;
            });
            this.setState({ foundStaff: foundStaff });
        }
    }

    render() {
        return (
            <div id="DashboardStaffList">
                <DataTable {...this.props} data={this.state.foundStaff} onSearch={this.handleSearch}>{(person, index) =>
                    <DashboardStaffRow staff={person}/> 
                }</DataTable>
            </div>
        );
    }

    componentDidMount(){
        if (this.props.staff.length == 0) {
            this.props.getAllStaff();
        }
    }
}

const mapStateToProps = (state) => {
    let staffWithAssignedTickets = state.staff.data.map(staff => {
        let foundTickets = state.tickets.data.filter(ticket => staff.uid == ticket.assigned_to_uid);
        console.log("FOUND TICKETS FOR STAFF " + staff.fullname + ": " + foundTickets.length);
        return {
            ...staff,
            assignedTickets: foundTickets
        }
    })

    return {
        staff: staffWithAssignedTickets,
        loading: state.staff.loading || state.tickets.loading,
        columns: ["Staff Fullname", "Role", "Assigned tickets", "Tickets resolved"],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllStaff: function(){
            dispatch(StaffActions.getAllStaff());
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardStaffList));