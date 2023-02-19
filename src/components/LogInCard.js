import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./LoginSignUpCard.css";
import "../App.css";
import axios from "axios";

const kBaseUrl = process.env.REACT_APP_BACKEND_URL;

const LogInCard = () => {
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
    session_id: "",
  });

  const onEmailChange = (event) => {
    setFormFields({
      ...formFields,
      email: event.target.value,
    });
  };

  const onPasswordChange = (event) => {
    setFormFields({
      ...formFields,
      password: event.target.value,
    });
  };

  const onSignIn = (event) => {
    event.preventDefault();
    axios
      .post(`${kBaseUrl}/customers/login`, formFields)
      .then((response) => {
        console.log(response.data);
        // setFormFields({
        //   ...formFields,
        //   session_id: response.data.id,
        // });
      })
      .catch((error) => {
        console.log(error.response);
        //console.log(error.response.error);
      });
  };

  return (
    <main className="form-container">
      <section>
        <Form className="text-center login-signup-form" onSubmit={onSignIn}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={formFields.email}
              onChange={onEmailChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={formFields.password}
              onChange={onPasswordChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Sign In
          </Button>
        </Form>
      </section>
    </main>
  );
};

export default LogInCard;
