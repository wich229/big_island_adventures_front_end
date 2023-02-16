import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';  
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import './EventCard.css'
import { Link} from 'react-router-dom';


const EventCard = ({tour}) => {
  return (
    <section>
      <Card className='event-card' style={{ width: "18rem", height: "35rem"}}>
        <Card.Img className='event-card-img' variant="top" src={tour.photo_url} />
        <Card.Body>
          <Card.Title className="card-title">{tour.name}</Card.Title>
          <Card.Text>
            {/* {tour.description} */}
          </Card.Text>
          <Link to={`/tours/${tour.id}`}>
          <Button variant="secondary">More Info</Button>
          </Link>
        </Card.Body>
      </Card>
    </section>
  );
};

export default EventCard;
