import React, { useState, useContext } from 'react'

import Card from '../../shared/components/UIElements/Card/Card';
import Button from '../../shared/components/FormElements/Button/Button';
import Modal from '../../shared/components/UIElements/Modal/Modal';
import Maps from '../../shared/components/UIElements/Maps/Maps';
import './PlaceItem.css';
import { AuthContext } from '../../shared/context/auth-context';

const PlaceItem = ({props}) => {
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

    const hideConfirmModalHander = () => {
        setShowConfirmModal(false)
    }

    const deletePlaceHandler = () => {
        console.log('Deleting Place');
        setShowConfirmModal(false)
    }
    const cancelDeletePlaceHandler = () => {
        setShowConfirmModal(false)
    }

    return <>
    <Modal 
        show={showMap} 
        onCancel={hideMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="footer-item__modal-actions"
        footer={<Button onClick={hideMapHandler}>CLOSE</Button>}
    >
        <div className="map-container">
            <Maps center={props}></Maps>
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
            <div className="place-item__image">
                <img src={props.imageUrl} alt={props.title} />
            </div>
            <div className="place-item__info">
                <h2>{props.title}</h2>
                <h3>{props.address}</h3>
                <p>{props.description}</p>
            </div>
            <div className="place-item__actions">
                <Button inverse onClick={openMapHandler}>View On Map</Button>
                {auth.isLogin && <Button to={`/places/${props.id}`}>EDIT</Button>}
                {auth.isLogin && <Button danger onClick={showConfirmModalHandler}>DELETE</Button>}
            </div>
        </Card> 
    </li>
    </> 
}

export default PlaceItem