import '../App.css';
import SecNav from '../components/SecNav';
import { Form, Button } from 'react-bootstrap'
import{Link} from 'react-router-dom';
import axios from 'axios';
import './ConfirmBooking.css'
import * as constants from '../Constants';

const page = "confirm";
const booking = JSON.parse(localStorage.getItem('booking'));

const bookingToBePosted = {
  //customer_id: booking.user_id,
  //tour_id: booking.tour.id,
  //tickets: booking.tickets

}

const ConfirmBooking = () => {

  const handleSubmit =()=>{
    postBooking();
  }


  const postBooking = () =>{
    axios
      .post(`${constants.kBaseUrl}/bookings/${booking.user_id}/booking_detail/${booking.tour.id}`, bookingToBePosted)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });
    }
  

    return(
        <main>
            <section>
                <SecNav page={page}/>
            </section>
            
          <Form className="booking-form review-form">
            <section className="when-where-price-tour">
              <Form.Group>
                <Form.Label className="all-labels">Name</Form.Label>
                <br />
                <Form.Text>{booking.name}</Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label className="all-labels">Tour</Form.Label>
                <br />
                <Form.Text>{booking.tour.name}</Form.Text>
              </Form.Group>

              <Form.Group className="when">
                <Form.Label className="all-labels">When</Form.Label>
                <br />
                <Form.Text>{booking.tour.date}</Form.Text>
                <br />
              </Form.Group>

              <Form.Group className="where">
                <Form.Label className="all-labels">Where</Form.Label>
                <br />
                <Form.Text>{booking.tour.address}</Form.Text>
                <br />
              </Form.Group>
              <Form.Group className="price">
                <Form.Label className="all-labels">Price</Form.Label>
                <br />
                <Form.Text>${booking.price}</Form.Text>
                <br />
              </Form.Group>
            </section>

            <section className="tickets-container">
              <Form.Label className="ticket-label all-labels">Tickets</Form.Label>
              <br />
              <Form.Text>{booking.tickets}</Form.Text>
              <br />
            </section>
            <section>
              <Link to='/dashboard'>
                <Button 
                onClick={handleSubmit} 
                className="review-btn" 
                variant="secondary" 
                type="submit">
                  Confirm
                </Button>
              </Link>
            </section>
          </Form>
        </main>
        )
}

export default ConfirmBooking;