import React ,{Component} from 'react';
import SideMenu from "../Layout/SideMenu";
import Navigation from "../Layout/TopNav";
import {connect} from "react-redux";
import * as LoginAction from '../Login/Container/LoginController';

const UserIcon = require('react-feather/dist/icons/user').default;
const NotificationIcon = require('react-feather/dist/icons/alert-triangle').default;

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};

class Profile extends Component{
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            username: props.username,
            email: props.email,
            avatar: props.avatar,
            profile: [],
            password: '',
            password_confirmation: '',
            errors: {
                username: '',
                email: '',
                password: '',
            }
        };
    }

    onFileChange(event) {
        this.createImage(event.target.files[0]);
    };

    createImage(file){
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({
                profile: e.target.result,
            })
        }
        reader.readAsDataURL(file);
    }

    onChange(event){
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'username':
                errors.username =
                    value.length < 4
                        ? 'Name must be at least 4 characters long!'
                        : '';
                break;
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
            case 'password_confirmation':
                errors.password_confirmation =
                    value.length < 6
                        ? 'New Password must be at least 6 characters long!'
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
            avatar: this.state.profile,
            name: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
        };

        if(validateForm(this.state.errors) && this.state.username !== '' && this.state.email !== '') {
            this.props.updateAdminProfileData(data);
        }else{
            console.error('Invalid Form');
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            username: nextProps.username,
            email: nextProps.email,
            avatar: nextProps.avatar,
        });
    }

    componentWillUnmount(){
        this.props.resetStateValue();
        return true;
    }

    render() {
        let errorMessage =  '';
        let defaultErrorStatus = '';
        const {errors} = this.state;
        if(this.props.message){
            errorMessage = this.props.message;
            defaultErrorStatus = this.props.errorStatus;
        }
        if(errors.email.length > 0){
            errorMessage = errors.email;
            defaultErrorStatus = 'alert alert-danger alert-dismissible show fade';
        }
        if(errors.username.length > 0){
            errorMessage = errors.username;
            defaultErrorStatus = 'alert alert-danger alert-dismissible show fade';
        }
        if(errors.password.length > 0){
            errorMessage = errors.password;
            defaultErrorStatus = 'alert alert-danger alert-dismissible show fade';
        }
        return (
            <div className="DashboardLayout" >
                <div id="app">
                    <SideMenu/>
                    <div id="main">
                        <Navigation/>
                        <div className="main-content container-fluid">
                            <section id="basic-horizontal-layouts">
                                <div className="row match-height">
                                    <div className="col-md-3 col-12">
                                        <div className="card">
                                            <div className="card-header bg-primary">
                                                <h4 className="card-title text-white">Image</h4>
                                            </div>
                                            <div className="card-content">
                                                <div className="card-body">
                                                    <form className="form form-horizontal">
                                                        <div className="form-body">
                                                            <div className="row">
                                                                <div className="avatar avatar-xl mr-3 col-md-12">
                                                                    <img src={this.state.avatar} alt={'Admin'}/>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 col-12">
                                        <div className="card">
                                            <div className="card-header bg-primary">
                                                <h4 className="card-title text-white"><UserIcon/> User Profile</h4>
                                            </div>
                                            <div className="card-content">
                                                <div className="card-body">

                                                    {errorMessage.length > 0 &&
                                                    <div className={defaultErrorStatus}>
                                                        <NotificationIcon size={15}/>  {errorMessage}.
                                                        <button type="button" className="close" data-dismiss="alert"
                                                                aria-label="Close">
                                                            <span aria-hidden="true">×</span>
                                                        </button>
                                                    </div>
                                                    }

                                                    <form className="form form-horizontal" onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate>
                                                        <div className="form-body">
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <label>Avatar</label>
                                                                </div>
                                                                <div className="col-md-8 form-group">
                                                                    <input type="file"
                                                                           className="form-control" name="profile" id={'profile'}
                                                                           onChange={this.onFileChange}/>
                                                                </div>

                                                                <div className="col-md-4">
                                                                    <label>Name</label>
                                                                </div>
                                                                <div className="col-md-8 form-group">
                                                                    <input type="text"
                                                                           className="form-control" name="username"
                                                                           placeholder="User Name" onChange={this.onChange} value={this.state.username}/>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label>Email</label>
                                                                </div>
                                                                <div className="col-md-8 form-group">
                                                                    <input type="email"
                                                                           className="form-control" name="email"
                                                                           placeholder="User Email" value={this.state.email} onChange={this.onChange} autoComplete={'off'}/>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label>Old Password</label>
                                                                </div>
                                                                <div className="col-md-8 form-group">
                                                                    <input type="password" id="password"
                                                                           className="form-control" name="password"
                                                                           placeholder="Enter previous password" onChange={this.onChange} autoComplete={'off'}/>
                                                                </div>

                                                                <div className="col-md-4">
                                                                    <label>New Password</label>
                                                                </div>
                                                                <div className="col-md-8 form-group">
                                                                    <input type="password" id="password_confirmation"
                                                                           className="form-control" name="password_confirmation"
                                                                           placeholder="Enter new password" onChange={this.onChange} autoComplete={'off'}/>
                                                                </div>

                                                                <div className="col-sm-12 d-flex justify-content-end">
                                                                    <button type="submit"
                                                                            className="btn btn-success mr-1 mb-1">Update Profile
                                                                    </button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
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
        email : state.LoginSection.email,
        avatar : state.LoginSection.avatar,
        errorStatus : state.LoginSection.status,
        message: state.LoginSection.message,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateAdminProfileData: (data) => dispatch(LoginAction.updateAdminProfile(data)),
        resetStateValue: () => dispatch(LoginAction.resetStateValue())
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Profile);

