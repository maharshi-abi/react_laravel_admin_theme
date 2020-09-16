import React ,{Component} from 'react';
import SideMenu from "../../Layout/SideMenu";
import Navigation from "../../Layout/TopNav";
const UserIcon = require('react-feather/dist/icons/users').default;

class Index extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    render() {
        return (
            <div className="UserIndexLayout" >
                <div id="app">
                    <SideMenu/>
                    <div id="main">
                        <Navigation/>
                        <div className="main-content container-fluid">
                            <div className="page-title">
                                <h4><UserIcon/> User List</h4>
                                <hr/>
                            </div>
                            <section id="basic-horizontal-layouts">

                            </section>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Index;

