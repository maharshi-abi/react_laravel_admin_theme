import React,{Component} from 'react';
import { Redirect } from 'react-router';
import {connect} from 'react-redux';
import * as LoginAction from '../../Login/Container/LoginController';

class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirect : true,
        };
    }

    componentDidMount() {
        let AuthToken = localStorage.getItem('token');
        if(AuthToken){
            this.props.SubmitLogout();
        }
    };

    render() {
        if(this.state.redirect) {
            return <Redirect to={'/'}/>
        }
        return (
            <React.Fragment>
            </React.Fragment>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        SubmitLogout: () => dispatch(LoginAction.logout()),
    };
};
export default connect(null,mapDispatchToProps)(Index);
