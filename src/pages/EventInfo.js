import { useEffect, useState } from "react";
import '../App.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SecNav from "../components/SecNav";
import { Card } from "react-bootstrap";
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
  console.log(tour)
  return (
    <main>
        <section>
            <section>
                <SecNav page={page}/>
            </section>
            <section className="">
              <Card variant="secondary">
                <Card.Title>{tour.name}</Card.Title>
                </Card>
            </section>
        </section>
    </main>
  );
};

export default EventInfo;
