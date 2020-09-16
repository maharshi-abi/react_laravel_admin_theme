import React ,{Component} from 'react';
import logo from '../../../../public/assets/images/favicon.svg'
const DashboardIcon = require('react-feather/dist/icons/home').default;
const UsersIcon = require('react-feather/dist/icons/users').default;
import { NavLink } from "react-router-dom";

class SideMenu extends Component{
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="SideMenuSection">
                <div id="sidebar" className='active'>
                    <div className="sidebar-wrapper active">
                        <div className="sidebar-header">
                            <NavLink to='/'>
                                <img src={logo} alt={"logo"}/>
                            </NavLink>
                        </div>
                        <div className="sidebar-menu">
                            <ul className="menu">

                                <li className="sidebar-item">
                                    <NavLink to="/dashboard" className='sidebar-link' activeClassName="active">
                                        <DashboardIcon/>
                                        <span>Dashboard</span>
                                    </NavLink>
                                </li>

                                <li className="sidebar-item">
                                    <NavLink to="/users" className='sidebar-link' activeClassName="active">
                                        <UsersIcon/>
                                        <span>User</span>
                                    </NavLink>
                                </li>

                            </ul>
                        </div>
                        <button className="sidebar-toggler btn x"><i data-feather="x"/></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SideMenu;
