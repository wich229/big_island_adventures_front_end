import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./LoginSignUpCard.css";
import "../App.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import helpers from '../Helpers';
import * as constants from '../Constants';

const LogInCard = ({ setIsLogin, loginFields, setLoginFields}) => {
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
      .post(`${constants.kBaseUrl}/customers/login`, loginFields)
      .then((response) => {
        window.confirm("Login Successful");
        localStorage.setItem("user", JSON.stringify({ ...response.data }));
        history.push("/*");
        setIsLogin(true);
        window.location.reload();
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
          <Button onClick={helpers.refreshPage} variant="primary" type="submit">
            Sign In
          </Button>
        </Form>
      </section>
    </main>
  );
};

export default LogInCard;
