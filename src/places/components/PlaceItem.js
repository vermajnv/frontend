import React, { useState } from 'react'

import Card from '../../shared/components/UIElements/Card/Card';
import Button from '../../shared/components/FormElements/Button/Button';
import Modal from '../../shared/components/UIElements/Modal/Modal';
import Maps from '../../shared/components/UIElements/Maps/Maps';
import './PlaceItem.css';

const PlaceItem = ({props}) => {
    const [showMap, setShowMap] = useState(false);
    const openMapHandler = () => {
        setShowMap(true)
    }

    const hideMapHandler = () => {
        setShowMap(false)
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
                <Button to={`/places/${props.id}`}>EDIT</Button>
                <Button danger>DELETE</Button>
            </div>
        </Card> 
    </li>
    </> 
}

export default PlaceItem