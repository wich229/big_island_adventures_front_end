import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';  
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import './EventCard.css'
import holderpic from "../images/pexels-diego-sandoval-4767081(2).jpg"


const EventCard = () => {
  return (
    <section>
      <Card className='event-card' style={{ width: "18rem" }}>
        <Card.Img className='event-card-img' variant="top" src={holderpic} />
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
