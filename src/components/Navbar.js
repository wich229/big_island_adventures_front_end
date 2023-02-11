import React from "react";
import "./Navbar.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

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
      <div className="booking-procress-bar">
        <ul className="booking-step">
          <li>EVENT</li>
          <li>EVENT INFO</li>
          <li>CLIENT</li>
          <li>CONFIRMATION</li>
        </ul>
      </div>
    </>
  );
}

export default TopNav;
