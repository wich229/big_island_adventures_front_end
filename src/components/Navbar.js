import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import logo from '../images/turtle.png'
import './Navbar.css'

function TopNav() {
  return (
    <header>
      <Navbar className="Nav">
        <Container>
          <Link className="BIA-logo-link" to="/">
            <Navbar.Brand 
            href="#home" className="BIA-logo-text">
            <img className="turtle-logo" src={logo} height="50" 
            alt="Turtle logo"/>
            Big Island Adventures
            </Navbar.Brand>
          </Link>
          {/* <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end"> */}
          {/* when sign in */}
          {/* <Navbar.Text>
              Signed in as: <a href="#login">Name</a>
            </Navbar.Text> */}
          {/* </Navbar.Collapse> */}
          <Navbar.Text>
            <Link to="/about">
              <Button variant="outline-secondary">About</Button>
            </Link>{" "}
            <Link to="/login_signup">
              <Button variant="outline-secondary">Sign In</Button>
            </Link>{" "}
            <Link to="/login_signup">
              <Button variant="outline-secondary">Sign Up</Button>
            </Link>{" "}
          </Navbar.Text>
        </Container>
      </Navbar>
      </header>
  );
}

export default TopNav;
