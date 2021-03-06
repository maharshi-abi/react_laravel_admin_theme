import React ,{Component} from 'react';
import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import LoginModule from '../Login/Login';
import AdminModule from '../Dashboard/Dashboard';
import UserProfile from '../User/Profile';
import Users from '../User/UserList/Index';
import UserForm from '../User/Form/Index';
import AdminUser from '../Admin/Admin';
import PrivateRoute from '../RouteConfig/PrivateRoute';
import PublicRoute from '../RouteConfig/PublicRoute';
import LogoutModule from '../Layout/Logout/Index';
import ErrorPage from './ErrorPage';

class Menu extends Component{
    render() {
        return (
            <React.Fragment>
                <Router>
                        <Switch>
                            <PublicRoute restricted={true} path="/" component={LoginModule} exact />
                            <PrivateRoute path="/dashboard" component={AdminModule} exact />
                            <PrivateRoute path="/profile" component={UserProfile} exact />
                            <PrivateRoute path="/users" component={Users} exact />
                            <PrivateRoute path="/user/create" component={UserForm} exact />
                            <PrivateRoute path="/user/update/:id" component={props => <UserForm userID=":id" {...props} />} />
                            <PrivateRoute path="/logout" component={LogoutModule} exact />
                            <PrivateRoute path="/admin" component={AdminUser} exact />
                            <Route path="*" component={ErrorPage} />
                            <Route path="" component={ErrorPage} />
                            <Route path="*" component={ErrorPage} />
                            <Route component={ErrorPage} />
                        </Switch>
                </Router>
            </React.Fragment>
        );
    }
};

export default Menu;
