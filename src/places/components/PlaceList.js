import React from 'react'

import Card from '../../shared/components/UIElements/Card/Card';
import PlaceItem from './PlaceItem';
import Button from '../../shared/components/FormElements/Button/Button';
import './PlaceList.css';

const PlaceList = (props) => {
    console.log(props);
    if(props.items.length === 0)
    return (
        <div className='place-list center'>
            <Card>
                <h2>No Place found. May Be create one?</h2>
                <Button>Share Places</Button>
            </Card>
        </div>
    )
    return <ul className="place-list">
        {
            props.items.map(place => (
                <PlaceItem key={place.id} place={place} onDelete={props.onDeletePlace}></PlaceItem>
            ))
        }
    </ul>
}

export default PlaceList