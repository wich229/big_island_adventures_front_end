import { useState, useEffect } from "react"; 
import '../App.css'
import './EventsPage.css'
import { Button } from "react-bootstrap";
import EventsList from '../components/EventsList'
import Weather from '../components/Weather';
import SecNav from "../components/SecNav";
import axios from 'axios';
import FilterCheckboxes from "../components/FilterCheckboxes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
  // constants
const kBaseUrl = process.env.REACT_APP_BACKEND_URL
const page = "tours";

  // menu options
  const filterMenuOptions = {
    Category: ["Sports", "Sightseeing", "Educational"],
    Location: ["Hilo", "Kona", "Hakalau"],
    Type: ["Indoor", "Outdoor"]
};
const EventsPage = () => {

// --------HELPER FUNCTIONS----------
// transforms date to format we need in order to query
  const transformDate = (dateOption) => {
    if (dateOption !== null){
      const month = (dateOption.getMonth() + 1).toString();
      const date = dateOption.getDate().toString();
      const year = dateOption.getFullYear().toString();
      const formattedDate =  month + '/' + date + '/' + year; 
      return (formattedDate)}
    else{
      return dateOption
    }
  }

  // transforms the filter request to make queries
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
        if (key === "Category"){
          console.log("Category" + i)
          request.push(`category=${i}`)
        }
        }
        if (key === "date"){
          request.push(`date=${value}`)
          console.log(request)
      }}
    const requestMessage = request.join('&')
    console.log(requestMessage)
    return requestMessage;
  }

// ----------------STATE---------------
  const [tours, setTours] = useState([]);
  const [filters, setFilters] = useState({});
  const [startDate, setStartDate] = useState(null);


  //api calls and useeffect
  const getAllTours = () => {
    axios
    .get(`${kBaseUrl}/tours`)
    .then((response) => {
      setTours(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    getAllTours();
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


  // event handlers
  const handleShowAll = () => {
      setStartDate(null)
      setFilters({});
      getAllTours();
    }
  
  const handleDateChange = (date) => {
    setStartDate(date)
    setFilters({"date":transformDate(date)})
  }

  
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
            onChange={(date) => handleDateChange(date)}/>
        </section> 
      <section>
        <Weather/>
      </section>
    </section>

    <section className="query-choices">
      <section>
        <Button className="show-all-btn" onClick={handleShowAll} variant="secondary">Show All</Button>
      </section>
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
