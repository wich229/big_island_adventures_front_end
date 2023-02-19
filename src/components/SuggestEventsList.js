import EventCard from "./EventCard";
import { CardGroup, Col } from "react-bootstrap";
import "../App.css";
import "./EventsList.css";

const SuggestEventsList = ({ suggestTours }) => {
  const toursList = suggestTours.map((suggestTours, index) => {
    return (
      <Col className="col" key={index}>
        <EventCard tour={suggestTours} />
      </Col>
    );
  });

  return <CardGroup className="card-group">{toursList}</CardGroup>;
};

export default SuggestEventsList;
