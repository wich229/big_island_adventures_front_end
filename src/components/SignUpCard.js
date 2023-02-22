import React, { useState } from "react";
import { redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./SignUpCard.css";
import "../App.css";
import axios from "axios";
import * as constants from '../Constants';


const SignUpCard = ({setDidSignUp}) => {
  const [signupFields, setSignupFields] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const onNameChange = (event) => {
    setSignupFields({
      ...signupFields,
      name: event.target.value,
    });
  };

  const onEmailChange = (event) => {
    setSignupFields({
      ...signupFields,
      email: event.target.value,
    });
  };

  const onPasswordChange = (event) => {
    setSignupFields({
      ...signupFields,
      password: event.target.value,
    });
  };

  const onPhoneChange = (event) => {
    setSignupFields({
      ...signupFields,
      phone: event.target.value,
    });
  };

  const onSignUp = async (event) => {
    event.preventDefault();
    axios
      .post(`${constants.kBaseUrl}/customers/register`, signupFields)
      .then((response) => {
        window.confirm("Sign Up Successful");
        setDidSignUp(true);
      })
      .catch((error) => {
        //console.log(error);
        alert(error.response.data.error);
      });
  };
  return (
      <section>
        <Form className="text-center login-signup-form" onSubmit={onSignUp}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={signupFields.name}
              onChange={onNameChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={signupFields.email}
              onChange={onEmailChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={signupFields.password}
              onChange={onPasswordChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="phone"
              placeholder="Enter phone"
              value={signupFields.phone}
              onChange={onPhoneChange}
            />
          </Form.Group>

          <Button variant="secondary" type="submit">
            Sign Up
          </Button>
        </Form>
      </section>
  );
};

export default SignUpCard;
