import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import "./Calendar.css";

const Calendar = (props) => {
  return (
    <section className="calendar-container">
      <h3>Choose by date</h3>
      <DatePicker
        variant="secondary"
        popperPlacement="auto"
        className="calendar"
        selected={props.date}
        onChange={(date) => props.setStartDate(date)}
      />
    </section>
  );
};

export default Calendar;
