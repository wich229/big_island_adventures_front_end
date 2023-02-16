import { useEffect, useState } from "react";
import '../App.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SecNav from "../components/SecNav";
import { Card, Button} from "react-bootstrap";
import './EventInfo.css'
const kBaseUrl = process.env.REACT_APP_BACKEND_URL


const EventInfo = () => {
  const param = useParams();
  const page = "tour"
  const [tour, setTourState] = useState({});
  
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
            <section>
                <SecNav page={page}/>
            </section>
            <section >
              <Card className="event-info" variant="secondary">
                <Card.Img className="event-info-img" src={tour.photo_url}></Card.Img>
                <section className="title-text-btn-container">
                <Card.Title className="event-info-title">{tour.name}</Card.Title>
                <Card.Text className="event-info-text">{tour.description}</Card.Text>
                <section className="event-info-btns">
                <Button variant="secondary" className="go-back-btn">Go Back</Button>
                <Button variant="secondary" className="book-tour-btn">Book tour</Button>
                </section>
                </section>
              </Card>
            </section>
        </section>
    </main>
  );
};

export default EventInfo;
