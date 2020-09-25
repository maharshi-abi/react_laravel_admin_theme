import React ,{Component} from 'react';
import SideMenu from "../../Layout/SideMenu";
import Navigation from "../../Layout/TopNav";
import {connect} from "react-redux";
import * as UserAction from "../UserList/Container/UserController";
import {Link} from "react-router-dom";

const NotificationIcon = require('react-feather/dist/icons/alert-triangle').default;
const UserIcon = require('react-feather/dist/icons/user').default;

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};

class Index extends Component{
    constructor(props) {
        super(props);
        let userID = '';
        if(props.match.params.id){
            userID = props.match.params.id;
        }
        this.onFileChange = this.onFileChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            userID : userID,
            username: '',
            email: '',
            avatar: '',
            profile: [],
            errors: {
                username: '',
                email: '',
            }
        };
    }
    componentDidMount() {
        if(this.state.userID){
            this.props.getUserData(this.state.userID);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            userID : nextProps.userID,
            username: nextProps.user_name,
            email: nextProps.user_email,
            avatar: nextProps.user_avatar,
        });
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
            update_user: this.state.userID,
        };

        if(validateForm(this.state.errors) && this.state.username !== '' && this.state.email !== '') {
            this.props.createUserData(data);
        }else{
            console.error('Invalid Form');
        }
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
        return (
            <div className="UserSaveLayout" >
                <div id="app">
                    <SideMenu/>
                    <div id="main">
                        <Navigation/>
                        <div className="main-content container-fluid">
                            <div className="page-title">
                                <h4><UserIcon/> {this.state.userID ? 'Update Profile' : 'Create User'}</h4>
                                <hr/>
                            </div>
                            <section id="basic-horizontal-layouts">
                                <div className="row match-height">
                                    <div className="col-md-8 col-12">
                                        <div className="card">
                                            {this.state.avatar ?
                                            <div className="card-header bg-primary">
                                                <h4 className="card-title text-white">
                                                    <div className="avatar avatar-xl mr-3">
                                                        <img src={this.state.avatar} alt={this.state.username}/>
                                                    </div>{this.state.username}
                                                </h4>
                                            </div>
                                                : ''}
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
                                                                    <input type="file" onChange={this.onFileChange} className="form-control" name="profile" id={'profile'}/>
                                                                </div>

                                                                <div className="col-md-4">
                                                                    <label>Name</label>
                                                                </div>
                                                                <div className="col-md-8 form-group">
                                                                    <input type="text"
                                                                           className="form-control" name="username"
                                                                           placeholder="User Name" onChange={this.onChange} autoComplete={'off'} value={this.state.username }/>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label>Email</label>
                                                                </div>
                                                                <div className="col-md-8 form-group">
                                                                    <input type="email"
                                                                           className="form-control" name="email"
                                                                           placeholder="User Email" onChange={this.onChange} autoComplete={'off'} value={this.state.email }/>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <hr/>
                                                                </div>

                                                                <div className="col-sm-12 d-flex justify-content-end">
                                                                    <button type="submit" className="btn btn-primary mr-1 mb-1">
                                                                        {this.state.userID ? 'Update User' : 'Save User'}
                                                                    </button>
                                                                    <Link to='/users' className={'float-right btn btn-danger mr-1 mb-1'} >Back</Link>
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
        userID : state.UserSection.user_Id,
        user_name : state.UserSection.user_name,
        user_email : state.UserSection.user_email,
        user_avatar : state.UserSection.user_avatar,
        errorStatus : state.UserSection.status,
        message: state.UserSection.message,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getUserData: (data) => dispatch(UserAction.getUserData(data)),
        createUserData: (data) => dispatch(UserAction.createUser(data)),
        resetStateValue: () => dispatch(UserAction.resetStateValue())
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Index);
