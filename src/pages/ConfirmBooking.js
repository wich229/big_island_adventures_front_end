import '../App.css';
import SecNav from '../components/SecNav';
const page = "confirm";

const ConfirmBooking = () => {
    return(
        <main>
            <section>
                <SecNav page={page}/>
            </section>
        </main>
        )
}

export default ConfirmBooking;