import React, { useContext } from 'react'

import Input from '../../shared/components/FormElements/Input/Input'
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/utils/validators'
import Button from '../../shared/components/FormElements/Button/Button';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css'
import { useHttpRequest } from '../../shared/hooks/http-hook';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import LoadingSpinner from '../../shared/components/UIElements/Loading/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/Modal/ErrorModal';
import ImageUpload from '../../shared/components/FormElements/ImageUpload/ImageUpload';

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const {isLoading, error, sendRequest, clearError} = useHttpRequest();
  const [formState, inputHandler] = useForm({
    title : {
      value : '',
      isValid : false
    },
    description : {
      value : '',
      isValid : false
    },
    address : {
      value : '',
      isValid : false
    },
    image : {
      value : null,
      isValid : false
    }
  }, false);


  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    try {
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('image', formState.inputs.image.value);
      formData.append('creator', auth.userId);
      console.log(formData);
      await sendRequest('http://localhost:4000/api/places', 'POST', 
        formData,
      );
      navigate('/');
    }
    catch (err)
    {
      console.log(err);
    }
  }
  return (
    <>
      { error && <ErrorModal error={error} onClear={clearError}></ErrorModal>}

      <form className='place-form' onSubmit={submitHandler}>
        {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>} 
        <Input 
          id='title'
          element='input' 
          label='Title'
          type='text' 
          placeholder='Text' 
          validators={[VALIDATOR_REQUIRE()]} 
          errorText="Please enter a valid title" 
          onInput={inputHandler}>
        </Input>
        <Input 
          id='description' 
          label='Description'
          element='textarea' 
          validators={[VALIDATOR_MINLENGTH(5)]} 
          errorText="Please enter a valid descption. (At least 5 char)" 
          onInput={inputHandler}>
        </Input>
        <Input
          id='address'
          label='Address'
          element='text'
          placeholder='Address'
          validators={[VALIDATOR_MINLENGTH(1)]}
          errorText='Please enter a valid address'
          onInput={inputHandler}
        ></Input>
        <ImageUpload id='image' center onInput={inputHandler} errorText='Place select an image'></ImageUpload>
        <Button type='Submit' disabled={!formState.isValid} >Submit</Button>
      </form>
    </>
  )
}

export default NewPlace