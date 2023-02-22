import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SecNav from "../components/SecNav";
import "./Dashboard.css";
import { Button, Table } from "react-bootstrap";
// import helpers from "../Helpers";
import * as constants from "../Constants";

const page = "dashboard";
const user = JSON.parse(localStorage.getItem("user"));

//--------------------- BOOKING API CALL --------------------------------
const getBookingByid = (user_id) => {
  return axios
    .get(`${constants.kBaseUrl}/bookings/${user_id}/transctions`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const Dashboard = () => {
  const [booking, setBooking] = useState([]);

  //loading user booking data
  useEffect(() => {
    console.log("user.id: " + user.id);
    getBookingByid(user.id)
      .then((bookingData) => {
        console.log(bookingData);
        setBooking(
          bookingData.map((data) => {
            return {
              booking_id: data.id,
              booking_date: data.booking_date,
              status: data.status,
              tickets: data.tickets,
              event_name: data.tour.name,
              event_date: data.tour.date,
              price: data.tour.price,
              time: data.tour.time,
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log("here end");
  console.log(booking);

  const printOutDatas = booking.map((data) => {
    return (
      <tr key={data.booking_id}>
        <td>{data.event_name}</td>
        <td>{data.event_date}</td>
        <td>{data.tickets}</td>
        <td>{data.price * data.tickets}</td>
        <td>{data.status}</td>
      </tr>
    );
  });

  return (
    <main>
      <section>
        <SecNav page={page} />
      </section>
      <section className="info-table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan={5}>
                <ol>
                  <li>Name: {user.name}</li>
                  <li>Email: {user.email}</li>
                </ol>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>event name</td>
              <td>date</td>
              <td>tickets number</td>
              <td>total price</td>
              <td>status</td>
            </tr>
            {printOutDatas}
            <tr>
              <th colSpan={5}>
                <Link to="/">
                  <Button variant="secondary" className="go-back-btn">
                    Go Back
                  </Button>
                </Link>
              </th>
            </tr>
          </tbody>
        </Table>
      </section>
    </main>
  );
};

export default Dashboard;
