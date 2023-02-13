import React from "react";
import "./Footer.css";
import Nav from "react-bootstrap/Nav";

const Footer = () => {
  return (
    <footer className="footer">
      <Nav className="justify-content-center" as="footer">
        <Nav.Item>
          <Nav.Link href="/home">home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">facebook</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">youtube</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2">instagram</Nav.Link>
          </Nav.Item>
        </Nav.Item>
      </Nav>
      <p className="text-center mt-4 mb-4">
        Street name and number City, Country
      </p>
      <p className="text-center mt-4 mb-4">(+00) 0000 000 000</p>
      <p className="text-center mt-4 mb-4">office@company.com</p>
      <p className="text-center mt-4 mb-4">Company Name &copy; 2023</p>
    </footer>
  );
};

export default Footer;
