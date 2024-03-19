import React from 'react'
import './UsersList.css'
import UserItem from './UserItem'

const UsersList = (props) => {
    if(props.items.length === 0){
        return (
            <ul className='users-list'>No user found</ul>
        )
    }
    return <ul className='users-list'>
        {
            props.items.map(user => (
                <UserItem userData={user} key={user.id}></UserItem>
            ))
        }
    </ul>
}

export default UsersList