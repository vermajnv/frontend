import React from 'react'
import { useParams } from 'react-router-dom'

import PlaceList from '../components/PlaceList'
import './UserPlaces.css'

const DUMMY_PLACES = [
    {
        id : 'p1',
        title : 'Empire Estate Building',
        description : 'One of the most famous sky scraper in the world',
        imageUrl : 'https://placehold.co/600x400',
        address : '20 W 34th St., New York, NY 10001, United States',
        coordinate : {
            lat : 40.7484405,
            long : -73.9856644
        },
        creator : 'u1'  
    },
    {
        id : 'p2',
        title : 'Empire Estate Building',
        description : 'One of the most famous sky scraper in the world',
        imageUrl : 'https://placehold.co/600x400',
        address : '20 W 34th St., New York, NY 10001, United States',
        coordinate : {
            lat : 40.7484405,
            long : -73.9856644
        },
        creator : 'u2'
    },
    {
        id : 'p3',
        title : 'Empire Estate Building',
        description : 'One of the most famous sky scraper in the world',
        imageUrl : 'https://placehold.co/600x400',
        address : '20 W 34th St., New York, NY 10001, United States',
        coordinate : {
            lat : 40.7484405,
            long : -73.9856644
        },
        creator : 'u3'  
    },
    {
        id : 'p4',
        title : 'Empire Estate Building',
        description : 'One of the most famous sky scraper in the world',
        imageUrl : 'https://placehold.co/600x400',
        address : '20 W 34th St., New York, NY 10001, United States',
        coordinate : {
            lat : 40.7484405,
            long : -73.9856644
        },
        creator : 'u4'  
    }
]

const UserPlaces = () => {
    const userId = useParams().userId;
    const filteredPlaces = DUMMY_PLACES.filter((place) => place.creator === userId)
  return (
      <PlaceList items={filteredPlaces}></PlaceList>
  )
}

export default UserPlaces