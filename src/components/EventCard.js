import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./EventCard.css";
import { Link } from "react-router-dom";

const EventCard = ({ tour }) => {
  return (
    <Card
      className="event-card"
      // style={{ width: "18rem", height: "35rem" }}
    >
      <Card.Img
        className="event-card-img"
        variant="top"
        src={tour.photo_url}
        alt="Card Image"
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-4">{tour.name}</Card.Title>
        <Link to={`/tours/${tour.id}`}>
          <Button variant="secondary" className="mt-auto">
            More Info
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
