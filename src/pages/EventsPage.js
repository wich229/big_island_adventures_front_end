import React from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import {Container, CardGroup, Col, Row} from 'react-bootstrap';  
import '../App.css'
import './EventsPage.css'
import Calendar from '../components/Calendar';
import Weather from '../components/Weather';
import SecNav from "../components/SecNav";
import FilterDropdown from "../components/FilterDropdown";
import SortButton from "../components/SortButton";


const EventsPage = () => {
  return (
  <main className="main-events">
    <section>
    <SecNav />
    </section>

    <Row>
      <Calendar label="Choose by date"/>
    </Row>

    <Row>
      <Weather/>
    </Row>

    <section className="query-choices">
      <FilterDropdown/>
      <SortButton/>
    </section>

    <section className="event-card-container">
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
