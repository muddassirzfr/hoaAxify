import React from 'react'
import profilepicture from '../assets/profile.png'

import { Link } from 'react-router-dom'
const UserListItem = props => {
    let imageSource = profilepicture;
    if (props.user.image) {
        imageSource = `/image/profile/${props.user.image}`;
    }
    return (
        <Link
            to={`/${props.user.username}`}
            className="list-group-item list-group-item-action">
            <img
                className="rounded-circle"
                alt="profile"
                height="32" width="32"
                src={imageSource}
            />
            <span className="pl-2">
                {`${props.user.displayName}@${props.user.username}`}
            </span>
        </Link>
    );
}

export default UserListItem;