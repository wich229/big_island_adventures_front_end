import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./LoginSignUpCard.css";
import "../App.css";
import axios from "axios";

const kBaseUrl = process.env.REACT_APP_BACKEND_URL;

const SignUpCard = () => {
  const [signupFields, setSignupFields] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    //session_id: "",
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
      .post(`${kBaseUrl}/customers/register`, signupFields)
      .then((response) => {
        // console.log(response);
        console.log(response.data);
        window.confirm("Sign Up Successful");
        // setsignupFields({
        //   ...signupFields,
        //   session_id: response.data.id,
        // });
      })
      .catch((error) => {
        //console.log(error);
        alert(error.response.data.error);
      });
  };

  return (
    <main className="form-container">
      <section>
        <Form className="text-center login-signup-form" onSubmit={onSignUp}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="name"
              value={signupFields.name}
              onChange={onNameChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
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
              placeholder="Password"
              value={signupFields.password}
              onChange={onPasswordChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="phone"
              placeholder="Phone"
              value={signupFields.phone}
              onChange={onPhoneChange}
            />
          </Form.Group>

          <Button variant="secondary" type="submit">
            Sign Up
          </Button>
        </Form>
      </section>
    </main>
  );
};

export default SignUpCard;
