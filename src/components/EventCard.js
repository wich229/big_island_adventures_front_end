import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';  
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import './EventCard.css'


const EventCard = () => {
  return (
    <section>
      <Card className='event-card-container' style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Event One</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="secondary">Event Info</Button>
        </Card.Body>
      </Card>
    </section>
  );
};

export default EventCard;
