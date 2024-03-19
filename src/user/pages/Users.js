import React from 'react'
import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {id : '001', name : 'Nayan', image : 'https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50', places : 3}
  ]
  return (
    <UsersList items={USERS}></UsersList>
  )
}

export default Users;