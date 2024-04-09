import React, {useCallback, useReducer} from 'react'

import Input from '../../shared/components/FormElements/Input/Input'
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/utils/validators'
import Button from '../../shared/components/FormElements/Button/Button';
import './NewPlace.css'

const formReducer = (state, action) => {
  switch(action.type) {
    case 'INPUT_CHANGE' : 
      let formIsValid = true;
      for(const inputId in state.inputs)
      {
        if(inputId === action.inputId)
        {
          formIsValid = formIsValid && action.isValid
        }
        else 
        {
          formIsValid = formIsValid && state.inputs[inputId].isValid
        }
      }
      return {
        ...state,
        inputs : {
          ...state.inputs,
          [action.inputId] : { value : action.value, isValid : action.isValid}
        },
        isValid : formIsValid
      };
    default :
      return state
  }
} 

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs : {
      title : {
        value : '',
        isValid : false
      },
      description : {
        value : '',
        isValid : false
      }
    },
    isValid : false
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({ 
      type : 'INPUT_CHANGE', 
      value : value, 
      isValid : isValid, 
      inputId : id
    })
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formState);
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
      <Button type='Submit' disabled={!formState.isValid}>Submit</Button>
    </form>
  )
}

export default NewPlace