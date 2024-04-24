import React, { useState, useEffect } from 'react'
import UsersList from '../components/UsersList';
import LoadingSpinner from '../../shared/components/UIElements/Loading/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/Modal/ErrorModal';
const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState()
  useEffect(() => {
    const sendUserRequest = async () => {
      setIsLoading(true);
      let data;
      try 
      {
        data = await fetch('http://localhost:4000/api/users');
      }
      catch (err) 
      {
        setError(err.message || 'Something went wrong. Please try again.');
      }
      if(!data.ok) {
        throw new Error(data.message);
      }
      console.log(data);
      const userData = await data.json();
      console.log(userData);
      setLoadedUsers(userData.users);
      setIsLoading(false)
    };
    sendUserRequest()
  }, []);

  const errorHandler = () => {
    setError();
  }

  return (
    <>
    { error && <ErrorModal error={error} onCancel={errorHandler}></ErrorModal>}
    {isLoading && (
      <div className='center'>
        <LoadingSpinner asOverlay></LoadingSpinner>
      </div>
    )}

    { !isLoading && loadedUsers && <UsersList items={loadedUsers}></UsersList>}
    </>
  )
}

export default Users;