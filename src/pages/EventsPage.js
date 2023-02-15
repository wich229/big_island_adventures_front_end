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
    Location: ["Hilo", "Kona", "Volcano", "Waimea", "Hamakua"],
    Type: ["Indoor", "Outdoor"]
};

const transformFilterRequest= (filters) =>{
  let request=[]
  const categories = Object.keys(filters)
  console.log(categories)

  for (const [key, value] of Object.entries(filters)){
    console.log(`key: ${key}`)
    console.log(`value: ${value}`)
    console.log(typeof value)
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
  console.log(`request: ${requestMessage}`)
  return requestMessage;
}
// ----------------STATE---------------
  const [tours, setTours] = useState([]);
  const [filters, setFilters] = useState({})

  const print =(array)=>{
  array.forEach(function(entry) {
    console.log(entry);
  });
}
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
        print([filters])
        console.log(`filters in eventspage: ${filters}`)
        print([response.data])
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
      <FilterCheckboxes className="filter-checkbox"
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
