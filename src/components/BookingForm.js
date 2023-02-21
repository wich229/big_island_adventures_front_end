import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./BookingForm.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import helpers from "../Helpers";
import * as constants from "../Constants"

const BookingForm = ({
  tour,
  formattedDate,
  param,
  price,
  setPrice,
  bookingData,
  setBookingData,
  setIsLogin

}) => { 
  const user = JSON.parse(localStorage.getItem('user'));
  user ? setIsLogin(true) : setIsLogin(false);
  const [userName, setUserName] = useState('');
  const [numTickets, setNumTickets] = useState(1);
  let history = useNavigate();
  let nextPage; 
/*   let available_capacity = tour.capacity

  useEffect(() => {
    axios
      .get(`${constants.kBaseUrl}/tours/${tour.id}/capacity`)
      .then((response) => {
        let availableCapacity=response.data["available_capacity"]
      })
      .catch((error) => {
        console.log(error);
      });
  }, [numTickets]); */

  // event handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    const currentBooking = {
      "tour": {...tour},
      "status": "active",
      "tickets": numTickets,
      "name": userName,
      "price": price,
      "user_id": user.id
    }
    localStorage.setItem('booking', JSON.stringify({ ...currentBooking}));
    history(`/confirmation`);
    nextPage = "/confirmation"
    helpers.refreshPage();
  };

  const getName = ({target:{value}}) => userName=value;
  
  const notHandleSubmit = (e) => {
    e.preventDefault();
    nextPage=''
    alert("please sign in");
  };
  
  const getUserName = (e) =>{
    e.preventDefault();
    setUserName(e.target.value)
  }

  const getNumTickets = (e) =>{
    e.preventDefault();
    setNumTickets(e.target.value)
  }

  // handle increase and decrease in ticket count
  const increaseTickets = (e) => {
    e.preventDefault()
    if (numTickets < capacity) {
      const incTickets = numTickets + 1;
      setNumTickets(incTickets);
      setPrice(incTickets * tour.price);
      const data = bookingData;
      setBookingData(data);
    }
  };

  const decreaseTickets = (e) => {
    e.preventDefault()
    if (numTickets > 1) {
      const decTickets = numTickets - 1;
      setNumTickets(decTickets);
      setPrice(decTickets * tour.price);
      const data = bookingData;
      setBookingData(data);
    }
  };

  const capacity = tour.capacity;

  return (
    <Form 
      className="booking-form"
    >
      <section className="when-where-price-tour">
        <Form.Group>
          <Form.Label className="all-labels">Name</Form.Label>
          <br />
          <input id="booking-name" onChange={getUserName} placeholder="Enter here..." className="booking-name" />
        </Form.Group>

        <Form.Group>
          <Form.Label className="all-labels">Tour</Form.Label>
          <br />
          <Form.Text>{tour.name}</Form.Text>
        </Form.Group>

        <Form.Group className="when">
          <Form.Label className="all-labels">When</Form.Label>
          <br />
          <Form.Text>{formattedDate}</Form.Text>
          <br />
        </Form.Group>

        <Form.Group className="where">
          <Form.Label className="all-labels">Where</Form.Label>
          <br />
          <Form.Text>{tour.address}</Form.Text>
          <br />
        </Form.Group>
        <Form.Group className="price">
          <Form.Label className="all-labels">Price</Form.Label>
          <br />
          <Form.Text>${price}</Form.Text>
          <br />
        </Form.Group>
      </section>

      <section className="tickets-container">
        <Form.Label className="ticket-label all-labels">Tickets</Form.Label>
        <br />
        <section className="add-tickets">
          <Button variant="secondary" className="ticket-btns" onClick={decreaseTickets}>
            -
          </Button>
          <input onChange={getNumTickets} className="ticket-number" readOnly placeholder={numTickets} />
          <Button variant="secondary" className="ticket-btns" onClick={increaseTickets}>
            +
          </Button>
          <br />
        </section>
      </section>

      <section className="nav-buttons">
        <Link to={`/tours/${param.id}`}>
          <Button variant="secondary" className="go-back-btn">
            Go Back
          </Button>
        </Link>
        <Link to={nextPage}>
          <Button 
          onClick={user ? handleSubmit : notHandleSubmit} 
          className="review-btn" 
          variant="secondary" 
          type="submit">
            Review
          </Button>
        </Link>
      </section>
    </Form>
  );
};

export default BookingForm;
