import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./LoginSignUpCard.css";
import "../App.css";
import axios from "axios";

const kBaseUrl = process.env.REACT_APP_BACKEND_URL;

const SignUpCard = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    //session_id: "",
  });

  const onNameChange = (event) => {
    setFormFields({
      ...formFields,
      name: event.target.value,
    });
  };

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

  const onPhoneChange = (event) => {
    setFormFields({
      ...formFields,
      phone: event.target.value,
    });
  };

  const onSignUp = async (event) => {
    event.preventDefault();
    axios
      .post(`${kBaseUrl}/customers/register`, formFields)
      .then((response) => {
        // console.log(response);
        console.log(response.data);
        window.confirm("Sign Up Successful");
        // setFormFields({
        //   ...formFields,
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
              value={formFields.name}
              onChange={onNameChange}
            />
          </Form.Group>

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

          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="phone"
              placeholder="Phone"
              value={formFields.phone}
              onChange={onPhoneChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      </section>
    </main>
  );
};

export default SignUpCard;
