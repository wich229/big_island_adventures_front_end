import React from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import {Container, CardGroup, Col} from 'react-bootstrap';  
import '../App.css'
import './EventsPage.css'
import Calendar from '../components/Calendar';
import Weather from '../components/Weather';
import SecNav from "../components/SecNav";


const EventsPage = () => {
  return (
  <main className="main-events">
    <section>
    <SecNav />
    </section>

    <section>
      <Calendar label="Choose by date"/>
    </section>

    <section>
      <Weather></Weather>
    </section>

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
