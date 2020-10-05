import React, { useState,useEffect,useReducer } from 'react';
import SideMenu from "../Layout/SideMenu";
import Navigation from "../Layout/TopNav";
import EmpInfo from './List';
import * as UserReducer from '../User/UserList/Container/UserController';

const UserIcon = require('react-feather/dist/icons/users').default;

export default function Employee(props) {
    const userController = UserReducer;
    const userData = { current_page : 1, per_page : 5, totalData : 0, userList : [], recordList : false};

    const getUserList = async (data) => {
        const [users, setUsers] = useReducer(userController.userList(data));
        console.log(users);
    };

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
                                <UserIcon/> Admin List (XX)
                            </h5>
                            <hr/>
                        </div>

                        <section id="basic-horizontal-layouts">
                            <div className="row" id="table-hover-row">
                                <div className="col-md-12 mr-2 mb-2">
                                    <div className="float-right">
                                        <input className="form-control" placeholder="Search User..." type="text" />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-content">

                                            <div className="table-responsive">
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

                                                        {/*{users.userList.map((user,key) =>(
                                                                <EmpInfo key={key} id={user.id} name={user.name} email={user.email} avatar={user.avatar}/>
                                                        ))}*/}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </section>
                    </div>

                </div>
            </div>
        </React.Fragment>
    );
}

