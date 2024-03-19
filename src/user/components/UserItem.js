import React from 'react'
import {Link} from 'react-router-dom'
import Avatar from '../../shared/components/UIElements/Avatar/Avatar';
import Card from '../../shared/components/UIElements/Card/Card';
import './UserItem.css'

const UserItem = ({userData}) => {
    console.log(userData.image);
  return (
    <li className='user-item'>
        <Card className="user-item__content">
            <Link to={`/user/${userData.id}/places`}>
                <div className="user-item__image">
                    <Avatar image={userData.image} alt={userData.name}></Avatar>
                </div>
                <div className="user-item__info">
                    <h2>{userData.name}</h2>
                    <h3>{userData.places} {userData.places === 1 ? 'Place' : 'Places'}</h3>
                </div>
            </Link>
        </Card>
    </li>
  )
}

export default UserItem