import { Form, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./BookingForm.css";

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
  const user = JSON.parse(localStorage.getItem('user'));
  let canClick = user ? setIsLogin(true) : setIsLogin(false);

  let userName;
  const currentBooking = {
    "customer_id": currentUser.id,
    "tour_id": tour.id,
    "booking_date": new Date(),
    "status": "active",
    "tickets": numTickets,
    "name": userName,

  }
  let history = useNavigate();
  
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
    console.log("HELLO!!!")
    localStorage.setItem('booking', JSON.stringify({ ...currentBooking}));
    history(`/confirmation`);
    console.log("history" + Object.entries(currentBooking))
  };
  
  const notHandleSubmit = (e) => {
    alert("please sign in");
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
    <Form 
      className="booking-form"
    >
      <section className="when-where-price-tour">
        <Form.Group>
          <Form.Label className="all-labels">Name</Form.Label>
          <br />
          <input value={userName} placeholder="Enter here..." className="booking-name" />
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
          <Form.Control className="ticket-number" readOnly value={numTickets} />
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
        <Link
          to={"/confirmation"}
        >
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
