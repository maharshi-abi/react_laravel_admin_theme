import React from 'react';

const UserList = (props) => {
    return (
            <tr>
                <td>
                    <div className="avatar avatar-lg mr-3">
                        <img src={props.avatar} alt="{props.name}" />
                    </div>
                    </td>
                <td className="text-bold-500">{props.name}</td>
                <td className="text-bold-500">{props.email}</td>
                <td>
                    <a href="#">
                    {props.id}
                    </a>
                </td>
            </tr>
    );
};

export default UserList;
