import React from 'react'
import { useParams } from 'react-router-dom'

import Button from '../../shared/components/FormElements/Button/Button';
import Input from '../../shared/components/FormElements/Input/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css'

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
];

const UpdatePlace = () => {
    const placeId = useParams().placeId;
    const [myPlace] = DUMMY_PLACES.filter((place) => {
        return place.id === placeId;
    });

    const [formState, inputHandler] = useForm({
        title : {
            value : myPlace.title,
            isValid : true
        },
        description : {
            value : myPlace.description,
            isValid : true
        },
        address : {
            value : myPlace.address,
            isValid : true
        }
    }, true);

    if(!myPlace)
    {
        return (
            <div>No place found</div>
        )
    }

    const updateSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
    }
  return (
    <form className='place-form' onSubmit={updateSubmitHandler}>
        <Input
            id='title'
            label='Title'
            element='input'
            placeholder='Title'
            initialValue={formState.inputs.title.value}
            initialIsValid={formState.inputs.title.isValid}
            validators={[VALIDATOR_REQUIRE()]} 
            errorText="Please enter a valid title" 
            onInput={inputHandler}
        ></Input>
        <Input
            id='description'
            label='Description'
            initialValue={formState.inputs.description.value}
            initialIsValid={formState.inputs.description.isValid} 
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid descption. (At least 5 char)'
            onInput={inputHandler}
        ></Input>
        <Input
            id='address' 
            label='Address'
            element='input'
            initialValue={formState.inputs.address.value}
            initialIsValid={formState.inputs.address.isValue}
            validators={[VALIDATOR_MINLENGTH(1)]}
            errorText='Please enter a valid address'
            onInput={inputHandler}
        ></Input>
        <Button type='submit' disabled={!formState.isValid}>Update</Button>
    </form>
  )
}

export default UpdatePlace