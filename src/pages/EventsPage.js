import React from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import {Container, CardGroup, Col} from 'react-bootstrap';  
import '../App.css'

const EventsPage = () => {
  return (
  <main>
    <section className="event-card">
      <Container className="me-auto">
      <CardGroup className="card-group">
        <Col>
          <Link to="/event-info">
            <EventCard />
          </Link>
        </Col>
        <Col>
          <Link to="/event-info">
            <EventCard />
          </Link>
        </Col>
        <Col>
          <Link to="/event-info">
            <EventCard />
          </Link>
        </Col>
        <Col>
          <Link to="/event-info">
            <EventCard />
          </Link>
        </Col>
        <Col>
          <Link to="/event-info">
            <EventCard />
          </Link>
        </Col>
      </CardGroup></Container>
    </section></main>

  );
};

export default EventsPage;
