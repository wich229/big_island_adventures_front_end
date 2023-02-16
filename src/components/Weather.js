import React from "react";
import moment from "moment";
import "./Weather.css";
import { Row, Card } from "react-bootstrap";

const Weather = (props) => {
  const getTempIconPhraseData = props.forecast.map((eachData, index) => {
    return (
      <Card key={index} className="eachDay">
        <Row className="day">{moment(eachData.date).format("ddd")}</Row>
        <Row className="date">{moment(eachData.date).format("MMM D")}</Row>
        <Row className="icon">
          <img
            src={`https://developer.accuweather.com/sites/default/files/${eachData.dayIcon}-s.png`}
          />
        </Row>
        <Row className="temps">
          {eachData.tempMin} / {eachData.tempMax}
        </Row>
        {/* <Row className="phrase">{eachData.dayIconPhrase}</Row> */}
      </Card>
    );
  });

  return <section className="weather-card">{getTempIconPhraseData}</section>;
};

export default Weather;
