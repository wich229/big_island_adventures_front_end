import '../App.css';
import SecNav from '../components/SecNav';
const page = "client";

const Client = () => {
    return(
    <main>
        <section>
                <SecNav page={page}/>
        </section>

    </main>
    )
}

export default Client;