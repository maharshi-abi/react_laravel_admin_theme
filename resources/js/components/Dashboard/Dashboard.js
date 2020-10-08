import React ,{Component} from 'react';
import SideMenu from "../Layout/SideMenu";
import Navigation from "../Layout/TopNav";
import {Helmet} from "react-helmet";

class Dashboard extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>ABI || Admin Panel</title>
                </Helmet>
                <div id="app">
                    <SideMenu/>
                    <div id="main">
                        <Navigation/>
                        <div className="main-content container-fluid">
                            <div className="page-title">
                                <h3>Dashboard</h3>
                                <p className="text-subtitle text-muted">A good dashboard to display your statistics</p>
                            </div>
                            <section className="section">

                                <div className="row mb-4">
                                    <div className="col-md-8">


                                    </div>

                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


export default Dashboard;
