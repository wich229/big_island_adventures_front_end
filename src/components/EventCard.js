import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./EventCard.css";
import { Link } from "react-router-dom";

const EventCard = ({ tour }) => {
  const date = new Date(tour.time);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = date.toLocaleString("en-US", options);
  return (
    <section>
      <Card className="event-card">
        <Card.Img
          className="event-card-img"
          variant="top"
          src={tour.photo_url}
        />
        <Card.Body className="card-body">
          <Card.Text>{"Date: " + formattedDate}</Card.Text>
          <Card.Title className="card-title">{tour.name}</Card.Title>
          <Link to={`/tours/${tour.id}`}>
            <Button variant="secondary">More Info</Button>
          </Link>
        </Card.Body>
      </Card>
    </section>
  );
};

export default EventCard;
