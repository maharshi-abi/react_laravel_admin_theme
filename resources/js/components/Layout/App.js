import React ,{Component} from 'react';
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import '../../../../public/assets/css/bootstrap.css';
import '../../../../public/assets/vendors/perfect-scrollbar/perfect-scrollbar.css';
import '../../../../public/assets/css/app.css';
import '../../../../public/assets/vendors/perfect-scrollbar/perfect-scrollbar.min.js';
import '../../../../public/assets/js/app.js';
import logo from '../../../../public/assets/images/logo.svg'
import avatar from '../../../../public/assets/images/avatar/avatar-s-1.png'

const DashboardIcon = require('react-feather/dist/icons/home').default;
const UserIcon = require('react-feather/dist/icons/user').default;
const LogoutIcon = require('react-feather/dist/icons/log-out').default;

class App extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Layout">
                <div id="app">
                    <div id="sidebar" className='active'>
                        <div className="sidebar-wrapper active">
                            <div className="sidebar-header">
                                <img src={logo} alt={"logo"}/>
                            </div>
                            <div className="sidebar-menu">
                                <ul className="menu">

                                    <li className="sidebar-item active ">
                                        <a href="#" className='sidebar-link'>
                                            <DashboardIcon/>
                                            <span>Dashboard</span>
                                        </a>
                                    </li>

                                </ul>
                            </div>
                            <button className="sidebar-toggler btn x"><i data-feather="x"/></button>
                        </div>
                    </div>
                    <div id="main">
                        <nav className="navbar navbar-header navbar-expand navbar-light">
                            <a className="sidebar-toggler" href="#"><span className="navbar-toggler-icon"/></a>
                            <button className="btn navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"/>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav d-flex align-items-center navbar-light ml-auto">

                                    <li className="dropdown">
                                        <a href="#" data-toggle="dropdown"
                                           className="nav-link dropdown-toggle nav-link-lg nav-link-user">
                                            <div className="avatar mr-1">
                                                <img src={avatar} alt={"avatar"}/>
                                            </div>
                                            <div className="d-none d-md-block d-lg-inline-block">{this.props.username}</div>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a className="dropdown-item" href="#">
                                                <UserIcon size={20}/> Profile
                                            </a>
                                            <div className="dropdown-divider"/>
                                            <Link to="/logout" className="dropdown-item">
                                                <LogoutIcon size={20}/> Logout
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>

                        <div className="main-content container-fluid">
                            <div className="page-title">
                                <h3>Dashboard</h3>
                                <p className="text-subtitle text-muted">A good dashboard to display your statistics</p>
                            </div>
                            <section className="section">

                                <div className="row mb-4">
                                    <div className="col-md-8">


                                    </div>

                                </div>
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
        username : state.LoginSection.username,
    }
};

export default connect(mapStateToProps,null)(App);
