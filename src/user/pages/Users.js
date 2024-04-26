import React, { useState, useEffect } from 'react'
import UsersList from '../components/UsersList';
import LoadingSpinner from '../../shared/components/UIElements/Loading/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/Modal/ErrorModal';
import { useHttpRequest } from '../../shared/hooks/http-hook';
const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();

  const {isLoading, error, sendRequest, clearError} = useHttpRequest()
  useEffect(() => {
    const sendUserRequest = async () => {
      try 
      {
        const data = await sendRequest('http://localhost:4000/api/users');
        console.log(data.users);
        setLoadedUsers(data.users);
      }
      catch (err) 
      {
        console.log(err);
      }
    };
    sendUserRequest();

    return () => {
      
    }
  }, [sendRequest]);

  return (
    <>
    { error && <ErrorModal error={error} onClear={clearError}></ErrorModal>}
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