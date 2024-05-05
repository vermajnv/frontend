import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../shared/context/auth-context';

import Button from '../../shared/components/FormElements/Button/Button';
import Input from '../../shared/components/FormElements/Input/Input';
import Card from '../../shared/components/UIElements/Card/Card';
import LoadingSpinner from '../../shared/components/UIElements/Loading/LoadingSpinner'
import ErrorModel from '../../shared/components/UIElements/Modal/ErrorModal';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators';
import { useForm } from '../../shared/hooks/form-hook';
import {useHttpRequest} from '../../shared/hooks/http-hook';
import './PlaceForm.css'

const UpdatePlace = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate()
    const placeId = useParams().placeId;
    const [loadedPlace, setLoadedPlace] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpRequest();
    const [formState, inputHandler, setFormData] = useForm({
        title : {
            value : '', 
            isValid : false
        },
        description : {
            value : '',
            isValid : false
        }
    }, false);

    useEffect(() => {
        const getPlace = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:4000/api/places/${placeId}`)
                setLoadedPlace(responseData.place);
                setFormData({
                    title : {
                        value : responseData.place.title,
                        isValid : true
                    },
                    description : {
                        value : responseData.place.description,
                        isValid : true
                    }
                }, true);
            }
            catch (err)
            {
                console.log(err);
            }
        };
        getPlace();
    }, [sendRequest,placeId, setFormData]);   

    
    const updateSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            await sendRequest('http://localhost:4000/api/places', 
            'PATCH',
            JSON.stringify({
                placeId : placeId,
                title : formState.inputs.title.value,
                description : formState.inputs.description.value,
            }),
            {
                'Content-Type' : 'application/json',
                Authorization : 'Bearer ' + auth.token
            }
            )
            navigate(`/${auth.userId}/places`)
        }
        catch (err)
        {
            
        }
    }

    return (
        <>
        { isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
        { error && !loadedPlace && <ErrorModel error={error} onClear={clearError}></ErrorModel>}
        { !isLoading && loadedPlace && (<form className='place-form' onSubmit={updateSubmitHandler}>
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
            <Button type='submit' disabled={!formState.isValid}>Update</Button>
        </form>)}
        {(!loadedPlace && !error) && 
            (
                <div className='center'>
                    <Card>
                        <h2>Could not find a place.</h2>
                    </Card>
                </div>
            )
        }
    </>
  )
}

export default UpdatePlace