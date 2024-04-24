import React, { useState, useContext } from 'react'

import Input from '../../shared/components/FormElements/Input/Input'
import Button from '../../shared/components/FormElements/Button/Button'
import './Authenticate.css'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators'
import { useForm } from '../../shared/hooks/form-hook'
import Card from '../../shared/components/UIElements/Card/Card'
import { AuthContext } from '../../shared/context/auth-context'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../shared/components/UIElements/Loading/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/Modal/ErrorModal'

const Authenticate = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const [formState, inputHandler, setFormData] = useForm({
        email : {
            value : '',
            isValid : false
        },
        password : {
            value : '',
            isValid : false
        }
    }, false);

    const switchModeHandler = () => {
        if(!isLoginMode){
            setFormData({
                ...formState.inputs,
                name : undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        }
        else 
        {
            setFormData({
                ...formState.inputs,
                name : {
                    value : '',
                    isValid : false
                }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode)
    }

    const navigate = useNavigate();

    const loginHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        let data, responseData;
        if(!isLoginMode) {
            try {
                data = await fetch('http://localhost:4000/api/users/signup', {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        name : formState.inputs.name.value,
                        email : formState.inputs.email.value,
                        password : formState.inputs.password.value
                    })
                });
                responseData = await data.json();
            }
            catch (err) {
                console.log(err);
                setError(err.message || 'Something went wrong Please try again')
            }
        }
        else {
            try {
                data = await fetch('http://localhost:4000/api/users/login', {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        email : formState.inputs.email.value,
                        password : formState.inputs.password.value
                    })
                });
                responseData = await data.json();
                if(!data.ok)
                {
                    throw new Error(responseData.message);
                }
                setIsLoading(false);
                auth.login();
                navigate('/')
            }
            catch (err) {
                console.log(err);
                setIsLoading(false);
                setError(err.message || 'Something went wrong. Please try again');
            }
        }
        console.log(formState.inputs);
    }

    const errorHandler = () => {
        setError('');
    }   

  return (
    <>
        <ErrorModal error={error} onClear={errorHandler}></ErrorModal>
        <Card className='authentication'>
            { isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
            <h2>Login Required</h2>
            <hr />
            <form onSubmit={loginHandler}>
                {!isLoginMode && <Input
                    id='name'
                    element='input'
                    label='Name'
                    type='text'
                    placeholder='Name'
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    value={formState.inputs.name.value}
                ></Input>}
                <Input 
                    id='email'
                    element='input'
                    label='Email'
                    type='email'
                    placeholder='Email'
                    validators={[VALIDATOR_EMAIL()]}
                    errorText='Please enter a valid email address'
                    onInput={inputHandler}
                    value={formState.inputs.email.value}
                ></Input>
                <Input 
                    id='password'
                    element='input'
                    label='Password'
                    type='password'
                    placeholder='Password'
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    errorText='Please enter a valid password. (Mininum 6 char)'
                    onInput={inputHandler}
                    value={formState.inputs.password.value}
                ></Input>
                <Button invert disabled={!formState.isValid}>{isLoginMode ? 'LOGIN' : 'SIGNUP'}</Button>
            </form>
            <Button inverse onClick={switchModeHandler}>Switch To {isLoginMode ? 'SIGNUP' : 'SIGNIN'}</Button>
        </Card>
    </>
  )

}
export default Authenticate