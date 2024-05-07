import React, { useState, useContext } from 'react'

import Card from '../../shared/components/UIElements/Card/Card';
import Button from '../../shared/components/FormElements/Button/Button';
import Modal from '../../shared/components/UIElements/Modal/Modal';
import Maps from '../../shared/components/UIElements/Maps/Maps';
import ErrorModal from '../../shared/components/UIElements/Modal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/Loading/LoadingSpinner';
import './PlaceItem.css';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpRequest } from '../../shared/hooks/http-hook';

const PlaceItem = (props) => {
    console.log(props);
    const {isLoading, error, sendRequest, clearError} = useHttpRequest()
    const auth = useContext(AuthContext);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const openMapHandler = () => {
        setShowMap(true)
    }

    const hideMapHandler = () => {
        setShowMap(false)
    }

    const showConfirmModalHandler = () => {
        setShowConfirmModal(true)
    }

    const deletePlaceHandler = async() => {
        setShowConfirmModal(false);
        try {
            await sendRequest(`${process.env.REACT_APP_API_URL}/places/${props.place.id}`, 
                'DELETE',
                null,
                {
                    Authorization : 'Bearer ' + auth.token
                }
            );
            props.onDelete(props.place.id)
        }
        catch(err)
        {

        }
    }
    const cancelDeletePlaceHandler = () => {
        setShowConfirmModal(false)
    }

    return <>
    <ErrorModal error={error} onClear={clearError}></ErrorModal>
    <Modal 
        show={showMap} 
        onCancel={hideMapHandler}
        header={props.place.address}
        contentClass="place-item__modal-content"
        footerClass="footer-item__modal-actions"
        footer={<Button onClick={hideMapHandler}>CLOSE</Button>}
    >
        <div className="map-container">
            <Maps center={props.place}></Maps>
        </div>
    </Modal>
    <Modal
        show={showConfirmModal}
        onCancel={cancelDeletePlaceHandler}
        header="Are you sure"
        footerClass='place-item__modal-actions'
        footer={<>
            <Button inverse onClick={cancelDeletePlaceHandler}>CANCEL</Button>
            <Button danger onClick={deletePlaceHandler}>DELETE</Button>
        </>}
    >

    </Modal>
    <li className='place-item'>
        <Card className='place-item__content'>
        {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
            <div className="place-item__image">
                <img src={`${props.place.image.location}`} alt={props.place.title} />
            </div>
            <div className="place-item__info">
                <h2>{props.place.title}</h2>
                <h3>{props.place.address}</h3>
                <p>{props.place.description}</p>
            </div>
            <div className="place-item__actions">
                <Button inverse onClick={openMapHandler}>View On Map</Button>
                {auth.userId === props.place.creator && <Button to={`/places/${props.place.id}`}>EDIT</Button>}
                {auth.userId === props.place.creator && <Button danger onClick={showConfirmModalHandler}>DELETE</Button>}
            </div>
        </Card> 
    </li>
    </> 
}

export default PlaceItem