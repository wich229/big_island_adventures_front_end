import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import SecNav from "./SecNav";

function TopNav() {
  return (
    <>
      <Navbar className="Nav">
        <Container>
          <Link to="/">
            <Navbar.Brand href="#home">LOGO</Navbar.Brand>
          </Link>
          {/* <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end"> */}
          {/* when sign in */}
          {/* <Navbar.Text>
              Signed in as: <a href="#login">Name</a>
            </Navbar.Text> */}
          {/* </Navbar.Collapse> */}
          <Navbar.Text>
            <Link to="/login_signup">
              <Button variant="outline-secondary">Sign In</Button>
            </Link>{" "}
            <Link to="/login_signup">
              <Button variant="outline-secondary">Sign Up</Button>{" "}
            </Link>
          </Navbar.Text>
        </Container>
      </Navbar>
      <SecNav />
    </>
  );
}

export default TopNav;
