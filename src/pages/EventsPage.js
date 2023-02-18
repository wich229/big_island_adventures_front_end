import { useState, useEffect } from "react";
import "../App.css";
import "./EventsPage.css";
import { Button } from "react-bootstrap";
import EventsList from "../components/EventsList";
import Weather from "../components/Weather";
import SecNav from "../components/SecNav";
import axios from "axios";
import FilterCheckboxes from "../components/FilterCheckboxes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//--------------------- EVENT API CALL ---------------------------------------
const kBaseUrl = process.env.REACT_APP_BACKEND_URL;
const page = "tours";

// Weather -------------------------------------------------------------------
// can use eather to return the event suggestion:
// # Headline.Severity	=> Severity of the headline, displayed as an integer. The lower the number, the greater the severity. 0 = Unknown 1 = Significant 2 = Major 3 = Moderate 4 = Minor 5 = Minimal 6 = Insignificant 7 = Informational
// # DailyForecasts.Day.HasPrecipitation => bool
//--------------------- Weather API CALL -------------------------------------
const k2BaseUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/5day";
const WEATHER_API_KEY = process.env.REACT_APP_ACCUWEATHER_API_KEY;
const LOCATION_KEYS = {
  Hamakua: 2203629,
  Hilo: 328444,
  Puna: 2203855,
  Kona: 337832,
  Kohala: 2203770,
};

// get 5 days forecasts data
const getAllForecastData = (locationName) => {
  return axios
    .get(
      `${k2BaseUrl}/${LOCATION_KEYS[locationName]}?apikey=${WEATHER_API_KEY}`
    )
    .then((response) => {
      const organized_data = response.data.DailyForecasts.map((dailyData) => {
        return {
          date: dailyData.Date,
          tempMin: dailyData.Temperature.Minimum.Value,
          tempMax: dailyData.Temperature.Maximum.Value,
          dayIcon: dailyData.Day.Icon,
          dayIconPhrase: dailyData.Day.IconPhrase,
          dayHasPrecipitation: dailyData.Day.HasPrecipitation,
        };
      });
      return organized_data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const EventsPage = () => {
  // menu options
  const filterMenuOptions = {
    Category: ["Sports", "Sightseeing", "Educational"],
    Location: ["Hilo", "Kona", "Hakalau"],
    Type: ["Indoor", "Outdoor"],
  };

  // states lifting:
  // state data: date / tour type / category / location / guests number /
  const [startDate, setStartDate] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [tours, setTours] = useState([]);
  const [filters, setFilters] = useState({});

  // react-router-loader: events info
  // --------------------------------------------------------------------------
  // ----------------------------- filter -------------------------------------
  // --------------------------------------------------------------------------
  // transforms date to format we need in order to query
  const transformDate = (dateOption) => {
    if (dateOption !== null) {
      const month = (dateOption.getMonth() + 1).toString();
      const date = dateOption.getDate().toString();
      const year = dateOption.getFullYear().toString();
      const formattedDate = month + "/" + date + "/" + year;
      return formattedDate;
    } else {
      return dateOption;
    }
  };

  // transforms the filter request to make queries
  const transformFilterRequest = (filters) => {
    let request = [];
    for (const [key, value] of Object.entries(filters)) {
      for (const i of value) {
        if (key === "Type") {
          if (i === "Indoor") {
            request.push(`is_outdoor=false`);
          }
          if (i === "Outdoor") {
            request.push(`is_outdoor=true`);
          }
        }

        if (key === "Location") {
          request.push(`city=${i}`);
        }
        if (key === "Category") {
          console.log("Category" + i);
          request.push(`category=${i}`);
        }
      }
      if (key === "date") {
        request.push(`date=${value}`);
        console.log(request);
      }
    }
    const requestMessage = request.join("&");
    console.log(requestMessage);
    return requestMessage;
  };

  // ----------- getting data before rendering -------------------------
  useEffect(() => {
    getAllForecastData("Hamakua")
      .then((dailyForecast) => {
        // console.log(dailyForecast);
        setForecast(dailyForecast);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getAllTours = () => {
    axios
      .get(`${kBaseUrl}/tours`)
      .then((response) => {
        setTours(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShowAll = () => {
    setStartDate(null);
    setFilters({});
    getAllTours();
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setFilters({ date: transformDate(date) });
  };

  useEffect(() => {
    getAllTours();
  }, []);

  useEffect(() => {
    console.log("category in use effect" + Object.entries(filters));
    axios
      .get(`${kBaseUrl}/tours?${transformFilterRequest(filters)}`)
      .then((response) => {
        console.log("tours:" + response.data);
        setTours(response.data);
        console.log("response data" + Object.entries(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filters]);

  return (
    <main className="main-events">
      <section>
        <SecNav page={page} />
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
            onChange={(date) => handleDateChange(date)}
          />
        </section>

        <section className="weather-section">
          <Weather
            forecast={forecast}
            getAllForecastData={getAllForecastData}
            setForecast={setForecast}
          />
        </section>
      </section>

      <section className="query-choices">
        <section>
          <Button
            className="show-all-btn"
            onClick={handleShowAll}
            variant="secondary"
          >
            Show All
          </Button>
        </section>
        <FilterCheckboxes
          className="filter-checkbox"
          filterOptions={filterMenuOptions}
          selectedFilters={filters}
          setSelectedFilters={setFilters}
        />
      </section>

      <section className="event-card-container">
        <EventsList tours={tours} />
      </section>
    </main>
  );
};

export default EventsPage;
