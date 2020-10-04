import React, { useState,useEffect,Suspense } from 'react';
import SideMenu from "../Layout/SideMenu";
import Navigation from "../Layout/TopNav";
import { CSVLink } from "react-csv";
import { lazy } from '@loadable/component';
import Pagination from "react-js-pagination";
const AdminInfo = lazy(() => import('./List'));
const UserIcon = require('react-feather/dist/icons/users').default;

export default function Admin(props) {
    const csvHeader = [ { label: "Name", key: "name" }, { label: "Email", key: "email" }];
    const userData = { current_page : 1, per_page : 5, totalData : 0, userList : [], recordList : false};
    const [users, setUsers] = useState(userData);
    const [csvData, setCsvData] = useState([]);
    const [activePage, setActivePage] = useState(1);

    const getUserList = async (data) => {
        console.log(data);
        let link;
        if(data === 1 || typeof(data) === 'undefined'){
            link = 'users/list';
        }else{
            link = 'users/list'+data;
        }
        const userInfo = await axios.get(link);
        setUsers({
            current_page : userInfo.data.data.current_page,
            per_page : userInfo.data.data.per_page,
            totalData : userInfo.data.data.total,
            userList : userInfo.data.data.data,
            recordList : false,
        });
        setCsvData(userInfo.data.exportData);
    };

    function handleInputChange(event) {
        console.info(event.target.value);
        getUserList('?search='+event.target.value);
    }

    function handlePageChange(pageNumber) {
        setActivePage(pageNumber);
        getUserList('?page='+pageNumber);
    }

    useEffect(() => {
        getUserList();
        return () => { };
    },[]);

    return (
        <React.Fragment>
            <div id="app">
                <SideMenu/>
                <div id="main">
                    <Navigation/>
                    <div className="main-content container-fluid">
                        <div className="page-title">
                            <h5>
                                <UserIcon/> Admin List ({users.totalData})
                            </h5>
                            <hr/>
                        </div>

                        <section id="basic-horizontal-layouts">
                            <div className="row" id="table-hover-row">
                                <div className="col-md-12 mr-2 mb-2">
                                    <div className="float-left">
                                        <CSVLink data={csvData} headers={csvHeader} className={"btn btn-success float-right"}
                                                 filename={"admin.csv"}>Download
                                        CSV</CSVLink>
                                    </div>
                                    <div className="float-right">
                                        <input className="form-control" placeholder="Search User..." type="text" onChange={ handleInputChange }/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-content">

                                            <div className="table-responsive">
                                                <Suspense fallback={<div>Loading...</div>}>
                                                <table className="table table-hover table-striped mb-0">
                                                    <thead>
                                                    <tr>
                                                        <th>Avatar</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>#</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>

                                                        {users.userList.map((user,key) =>(
                                                                <AdminInfo key={key} id={user.id} name={user.name} email={user.email} avatar={user.avatar}/>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                </Suspense>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <nav aria-label="Page navigation example">
                                <ul className={"pagination pagination-primary  justify-content-center"}>
                                    <Pagination
                                        activePage={activePage}
                                        itemsCountPerPage={users.per_page}
                                        totalItemsCount={users.totalData}
                                        onChange={handlePageChange}
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
        </React.Fragment>
    );
}

