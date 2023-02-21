import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SecNav from "../components/SecNav";
import "./Dashboard.css";
import { Button, Table } from "react-bootstrap";

const kBaseUrl = process.env.REACT_APP_BACKEND_URL;
const page = "dashboard";
const user = JSON.parse(localStorage.getItem("user"));

//--------------------- BOOKING API CALL --------------------------------
const getBookingByid = (user_id) => {
  return axios
    .get(`${kBaseUrl}/bookings/${user_id}/transctions`)
    .then((response) => {
      const bookingData = response.data.map((data) => {
        return {
          // date: data.booking_date,
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

//--------------------- TOUR API CALL -----------------------------------
const getTourByid = (tour_id) => {
  return axios
    .get(`${kBaseUrl}/tours/${tour_id}`)
    .then((response) => {
      return {
        id: response.data["id"],
        name: response.data["name"],
        city: response.data["city"],
        price: response.data["price"],
        time: response.data["time"],
        date: response.data["date"],
      };
    })
    .catch((error) => {
      console.log(error);
    });
};

const Dashboard = () => {
  const [booking, setBooking] = useState([]);
  const [tour, setTour] = useState([]);

  useEffect(() => {
    getBookingByid(user.id)
      .then((bookingData) => {
        setBooking(
          bookingData.map((data) => {
            return data;
          })
        );
        console.log(booking);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tourIdArr = booking.map((data) => {
    return data.tour_id;
  });

  useEffect(() => {
    console.log("here");
    const tourDataArr = tourIdArr.map((id) => getTourByid(id));
    Promise.all(tourDataArr).then((datas) => {
      setTour(
        datas.map((eachData) => {
          return eachData;
        })
      );
      console.log(tour);
    });
  }, []);

  const combinningData = (booking, tour) => {
    const result = [];
    for (let i = 0; i < booking.length; ++i) {
      let tmp = { ...booking[i], ...tour[i] };
      result.push(tmp);
    }
    return result;
  };

  console.log(combinningData(booking, tour));

  const result = combinningData(booking, tour).map((data) => {
    return (
      <tr>
        <td>{data.name}</td>
        <td>{data.date}</td>
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
              <td>totla price</td>
              <td>status</td>
            </tr>
            {result}
            {/* <tr>
              <td>data</td>
              <td>data</td>
              <td>data</td>
              <td>data</td>
              <td>data</td>
            </tr> */}
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
