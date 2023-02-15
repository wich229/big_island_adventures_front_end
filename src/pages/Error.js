import { useNavigate} from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();
    const tour_id = new URLSearchParams(window.location.search).get('id');


    if (tour_id) {
        navigate(`/tours/${tour_id}`);
        } 
        else {
            return (
                <main className="home-container">
                <h1>Error 404: Page not found</h1>
                </main>
            );
        }
    }


export default ErrorPage;