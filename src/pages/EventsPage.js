import React from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";

const EventsPage = () => {
  return (
    <div>
      <h1 className="home-title">This is the Event Page</h1>
      <Link to="/event-info">
        <EventCard />
      </Link>
    </div>
  );
};

export default EventsPage;
