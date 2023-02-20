import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./BookingForm.css";
import axios from "axios";
import { useEffect } from "react";

const kBaseUrl = process.env.REACT_APP_BACKEND_URL;

const BookingForm = ({
  tour,
  formattedDate,
  param,
  numTickets,
  setNumTickets,
  price,
  setPrice,
  bookingData,
  setBookingData,
  isLogin,
  setIsLogin,
  currentUser,
}) => {
<<<<<<< HEAD
  const checkLogin = () => {
    console.log("current User: " + currentUser.id)
    axios
      .get(`${kBaseUrl}/customers/@user`)
      .then((response) => {
        if (response.data.id){
            setIsLogin(true);
        }
        console.log("response" + response.data);
        //window.confirm("Login Successful");
      })
      .catch((error) => {
        //console.log(error.response);
        alert(error.response.data.error);
      });
  };

  // event handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("IM here")
    checkLogin();
    console.log(isLogin);
=======
  let canClick = currentUser.id ? setIsLogin(true) : setIsLogin(false);

  // const checkLogin = () => {
  //   axios
  //     .post(`${kBaseUrl}/customers/@user`, currentUser.id)
  //     .then((response) => {
  //       setIsLogin(true);
  //       console.log(response.data);
  //       //window.confirm("Login Successful");
  //     })
  //     .catch((error) => {
  //       setIsLogin(false);
  //       //console.log(error.response);
  //       alert(error.response.data.error);
  //     });
  // };

  // useEffect(() => {
  //   checkLogin();
  //   console.log(isLogin);
  // }, []);

  // event handlers
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const notHandleSubmit = (e) => {
    alert("please sign in");
>>>>>>> 72e0b337d5dc794800b3ae223309d73ddaa89679
  };

  // handle increase and decrease in ticket count
  const increaseTickets = () => {
    if (numTickets <= capacity) {
      const incTickets = numTickets + 1;
      setNumTickets(incTickets);
      setPrice(incTickets * tour.price);
      const data = bookingData;
      data["price"] = price;
      data[numTickets] = numTickets;
      setBookingData(data);
    }
  };

  const decreaseTickets = () => {
    if (numTickets > 0) {
      const decTickets = numTickets - 1;
      setNumTickets(decTickets);
      setPrice(decTickets * tour.price);
      const data = bookingData;
      data["price"] = price;
      data[numTickets] = numTickets;
      setBookingData(data);
    }
  };

  const capacity = tour.capacity;

  return (
<<<<<<< HEAD
    <Form  onSubmit={handleSubmit} className="booking-form">
=======
    <Form
      onSubmit={isLogin === true ? handleSubmit : notHandleSubmit}
      className="booking-form"
    >
>>>>>>> 72e0b337d5dc794800b3ae223309d73ddaa89679
      <section className="when-where-price-tour">
        <Form.Group>
          <Form.Label className="all-labels">Name</Form.Label>
          <br />
          <Form.Control placeholder="Enter here..." className="booking-name" />
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
          <Button variant="secondary" onClick={decreaseTickets}>
            -
          </Button>
          <Form.Control className="ticket-number" readOnly value={numTickets} />
          <Button variant="secondary" onClick={increaseTickets}>
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
        <Link
<<<<<<< HEAD
          to={{
            pathname: "/confirmation",
            state: { bookingData },
          }}>
          <Button onClick={handleSubmit} className="review-btn" variant="secondary" type="submit">
=======
          to={
            isLogin === true
              ? {
                  pathname: "/confirmation",
                  state: { bookingData },
                }
              : ""
          }
        >
          <Button className="review-btn" variant="secondary" type="submit">
>>>>>>> 72e0b337d5dc794800b3ae223309d73ddaa89679
            Review
          </Button>
        </Link>
      </section>
    </Form>
  );
};

export default BookingForm;
