import React, { useReducer, useEffect} from 'react'

import {validate} from '../../../utils/validators'
import './Input.css';

const inputReducer = (state, action) => {
    switch(action.type){
        case 'CHANGE' :
        return {
            ...state,
            value : action.val,
            isValid : validate(action.val, action.validators)
        };
        case 'BLUR' : 
            return {
                ...state,
                value : action.val,
                isBlur : true
            }
        default : 
            return state
    }
}

const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value : props.initialValue || '', 
        isValid : props.initialIsValid || false, 
        isBlur : false
    });
    const {id, onInput} =  props;
    const { value, isValid} = inputState;

    useEffect(() => { 
        onInput(id, value, isValid)
    }, [ id, value, isValid, onInput])

    const onChangeHandler = (event) => {
        dispatch({
            type : 'CHANGE',
            val : event.target.value,
            validators : props.validators
        })
    }

    const onBlurHandler = (event) => {
        dispatch({
            type : 'BLUR',
            val : event.target.value
        })
    }
    const element = props.element === 'input' ? 
    <input 
        id={props.id} 
        type={props.type} 
        placeholder={props.placeholder} 
        onChange={onChangeHandler} 
        onBlur={onBlurHandler}
        value={inputState.value}
    >
    </input> : 
    <textarea 
        id={props.id} 
        rows={props.rows || 3} 
        onChange={onChangeHandler}
        onBlur={onBlurHandler} 
        value={inputState.value}
    >
    </textarea>

    return (
        <div className={`form-control ${!inputState.isValid && inputState.isBlur && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isBlur && <p>{props.errorText}</p>}
        </div>
    )
}

export default Input