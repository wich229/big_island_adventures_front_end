import { useState, useEffect } from "react"; 
import '../App.css'
import './EventsPage.css'
import EventsList from '../components/EventsList'
import Weather from '../components/Weather';
import SecNav from "../components/SecNav";
import axios from 'axios';
import FilterCheckboxes from "../components/FilterCheckboxes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const kBaseUrl = process.env.REACT_APP_BACKEND_URL
const page = "tours";

const EventsPage = () => {
  const filterMenuOptions = {
    Category: ["Water Sports", "Educational", "Sightseeing"],
    Location: ["Hilo", "Kona", "Volcano", "Waimea", "Hamakua"],
    Type: ["Indoor", "Outdoor"]
};

const transformDate = (dateOption) => {
  if (dateOption !== ''){
    const month = (dateOption.getMonth() + 1).toString();
    const date = dateOption.getDate().toString();
    const year = dateOption.getFullYear().toString();
    const formattedDate = month + '/' + date + '/' + year; 
    return (formattedDate)}
  else{
    return dateOption
  }
}


const transformFilterRequest= (filters) =>{
  let request=[]

  for (const [key, value] of Object.entries(filters)){
    for (const i of value){
      if (key === "Type"){
        if (i === 'Indoor'){
          request.push(`is_outdoor=false`)
        }
        if(i === "Outdoor"){
          request.push(`is_outdoor=true`)
        }}
      if (key === "Location"){
        request.push(`city=${i}`)
      }
    
    else{
    request.push(`${key.toLowerCase()}=${i.toLowerCase()}`)
    }}
    
  }
  const requestMessage = request.join('&')
  return requestMessage;
}
// ----------------STATE---------------
  const [tours, setTours] = useState([]);
  const [filters, setFilters] = useState({});
  const [startDate, setStartDate] = useState('');

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
      .get(`${kBaseUrl}/tours?${transformFilterRequest(filters)}`)
      .then((response) => {
        setTours(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filters]);

  useEffect(() => {
    axios
      .get(`${kBaseUrl}/tours?date=${transformDate(startDate)}`)
      .then((response) => {
        console.log("tours:" + response.data)
        setTours(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [startDate]);

  return (
  <main className="main-events">
    <section>
    <SecNav page={page}/>
    </section>

    <section className="weather-calendar-container">
    <section className="calendar-container">
        <h3>Select Tour by Date</h3>
        <DatePicker 
            placeholderText="Click here to view calendar"
            variant="secondary"
            popperPlacement="auto"
            className="calendar" 
            selected={startDate} 
            onChange={(date) => setStartDate(date)}/>
        </section> 

      <section>
        <Weather/>
      </section>
    </section>

    <section className="query-choices">
      <FilterCheckboxes className="filter-checkbox"
        filterOptions={filterMenuOptions}
        selectedFilters={filters}
        setSelectedFilters={setFilters}/>
    </section>

    <section className="event-card-container">
      <EventsList tours={tours}/>
    </section>
    </main>

  );
};

export default EventsPage;
