import EventCard from "./EventCard";
import { Container, Row, Col } from "react-bootstrap";
import "../App.css";
import "./EventsList.css";

const EventsList = ({ tours }) => {
  const toursList = tours.map((tour) => {
    return (
      <Col className="col-lg-4 mb-3 d-flex align-items-stretch">
        <EventCard tour={tour} />
      </Col>
    );
  });

  return (
    <Container classname="event-section">
      <Row className="pt-5">
        <Col className="col-12">
          <h3 class="text-uppercase mb-4">Tours List</h3>
        </Col>
      </Row>
      <Row>{toursList}</Row>
    </Container>
  );
};

export default EventsList;
