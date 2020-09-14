import React ,{Component} from 'react';
import logo from '../../../../public/assets/images/logo.jpeg'
const DashboardIcon = require('react-feather/dist/icons/home').default;
import { Link } from "react-router-dom";

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
                            <Link to='/'>
                                <img src={logo} alt={"logo"}/>
                            </Link>
                        </div>
                        <div className="sidebar-menu">
                            <ul className="menu">

                                <li className="sidebar-item active ">
                                    <Link to="/dashboard" className='sidebar-link'>
                                        <DashboardIcon/>
                                        <span>Dashboard</span>
                                    </Link>
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
