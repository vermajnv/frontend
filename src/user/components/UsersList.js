import React from 'react'
import UserItem from './UserItem'
import Card from '../../shared/components/UIElements/Card/Card'
import './UsersList.css'

const UsersList = (props) => {
    if(props.items.length === 0){
        return (
            <div className='center'>
                <Card>
                    <h2>No user found</h2>
                </Card>
            </div>
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