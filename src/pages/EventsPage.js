import { useState, useEffect } from "react";
import "../App.css";
import "./EventsPage.css";
import { Button } from "react-bootstrap";
import EventsList from "../components/EventsList";
import SuggestEventsList from "../components/SuggestEventsList";
import Weather from "../components/Weather";
import SecNav from "../components/SecNav";
import axios from "axios";
import FilterCheckboxes from "../components/FilterCheckboxes";
import DatePicker from "react-datepicker";
import WeatherLocationSelecter from "../components/WeatherLocationSelecter";
import "react-datepicker/dist/react-datepicker.css";
import * as constants from '../Constants';

//--------------------- TOURS API CALL ---------------------------------------
const page = "tours";

//--------------------- Weather API CALL -------------------------------------
const k2BaseUrl = "https://dataservice.accuweather.com/forecasts/v1/daily/5day";
// const WEATHER_API_KEY = process.env.REACT_APP_ACCUWEATHER_API_KEY;
const LOCATION_KEYS = {
  Hamakua: 2203629,
  Hilo: 328444,
  Puna: 2203855,
  Kona: 337832,
  Kohala: 2203770,
};

// get 5 days forecasts data
const getAllForecastData = (locationName) => {
  // console.log("WEATHER KEY : " + WEATHER_API_KEY);
  return axios
    .get(
      `${k2BaseUrl}/${LOCATION_KEYS[locationName]}?apikey=${constants.apiKey}`
      // `${k2BaseUrl}/315078?apikey=${WEATHER_API_KEY}` //Taipei's weather
    )
    .then((response) => {
      const organized_data = response.data.DailyForecasts.map((dailyData) => {
        return {
          date: dailyData.Date,
          tempMin: dailyData.Temperature.Minimum.Value,
          tempMax: dailyData.Temperature.Maximum.Value,
          dayIcon: ("0" + dailyData.Day.Icon).slice(-2),
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
    Location: ["Hamakua", "Hilo", "Puna", "Kona", "Hakalau"],
    Type: ["Indoor", "Outdoor"],
  };

  // states lifting:
  // state data: date / tour type / category / location / guests number /
  // react-router-loader: events info
  const [startDate, setStartDate] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [weatherLocation, setweatherLocation] = useState("Hamakua");
  const [tours, setTours] = useState([]);
  const [suggestTours, setsuggesTours] = useState([]);
  const [filters, setFilters] = useState({});

  //---------------------------------------------------------------------------
  // ----------------------------- wheather------------------------------------
  // --------------------------------------------------------------------------
  const givingSuggestionByWeather = (forecast) => {
    const allPrecipitationArr = forecast.map((eachday) => {
      return eachday.dayHasPrecipitation;
    });
    console.log(allPrecipitationArr);
    const result =
      allPrecipitationArr.filter((i) => !!i).length >=
      allPrecipitationArr.length / 2;
    console.log(result);
    const suggestion = result ? "is_outdoor=false" : "is_outdoor=true";
    console.log(suggestion);
    return suggestion;
  };
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

  const getAllTours = () => {
    axios
      .get(`${constants.kBaseUrl}/tours`)
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

  // ----------- getting data before rendering -------------------------
  useEffect(() => {
    getAllForecastData(weatherLocation)
      .then((dailyForecast) => {
        setForecast(dailyForecast);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [weatherLocation]);

  useEffect(() => {
    axios
      .get(
        `${constants.kBaseUrl}/tours?city=${weatherLocation}&${givingSuggestionByWeather(
          forecast
        )}`
      )
      .then((response) => {
        // console.log("tours:" + response.data);
        setsuggesTours(response.data);
        // console.log("response data" + Object.entries(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [forecast]);

  useEffect(() => {
    getAllTours();
  }, []);

  useEffect(() => {
    axios
      .get(`${constants.kBaseUrl}/tours?${transformFilterRequest(filters)}`)
      .then((response) => {
        setTours(response.data);
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
        <section className="weather-section">
          <section className="weather-location">
            <div>
              <h4>Get tour suggestions based on weather</h4>
              <WeatherLocationSelecter
                weatherLocation={weatherLocation}
                setweatherLocation={setweatherLocation}
              />
            </div>
          </section>
          <Weather
            forecast={forecast}
            getAllForecastData={getAllForecastData}
            setForecast={setForecast}
          />
          <section className="event-card-container-by-weather">
            <SuggestEventsList suggestTours={suggestTours} />
          </section>
        </section>
      </section>

      <section className="query-choices">
      <section className="calendar-container">
          <DatePicker
            placeholderText="Choose by date"
            variant="secondary"
            popperPlacement="bottom"
            className="calendar"
            selected={startDate}
            onChange={(date) => handleDateChange(date)}
          />
        </section>
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
