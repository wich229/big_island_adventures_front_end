import { Form, Button} from "react-bootstrap";
import { Link } from 'react-router-dom';
import './BookingForm.css'

const BookingForm = ({
    tour, 
    formattedDate, 
    param, 
    numTickets, 
    setNumTickets, 
    price, 
    setPrice,
    bookingData,
    setBookingData
}) => {

    // event handlers
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    // handle increase and decrease in ticket count
    const increaseTickets = () => {
        if (numTickets <= capacity) {
        const incTickets = numTickets + 1;
        setNumTickets(incTickets);
        setPrice(incTickets * tour.price);
        const data = bookingData;
        data['price'] = price
        data[numTickets] = numTickets
        setBookingData(data)
    }    
    };

    const decreaseTickets = () => {
        if (numTickets > 0) {
        const decTickets = numTickets - 1;
        setNumTickets(decTickets);
        setPrice(decTickets * tour.price)
        const data = bookingData;
        data['price'] = price
        data[numTickets] = numTickets
        setBookingData(data)
        }
    };

    const capacity = tour.capacity

    return (
        <Form onSubmit={handleSubmit} className="booking-form"> 
        <section className="when-where-price-tour">
            <Form.Group>
            <Form.Label className="all-labels">Name</Form.Label><br/>
                <Form.Control placeholder="Enter here..." className="booking-name" />
            </Form.Group>

            <Form.Group>
                <Form.Label className="all-labels">Tour</Form.Label><br/>
                <Form.Text>{tour.name}</Form.Text>
            </Form.Group>

            <Form.Group className="when">
                <Form.Label className="all-labels">When</Form.Label><br/>
                <Form.Text>{formattedDate}</Form.Text><br/>
            </Form.Group>

            <Form.Group className="where">
                <Form.Label className="all-labels">Where</Form.Label><br/>
                <Form.Text >{tour.address}</Form.Text><br/>
            </Form.Group>
    <Form.Group className="price">
        <Form.Label className="all-labels">Price</Form.Label><br/>
        <Form.Text >${price}</Form.Text><br/>
    </Form.Group>
    </section>

    <section className="tickets-container">
    <Form.Label className="ticket-label all-labels">Tickets</Form.Label><br/>
    <section className="add-tickets">
        <Button variant="secondary" onClick={decreaseTickets}>-</Button>
        <Form.Control className="ticket-number" readOnly value={numTickets}/>
        <Button variant="secondary" onClick={increaseTickets}>+</Button><br/>
    </section>
    </section>

    <section className="nav-buttons">
    <Link to={`/tours/${param.id}`}>
        <Button variant="secondary" type="submit" className="go-back-btn">Go Back</Button>
    </Link> 
    <Link to={{
    pathname: "/confirmation",
    state: {bookingData}}}>
    <Button className="review-btn" variant="secondary" type="submit">Review</Button>
    </Link>
    
    </section>
</Form>


    )


}

export default BookingForm;