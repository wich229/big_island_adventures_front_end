import { useState, useEffect } from "react"; 
import '../App.css'
import './EventsPage.css'
import EventsList from '../components/EventsList'
import Calendar from '../components/Calendar';
import Weather from '../components/Weather';
import SecNav from "../components/SecNav";
import FilterDropdown from "../components/FilterDropdown";
import SortButton from "../components/SortButton";
import { Col, Container, Dropdown, ListGroup, Row } from "react-bootstrap";
import axios from 'axios';

const filterMenuOptions = [{
  Category: ["Water Sports", "Educational", "Sightseeing"]},
  {Location: ["Hilo", "Kailua-Kona", "Volcano", "Waimea"]},
  {Type: ["Indoor", "Outdoor"]}
];   
const kBaseUrl = process.env.REACT_APP_BACKEND_URL
const page = "tours";

const EventsPage = () => {
  
// ----------------STATE---------------
  const [tours, setTours] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    axios.get(`${kBaseUrl}/tours?filter=${filters.join(',')}`)
      .then(response => {
        setTours(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [filters]);

  useEffect(() => {
    axios
      .get(`${kBaseUrl}/tours`)
      .then((response) => {
        setTours(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    const filter = e.target.value;
    if (e.target.checked) {
      setFilters([...filters, filter]);
    } else {
      setFilters(filters.filter(item => item !== filter));
    }
  };


    
  
      
/*       
      <form action="/action_page.php">
  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
  <label for="vehicle1"> I have a bike</label><br/>
  <input type="checkbox" id="vehicle2" name="vehicle2" value="Car"/>
  <label for="vehicle2"> I have a car</label><br/>
  <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat"/>
  <label for="vehicle3"> I have a boat</label><br/><br/>
  <input type="submit" value="Submit"/>
</form> */


  return (
  <main className="main-events">
    <section>
    <SecNav page={page}/>
    </section>

    <section className="weather-calendar-container">
      <section>
        <Calendar label="Select Tour by Date"/>
      </section>

      <section>
        <Weather/>
      </section>
    </section>

    <section className="query-choices">
      <FilterDropdown/>
      <SortButton/>
    </section>

    <section className="event-card-container">
      <EventsList tours={tours}/>
    </section>
    </main>

  );
};

export default EventsPage;
