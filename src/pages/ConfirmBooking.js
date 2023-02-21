import '../App.css';
import SecNav from '../components/SecNav';
const page = "confirm";
const user = JSON.parse(localStorage.getItem('user'));
const booking = JSON.parse(localStorage.getItem('booking'));
const ConfirmBooking = () => {
    return(
        <main>
            <section>
                <SecNav page={page}/>
            </section>
            <h1>Welcome, {user.id}!</h1>
            <h2>Tickets: {booking.tickets}</h2>
            <h2>Bookings: {user.bookings[1]}</h2>
        </main>
        )
}

export default ConfirmBooking;