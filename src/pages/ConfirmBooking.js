import '../App.css';
import SecNav from '../components/SecNav';
const page = "confirm";
const user = JSON.parse(localStorage.getItem('user'));
const ConfirmBooking = () => {
    return(
        <main>
            <section>
                <SecNav page={page}/>
            </section>
            <h1>Welcome, {user.id}!</h1>
        </main>
        )
}

export default ConfirmBooking;