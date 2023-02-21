import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./LoginSignUpCard.css";
import "../App.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const kBaseUrl = process.env.REACT_APP_BACKEND_URL;

const LogInCard = ({ loginFields, setLoginFields, setCurrentUser }) => {
  // const [loginFields, setLoginFields] = useState({
  //   email: "",
  //   password: "",
  //   // session_id: "",
  // });
  let history = useNavigate();

  const onEmailChange = (event) => {
    setLoginFields({
      ...loginFields,
      email: event.target.value,
    });
  };

  const onPasswordChange = (event) => {
    setLoginFields({
      ...loginFields,
      password: event.target.value,
    });
  };

  const onSignIn = (event) => {
    
    event.preventDefault();
    axios
      .post(`${kBaseUrl}/customers/login`, loginFields)
      .then((response) => {
        console.log("response data" + Object.entries(response.data));
        window.confirm("Login Successful");
        localStorage.setItem('user', JSON.stringify({ ...response.data }));
        history.push('/*');

      })
      .catch((error) => {
        alert(error.response.data.error);
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
              value={loginFields.email}
              onChange={onEmailChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={loginFields.password}
              onChange={onPasswordChange}
            />
            <Link to={"/signup"}>
              <p> Sing Up</p>
            </Link>
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
