import React ,{Component} from 'react';
import SideMenu from "../Layout/SideMenu";
import Navigation from "../Layout/TopNav";
import { Link } from "react-router-dom";

class Profile extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="DashboardLayout" >
                <div id="app">
                    <SideMenu/>
                    <div id="main">
                        <Navigation/>

                        <div className="main-content container-fluid">
                            <div className="page-title">
                                <div className="row">
                                    <div className="col-12 col-md-6 order-md-1 order-last">
                                        <h3>Form Layout</h3>
                                        <p className="text-subtitle text-muted">There's a lot of form layout that you
                                            can use</p>
                                    </div>
                                    <div className="col-12 col-md-6 order-md-2 order-first">
                                        <nav aria-label="breadcrumb" className="breadcrumb-header">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                                                <li className="breadcrumb-item active" aria-current="page">Form Layout
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>

                            </div>

                            <section id="basic-horizontal-layouts">
                                <div className="row match-height">
                                    <div className="col-md-6 col-12">
                                        <div className="card">
                                            <div className="card-header">
                                                <h4 className="card-title">Horizontal Form</h4>
                                            </div>
                                            <div className="card-content">
                                                <div className="card-body">
                                                    <form className="form form-horizontal">
                                                        <div className="form-body">
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <label>First Name</label>
                                                                </div>
                                                                <div className="col-md-8 form-group">
                                                                    <input type="text" id="first-name"
                                                                           className="form-control" name="fname"
                                                                           placeholder="First Name"/>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label>Email</label>
                                                                </div>
                                                                <div className="col-md-8 form-group">
                                                                    <input type="email" id="email-id"
                                                                           className="form-control" name="email-id"
                                                                           placeholder="Email"/>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label>Mobile</label>
                                                                </div>
                                                                <div className="col-md-8 form-group">
                                                                    <input type="number" id="contact-info"
                                                                           className="form-control" name="contact"
                                                                           placeholder="Mobile"/>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label>Password</label>
                                                                </div>
                                                                <div className="col-md-8 form-group">
                                                                    <input type="password" id="password"
                                                                           className="form-control" name="password"
                                                                           placeholder="Password"/>
                                                                </div>

                                                                <div className="col-sm-12 d-flex justify-content-end">
                                                                    <button type="submit"
                                                                            className="btn btn-primary mr-1 mb-1">Submit
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


export default Profile;
