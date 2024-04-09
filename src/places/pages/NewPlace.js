import React from 'react'

import Input from '../../shared/components/FormElements/Input/Input'
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/utils/validators'
import Button from '../../shared/components/FormElements/Button/Button';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css'

const NewPlace = () => {
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
    }
  }, false);


  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  }
  return ( 
    <form className='place-form' onSubmit={submitHandler}>
      <Input 
        id='title'
        element='input' 
        type='text' 
        placeholder='Text' 
        validators={[VALIDATOR_REQUIRE()]} 
        errorText="Please enter a valid title" 
        onInput={inputHandler}>
      </Input>
      <Input 
        id='description' 
        element='textarea' 
        validators={[VALIDATOR_MINLENGTH(5)]} 
        errorText="Please enter a valid descption. (At least 5 char)" 
        onInput={inputHandler}>
      </Input>
      <Input
        id='address'
        element='text'
        validators={[VALIDATOR_MINLENGTH(1)]}
        errorText='Please enter a valid address'
        onInput={inputHandler}
      ></Input>
      <Button type='Submit' disabled={!formState.isValid} >Submit</Button>
    </form>
  )
}

export default NewPlace