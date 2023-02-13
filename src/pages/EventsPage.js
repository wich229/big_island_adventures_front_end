import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const EventsPage = () => {
  return (
    <div>
      <h1 className="home-title">This is the Event Page</h1>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Link to="/event-info">
            <Button variant="primary">Event Info</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EventsPage;
