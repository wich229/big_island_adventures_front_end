import '../App.css';
import SecNav from '../components/SecNav';
import { Form, FormGroup, Button, InputGroup } from "react-bootstrap";
import './Client.css'
import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';


const kBaseUrl = process.env.REACT_APP_BACKEND_URL

const Client = () => {
    const param = useParams();
    const page = "client"
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
    const capacity = tour.capacity
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

    const handleSubmit = (event) => {
            event.preventDefault();
            // handle form submission logic here
        };
    const [numTickets, setNumTickets] = useState(0);

    // handle increase and decrease in ticket count
    const increaseTickets = () => {
        if (numTickets < capacity) {
        setNumTickets(numTickets + 1);
        }
    };
    const decreaseTickets = () => {
        if (numTickets > 0) {
        setNumTickets(numTickets - 1);
        }
    };

    return(
    <main>
        <section>
            <SecNav page={page}/>
        </section>

        <section >
            <Form onSubmit={handleSubmit} className="booking-form">
            <Form.Label>Tour</Form.Label><br/>
            <Form.Text>{tour.name}</Form.Text>
        <section className="when-where">
        <section className="when">
            <Form.Label>When</Form.Label><br/>
            <Form.Text>{formattedDate}</Form.Text><br/>
        </section>
        <section className="where">
            <Form.Label>Where</Form.Label><br/>
            <Form.Text >{tour.address}</Form.Text><br/>
        </section>
        </section>

        <section className="tickets-submit">
        <Form.Label className="ticket-label">Tickets</Form.Label><br/>
        <section className="tickets">
            <Button variant="secondary" onClick={decreaseTickets}>-</Button>
            <Form.Control className="ticket-number" readOnly value={numTickets}/>
            <Button variant="secondary" onClick={increaseTickets}>+</Button><br/>
        </section>

        <section className="nav-buttons">
        <Link to={`/tours/${param.id}`}>
            <Button variant="secondary" className="go-back-btn">Go Back</Button>
        </Link> 
        <Link to="/confirmation">
        <Button className="review-btn" variant="secondary" type="submit">Review</Button>
        </Link>
        </section>
        </section>
    </Form>
        </section>
    </main>
    )
}

export default Client;