import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, CardGroup, Col, Row } from "react-bootstrap";
import "../App.css";
import "./EventsPage.css";
import EventCard from "../components/EventCard";
import Calendar from "../components/Calendar";
import Weather from "../components/Weather";
import SecNav from "../components/SecNav";
import FilterDropdown from "../components/FilterDropdown";
import SortButton from "../components/SortButton";

// Weather -------------------------------------------------------------------
// can use eather to return the event suggestion:
// # Headline.Severity	=> Severity of the headline, displayed as an integer. The lower the number, the greater the severity. 0 = Unknown 1 = Significant 2 = Major 3 = Moderate 4 = Minor 5 = Minimal 6 = Insignificant 7 = Informational
// # DailyForecasts.Day.HasPrecipitation => bool

//--------------------- Weather API CALL -------------------------------------
const kBaseUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/5day";
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
    .get(`${kBaseUrl}/${LOCATION_KEYS[locationName]}?apikey=${WEATHER_API_KEY}`)
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
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

const EventsPage = () => {
  // states lifting:
  // state data: date / tour type / category / location / guests number /
  const [startDate, setStartDate] = useState(new Date());
  const [forecast, setForecast] = useState([]);

  // react-router-loader: events info

  //----------- getting weater data before rendering --------------------
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

  return (
    <main className="main-events">
      <section>
        <SecNav />
      </section>

      <Row>
        <Calendar
          label="Choose by date"
          date={startDate}
          setStartDate={setStartDate}
        />
      </Row>

      <Row className="weather-section">
        <Weather
          forecast={forecast}
          getAllForecastData={getAllForecastData}
          setForecast={setForecast}
        />
      </Row>

      <section className="query-choices">
        <FilterDropdown />
        <SortButton />
      </section>

      <section className="event-card-container">
        <Container className="me-auto">
          <CardGroup className="card-group">
            <Col>
              <Link to="/event-info">
                <EventCard />
              </Link>
            </Col>
            <Col>
              <Link to="/event-info">
                <EventCard />
              </Link>
            </Col>
            <Col>
              <Link to="/event-info">
                <EventCard />
              </Link>
            </Col>
            <Col>
              <Link to="/event-info">
                <EventCard />
              </Link>
            </Col>
            <Col>
              <Link to="/event-info">
                <EventCard />
              </Link>
            </Col>
          </CardGroup>
        </Container>
      </section>
    </main>
  );
};

export default EventsPage;
