import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SecNav from "../components/SecNav";
import "./Dashboard.css";
import { Button, Table } from "react-bootstrap";

const kBaseUrl = process.env.REACT_APP_BACKEND_URL;
const page = "dashboard";

//--------------------- BOOKING API CALL --------------------------------
const getBookingByid = (user_id) => {
  return axios
    .get(`${kBaseUrl}/bookings/1/transctions`)
    .then((response) => {
      const bookingData = response.data.map((data) => {
        return {
          date: data.booking_date,
          customer_id: data.customer_id,
          tour_id: data.tour_id,
          status: data.status,
          tickets: data.tickets,
        };
      });
      return bookingData;
    })
    .catch((error) => {
      console.log(error);
    });
};

//--------------------- USER API CALL -----------------------------------
const getUserByid = (user_id) => {
  return axios
    .post(`${kBaseUrl}/customers/@user`, user_id)
    .then((response) => {
      console.log(response.data);
      //window.confirm("Login Successful");
    })
    .catch((error) => {
      console.log(error);
    });
};

//--------------------- TOUR API CALL -----------------------------------

const Dashboard = () => {
  const [booking, setBooking] = useState([]);
  const [tour, setTour] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    // getBookingByid(1)
    //   .then((bookingData) => {
    //     console.log(bookingData);
    //     setBooking(bookingData);
    //     console.log(booking);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    getUserByid({ id: 1 })
      .then((userData) => {
        // console.log(userData);
        setUser(userData);
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main>
      <section>
        <SecNav page={page} />
      </section>
      <section className="info-table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan={4}>
                <ol>
                  <li>Name:</li>
                  <li>Email:</li>
                </ol>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>event name</td>
              <td>date</td>
              <td>tickets number</td>
              <td>status</td>
            </tr>
            <tr>
              <td>data</td>
              <td>data</td>
              <td>data</td>
              <td>data</td>
            </tr>
            <tr>
              <th colSpan={4}>
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
