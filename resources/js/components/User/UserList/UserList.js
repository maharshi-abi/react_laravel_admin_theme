import React ,{Component} from 'react';
import {Link} from "react-router-dom";
const UserEditIcon = require('react-feather/dist/icons/edit').default;
const UserRemoveIcon = require('react-feather/dist/icons/delete').default;

class UserList extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

        render(){
            return (
                <tr>
                    <td>
                        <div className="avatar avatar-lg mr-3">
                            <img src={this.props.avatar} alt="{this.props.name}" />
                        </div>
                        </td>
                    <td className="font-weight-normal">{this.props.name}</td>
                    <td className="font-weight-normal">{this.props.email}</td>
                    <td>
                        <Link to={`/user/update/${this.props.id}`}>
                            <UserEditIcon className={'mr-2'}/>
                        </Link>
                        <a className={'link pointer'} onClick={() => this.props.removeUserData(this.props.id)}>
                            <UserRemoveIcon/>
                        </a>
                    </td>
                </tr>
        );
    }
}

export default UserList;
