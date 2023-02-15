import { useState, useEffect } from "react"; 
import '../App.css'
import './EventsPage.css'
import EventsList from '../components/EventsList'
import Calendar from '../components/Calendar';
import Weather from '../components/Weather';
import SecNav from "../components/SecNav";
import SortButton from "../components/SortButton";
import axios from 'axios';
import FilterCheckboxes from "../components/FilterCheckboxes";
  
const kBaseUrl = process.env.REACT_APP_BACKEND_URL
const page = "tours";

const EventsPage = () => {
  const filterMenuOptions = {
    Category: ["Water Sports", "Educational", "Sightseeing"],
    Location: ["Hilo", "Kailua-Kona", "Volcano", "Waimea"],
    Type: ["Indoor", "Outdoor"]
};
// ----------------STATE---------------
  const [tours, setTours] = useState([]);
  const [filters, setFilters] = useState({})
  console.log(`tours in eventspage: ${tours}`)

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

  useEffect(() => {
    axios
      .get(`${kBaseUrl}/tours?${filters}`)
      .then((response) => {
        console.log(`filters in eventspage: ${filters}`)
        console.log(`response data in events page: ${[...response.data]}`)
        setTours(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filters]);


  console.log(`events page: ${filters}`)



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
      <FilterCheckboxes 
        filterOptions={filterMenuOptions}
        selectedFilters={filters}
        setSelectedFilters={setFilters}/>
      <SortButton/>
    </section>

    <section className="event-card-container">
      <EventsList tours={tours}/>
    </section>
    </main>

  );
};

export default EventsPage;
