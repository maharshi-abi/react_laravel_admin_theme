import React ,{Component} from 'react';
import {connect} from "react-redux";
import SideMenu from "../../Layout/SideMenu";
import Navigation from "../../Layout/TopNav";
import Pagination from "react-js-pagination";
import * as UserAction from "./Container/UserController";
import UserList from "./UserList";
import { CSVLink } from "react-csv";

const UserIcon = require('react-feather/dist/icons/users').default;

class Index extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            activePage: 1,
            totalData: 0,
            per_page: 5,
            recordList: false,
        };
    }

    componentDidMount() {
        this.props.userList(this.state.activePage);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.totalData !== undefined) {
            this.setState({
                data: nextProps.userListData,
                activePage: nextProps.current_page,
                totalData: nextProps.totalData,
                per_page: nextProps.per_page,
                recordList: nextProps.recordList,
            });
        }
    }

    handlePageChange(pageNumber) {
        this.setState({activePage: 'page='+pageNumber});
        this.props.userList('?page='+pageNumber);
    }

    handleSearchChange(evt) {
        if(evt.target.value){
            this.props.userList('?search='+evt.target.value);
        }
    }

    render() {
        let userList,statusMessage,csvData,headers;
        if(this.state.totalData !== 0) {
            statusMessage = '';
            userList = this.state.data.map((user,key) =>
                <UserList key={key} id={user.id} name={user.name} email={user.email} avatar={user.avatar}/>
            );

            csvData = [
                ["firstname", "lastname", "email"],
                ["Ahmed", "Tomi", "ah@smthing.co.com"],
                ["Raed", "Labes", "rl@smthing.co.com"],
                ["Yezzi", "Min l3b", "ymin@cocococo.com"]
            ];

        }else{
            csvData = [];
            statusMessage = <h4 className={'text-center'}>Record not found</h4>;
            userList = [];
        }

        return (
            <div className="UserIndexLayout">
                <div id="app">
                    <SideMenu/>
                    <div id="main">
                        <Navigation/>
                        <div className="main-content container-fluid">
                            <div className="page-title">
                                <h4><UserIcon/> User List</h4>
                                <hr/>
                            </div>

                            <section id="basic-horizontal-layouts">
                                <div className="row" id="table-hover-row">
                                    <div className="col-md-12 mr-2 mb-2">
                                        <div className="float-left">
                                            <CSVLink data={csvData} className="btn btn-info" filename={"demo_users.csv"} >Download CSV</CSVLink>
                                        </div>
                                        <div className="float-right">
                                            <input className="form-control" placeholder="Search User..." type="text"onChange={this.handleSearchChange.bind(this)}/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="card-content">

                                                <div className="table-responsive">
                                                    <table className="table table-hover table-striped mb-0">
                                                        <thead>
                                                        <tr>
                                                            <th>Image</th>
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>#</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {userList}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                {statusMessage}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <nav aria-label="Page navigation example">
                                <ul className={"pagination pagination-primary  justify-content-center"}>
                                    <Pagination
                                        activePage={this.state.activePage}
                                        itemsCountPerPage={this.state.per_page}
                                        totalItemsCount={this.state.totalData}
                                        onChange={this.handlePageChange.bind(this)}
                                        itemClass="page-item"
                                        linkClass="page-link"
                                        pageRangeDisplayed={8}
                                    />
                                </ul>
                                </nav>
                            </section>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        current_page : state.UserSection.current_page,
        per_page : state.UserSection.per_page,
        totalData : state.UserSection.totalData,
        userListData : state.UserSection.userList,
        recordList : state.UserSection.recordList,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        userList: (data) => dispatch(UserAction.userList(data)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Index);
