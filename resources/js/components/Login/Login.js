import React ,{Component} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import '../../../../public/assets/css/bootstrap.css';
import '../../../../public/assets/css/app.css';
import '../../../../public/assets/js/feather-icons/feather.min.js';
import '../../../../public/assets/js/app.js';
import * as LoginAction from './Container/LoginController';

const UserIcon = require('react-feather/dist/icons/user').default;
const LockIcon = require('react-feather/dist/icons/lock').default;
const NotificationIcon = require('react-feather/dist/icons/alert-triangle').default;

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};

class Login extends Component{
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: '',
            password: '',
            errors: {
                email: '',
                password: '',
            }
        };
    }

    onChange(event){
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Please enter valid Email!';
                break;
            case 'password':
                errors.password =
                    value.length < 6
                        ? 'Password must be at least 6 characters long!'
                        : '';
                break;
            default:
                break;
        }
        this.setState({errors, [name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        };

        if(validateForm(this.state.errors) && this.state.email !== '' && this.state.password !== '') {
            this.props.SubmitLoginDetail(data);
        }else{
            console.error('Invalid Form');
        }
    }

    componentWillUnmount(){
        let AuthToken = localStorage.getItem('token');
        this.props.checkAuthentication(AuthToken);
        return true;
    }

    render() {
        if(this.props.isLogin) {
           return <Redirect to={'/dashboard'}/>
        }

        let errorMessage = '';
        const {errors} = this.state;
        if(this.props.message){
            errorMessage = this.props.message;
        }
        if(errors.email.length > 0){
           errorMessage = errors.email;
        }
        if(errors.password.length > 0){
           errorMessage = errors.password;
        }

        return (
            <div className="Login">
                <div id="auth">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-sm-12 mx-auto">
                                <div className="card pt-4">
                                    <div className="card-body">

                                        {errorMessage.length > 0 &&
                                        <div className={this.props.errorStatus}>
                                            <NotificationIcon size={15}/>  {errorMessage}.
                                            <button type="button" className="close" data-dismiss="alert"
                                                    aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        }

                                        <div className="text-center mb-5">
                                            <h2>Admin Panel</h2>
                                            <p>Please sign in to continue to ABI</p>
                                        </div>
                                        <form onSubmit={this.handleSubmit} noValidate>
                                            <div className="form-group position-relative has-icon-left">
                                                <label htmlFor="username">Email</label>
                                                <div className="position-relative">
                                                    <input type="text" name={'email'} className="form-control" id="email"
                                                           placeholder="Enter Your Email" onChange={this.onChange} autoComplete={'off'}/>
                                                    <div className="form-control-icon">
                                                        <UserIcon/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group position-relative has-icon-left">
                                                <label htmlFor="password">Password</label>
                                                <div className="position-relative">
                                                    <input type="password" name={'password'} className="form-control" id="password"
                                                           placeholder="Enter Your Password" onChange={this.onChange} autoComplete={'off'}/>
                                                    <div className="form-control-icon">
                                                        <LockIcon/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="clearfix">
                                                <button className="btn btn-primary rounded float-right">
                                                    <i className="fa fa-sign-in" aria-hidden="true"/> Sign in
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLogin : state.LoginSection.isLogin,
        errorStatus : state.LoginSection.status,
        message: state.LoginSection.message,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        SubmitLoginDetail: (data) => dispatch(LoginAction.submitData(data)),
        checkAuthentication: (data) => dispatch(LoginAction.checkAuthentication(data))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Login);
