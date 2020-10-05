import React ,{Component} from 'react';
import { Link } from "react-router-dom";
import * as LoginAction from "../Login/Container/LoginController";
import {connect} from "react-redux";
import '../../../../public/assets/css/bootstrap.css';
import '../../../../public/assets/vendors/perfect-scrollbar/perfect-scrollbar.css';
import '../../../../public/assets/css/app.css';
import '../../../../public/assets/vendors/perfect-scrollbar/perfect-scrollbar.min.js';
import '../../../../public/assets/js/app.js';

const UserIcon = require('react-feather/dist/icons/user').default;
const LogoutIcon = require('react-feather/dist/icons/log-out').default;

class TopNav extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        let AuthToken = localStorage.getItem('token');
        this.props.checkAuthentication(AuthToken);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.loginUsername !== undefined;
    }

    componentWillUnmount(){
        this.props.resetStateValue();
        return true;
    }

    render() {
        return (
            <React.Fragment>
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
                                        <img src={this.props.loginAvatar} alt={'Admin'}/>
                                    </div>
                                    <div className="d-none d-md-block d-lg-inline-block">{this.props.loginUsername}</div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <Link to="/profile" className="dropdown-item">
                                        <UserIcon size={20}/> Profile
                                    </Link>
                                    <div className="dropdown-divider"/>
                                    <Link to="/logout" className="dropdown-item">
                                        <LogoutIcon size={20}/> Logout
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        loginUsername : state.LoginSection.username,
        loginAvatar : state.LoginSection.avatar,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        checkAuthentication: (data) => dispatch(LoginAction.checkAuthentication(data)),
        resetStateValue: () => dispatch(LoginAction.resetStateValue())
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(TopNav);
