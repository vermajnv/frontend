import React, { useState, useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useNavigate } from "react-router-dom";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";

import { useHttpRequest } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";

import Input from "../../shared/components/FormElements/Input/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import "./Authenticate.css";
import Card from "../../shared/components/UIElements/Card/Card";
import LoadingSpinner from "../../shared/components/UIElements/Loading/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/Modal/ErrorModal";
import ImageUpload from "../../shared/components/FormElements/ImageUpload/ImageUpload";

const Authenticate = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image : undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image : {
            value : null,
            isValid : false
          }
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const navigate = useNavigate();

  const loginHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (!isLoginMode) {
      try {
        formData.append("name", formState.inputs.name.value);
        formData.append("email", formState.inputs.email.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        const response = await sendRequest(
          "http://localhost:4000/api/users/signup",
          "POST",
          formData
        );
        auth.login(response.user._id, response.token);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await sendRequest(
          "http://localhost:4000/api/users/login",
          "POST",
          JSON.stringify({
              email: formState.inputs.email.value,
              password: formState.inputs.password.value,
            }),
            {
              "Content-Type": "application/json",
            }
        );
        auth.login(response.user._id, response.token);
        console.log(auth);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
    // console.log(formState.inputs);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError}></ErrorModal>
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={loginHandler}>
          {!isLoginMode && (
            <>
            <Input
              id="name"
              element="input"
              label="Name"
              type="text"
              placeholder="Name"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              value={formState.inputs.name.value}
            ></Input>
            <ImageUpload id="image" center onInput={inputHandler}></ImageUpload>
            </>
          )}

          <Input
            id="email"
            element="input"
            label="Email"
            type="email"
            placeholder="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address"
            onInput={inputHandler}
            value={formState.inputs.email.value}
          ></Input>
          <Input
            id="password"
            element="input"
            label="Password"
            type="password"
            placeholder="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password. (Mininum 6 char)"
            onInput={inputHandler}
            value={formState.inputs.password.value}
          ></Input>
          <Button invert disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          Switch To {isLoginMode ? "SIGNUP" : "SIGNIN"}
        </Button>
      </Card>
    </>
  );
};
export default Authenticate;
