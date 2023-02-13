import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import SecNav from "./SecNav";

function TopNav() {
  return (
    <>
      <Navbar className="Nav">
        <Container>
          <Navbar.Brand href="#home">LOGO</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">Name</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <SecNav />
    </>
  );
}

export default TopNav;
