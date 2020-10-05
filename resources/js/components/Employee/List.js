import React from 'react';
import {Link} from "react-router-dom";
const UserEditIcon = require('react-feather/dist/icons/edit').default;

export default function List(props) {
    return (
        <tr>
            <td>
                <div className="avatar avatar-lg mr-3">
                    <img src={props.avatar} alt={props.name} />
                </div>
            </td>
            <td className="font-weight-normal">{props.name}</td>
            <td className="font-weight-normal">{props.email}</td>
            <td>
                <Link to={`/user/update/${props.id}`}>
                    <UserEditIcon className={'mr-2'}/>
                </Link>
            </td>
        </tr>
    );
}
