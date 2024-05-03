import React from 'react'
import {Link} from 'react-router-dom'
import Avatar from '../../shared/components/UIElements/Avatar/Avatar';
import Card from '../../shared/components/UIElements/Card/Card';
import './UserItem.css'

const UserItem = ({userData}) => {
  return (
    <li className='user-item'>
        <Card className="user-item__content">
            <Link to={`/${userData._id}/places`}>
                <div className="user-item__image">
                    <Avatar image={`${userData.image.location}`} alt={userData.name}></Avatar>
                </div>
                <div className="user-item__info">
                    <h2>{userData.name}</h2>
                    <h3>{userData.places.length} {userData.places.length === 1 ? 'Place' : 'Places'}</h3>
                </div>
            </Link>
        </Card>
    </li>
  )
}

export default UserItem