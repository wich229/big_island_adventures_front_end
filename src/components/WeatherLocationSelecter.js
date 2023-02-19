import React from "react";
import { Form } from "react-bootstrap";

const WeatherLocationSelecter = ({ setweatherLocation }) => {
  return (
    <Form.Group controlId="LocationSelect">
      <Form.Select
        as="select"
        //   value={formData}
        placeholder="Select location"
        onChange={(e) => {
          console.log("e.target.value", e.target.value);
          setweatherLocation(e.target.value);
        }}
      >
        <option value="Hamakua">Select location</option>
        <option value="Hamakua">Hamakua</option>
        <option value="Hilo">Hilo</option>
        <option value="Puna">Puna</option>
        <option value="Kona">Kona</option>
        <option value="Kohala">Kohala</option>
      </Form.Select>
    </Form.Group>
  );
};

export default WeatherLocationSelecter;
