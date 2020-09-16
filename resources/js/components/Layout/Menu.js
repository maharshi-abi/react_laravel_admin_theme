import React ,{Component} from 'react';
import { Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import LoginModule from '../Login/Login';
import AdminModule from '../Dashboard/Dashboard';
import UserProfile from '../User/Profile';
import Users from '../User/UserList/Index';
import PrivateRoute from '../RouteConfig/PrivateRoute';
import PublicRoute from '../RouteConfig/PublicRoute';
import LogoutModule from '../Layout/Logout/Index';

class Menu extends Component{
    render() {
        return (
            <div className="route_section">
                <Router>
                        <Switch>
                            <PublicRoute restricted={true} path="/" component={LoginModule} exact />
                            <PrivateRoute path="/dashboard" component={AdminModule} exact />
                            <PrivateRoute path="/profile" component={UserProfile} exact />
                            <PrivateRoute path="/users" component={Users} exact />
                            <PrivateRoute path="/logout" component={LogoutModule} exact />
                        </Switch>
                </Router>
            </div>
        );
    }
};

export default Menu;
