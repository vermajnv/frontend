import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import PlaceList from '../components/PlaceList'
import './UserPlaces.css'
import { useHttpRequest } from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/components/UIElements/Modal/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/Loading/LoadingSpinner'

const UserPlaces = () => {
    const [filteredPlaces, setFilteredPlaces] = useState();
    const { isLoading, error, sendRequest, clearError} = useHttpRequest();
    const userId = useParams().userId;
    useEffect(() => {
        console.log(process.env);
        (async () => {
            try {
                const userPlaces = await sendRequest(`${process.env.REACT_APP_API_URL}/places/user/${userId}`);
                setFilteredPlaces(userPlaces.userPlaces);
            }
            catch (err)
            {
                
            }
        })();
    }, [sendRequest, userId]);

    const onDeleteHandler = (deletedplaceId) => {
        setFilteredPlaces(prePlaces => prePlaces.filter(place => place.id !== deletedplaceId))
    }
    return (
        <>
            { error && <ErrorModal error={error} onClear={clearError} ></ErrorModal>}
            { isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
            { !isLoading && filteredPlaces && (<PlaceList items={filteredPlaces} onDeletePlace={onDeleteHandler}></PlaceList>)}
        </>
    )
}

export default UserPlaces