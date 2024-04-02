import React from 'react'

import Card from '../../shared/components/UIElements/Card/Card';
import PlaceItem from './PlaceItem';
import './PlaceList.css';

const PlaceList = (props) => {
    if(props.items.length === 0)
    return (
        <div className='place-list center'>
            <Card>
                <h2>No Place found. May Be create one?</h2>
                <button>Share Places</button>
            </Card>
        </div>
    )
    return <ul className="place-list">
        {
            props.items.map(place => (
                <PlaceItem key={place.id} props={place}></PlaceItem>
            ))
        }
    </ul>
}

export default PlaceList