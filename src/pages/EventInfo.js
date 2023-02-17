import { useEffect, useState } from "react";
import '../App.css'
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import SecNav from "../components/SecNav";
import { Card, Button} from "react-bootstrap";
import './EventInfo.css'
const kBaseUrl = process.env.REACT_APP_BACKEND_URL


const EventInfo = () => {
  const param = useParams();
  const page = "tour"
  const [tour, setTourState] = useState({});
  const date = new Date(tour.time);
  const options = {
    year: 'numeric', 
    month: 'numeric', 
    day: 'numeric',
    hour12: true, 
    hour: 'numeric', 
    minute: 'numeric'
  };
  const formattedDate = date.toLocaleString('en-US', options);

  useEffect(() => {
    axios
      .get(`${kBaseUrl}/tours/${param.id}`)
      .then((response) => {
        setTourState(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  
  }, [param.id]);

  return (
    <main>
            <section>
                <SecNav page={page}/>
            </section>
            <section >
              <Card className="event-info" variant="secondary">
                <Card.Img className="event-info-img" src={tour.photo_url}></Card.Img>
                <section className="title-text-btn-container">
                <Card.Title className="event-info-title">{tour.name}</Card.Title>
                <Card.Text>{'Date: ' + formattedDate}</Card.Text>
                <Card.Text className="event-info-text">{tour.description}</Card.Text>
                <section className="event-info-btns">
                <Link to="/tours">
                <Button variant="secondary" className="go-back-btn">Go Back</Button>
                </Link> 
                <Link to="/client">
                <Button variant="secondary" className="book-tour-btn">Book tour</Button>
                </Link>
                </section>
                </section>
              </Card>
            </section>
    </main>
  );
};

export default EventInfo;
