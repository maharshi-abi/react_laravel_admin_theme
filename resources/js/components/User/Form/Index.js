import React ,{Component} from 'react';
import SideMenu from "../../Layout/SideMenu";
import Navigation from "../../Layout/TopNav";
import {connect} from "react-redux";

const UserIcon = require('react-feather/dist/icons/user').default;

class Index extends Component{
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div className="UserSaveLayout" >
                <div id="app">
                    <SideMenu/>
                    <div id="main">
                        <Navigation/>
                        <div className="main-content container-fluid">
                            <div className="page-title">
                                <h4><UserIcon/> Create User</h4>
                                <hr/>
                            </div>
                            <section id="basic-horizontal-layouts">
                                <div className="row match-height">
                                    <div className="col-md-8 col-12">
                                        <div className="card">
                                            <div className="card-content">
                                                <div className="card-body">
                                                    <form className="form form-horizontal" >
                                                        <div className="form-body">
                                                            <div className="row">

                                                                <div className="col-md-4">
                                                                    <label>Avatar</label>
                                                                </div>
                                                                <div className="col-md-8 form-group">
                                                                    <input type="file" className="form-control" name="profile" id={'profile'}/>
                                                                </div>

                                                                <div className="col-md-4">
                                                                    <label>Name</label>
                                                                </div>
                                                                <div className="col-md-8 form-group">
                                                                    <input type="text"
                                                                           className="form-control" name="username"
                                                                           placeholder="User Name" />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label>Email</label>
                                                                </div>
                                                                <div className="col-md-8 form-group">
                                                                    <input type="email"
                                                                           className="form-control" name="email"
                                                                           placeholder="User Email" autoComplete={'off'}/>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <hr/>
                                                                </div>

                                                                <div className="col-md-4">
                                                                    <label>New Password</label>
                                                                </div>
                                                                <div className="col-md-8 form-group">
                                                                    <input type="password" id="password_confirmation"
                                                                           className="form-control" name="password_confirmation"
                                                                           placeholder="Enter new password" onChange={this.onChange} autoComplete={'off'}/>
                                                                </div>

                                                                <div className="col-md-12">
                                                                    <hr/>
                                                                </div>

                                                                <div className="col-sm-12 d-flex justify-content-end">
                                                                    <button type="submit"
                                                                            className="btn btn-primary mr-1 mb-1">Create User
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

export default Index;

