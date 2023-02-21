import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SecNav from "../components/SecNav";
import "./Dashboard.css";
import { Button, Table } from "react-bootstrap";
import helpers from "../Helpers";
import * as constants from '../Constants';


const page = "dashboard";
const user = JSON.parse(localStorage.getItem("user"));
const booking = JSON.parse(localStorage.getItem("booking"));

//--------------------- BOOKING API CALL --------------------------------
const getBookingByid = (user_id) => {
  return axios
    .get(`${constants.kBaseUrl}/bookings/${user_id}/transctions`)
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
    .get(`${constants.kBaseUrl}/tours/${tour_id}`)
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
  const [tour_ids, setTour_ids] = useState([]);

  //loading user booking data
  useEffect(() => {
    console.log("user.id: " + user.id);
    getBookingByid(user.id)
      .then((bookingData) => {
        console.log(bookingData);
        const bmap = bookingData.map((eachBooking) => {
          return eachBooking;
        })
        setBooking( [...bmap] 
        );
        console.log("booking" + [...booking])
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // organize the tour_id
  useEffect(() => {
    getBookingByid(user.id)
      .then((bookingData) => {
        setTour_ids(
          bookingData.map((data) => {
            return data.tour_id;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //loading tour data and combin with booking
  useEffect(() => {
    const tourDataArr = tour_ids.map((id) => getTourByid(id));
    Promise.all(tourDataArr).then((datas) => {
      console.log(datas);
      setBooking(
        datas.map((data, i) => {
          const combinData = { ...booking[i], ...data };
          console.log("combinData");
          console.log(combinData);
          return combinData;
        })
      );
    });
  }, []);

  // console.log("final");
  // console.log(booking);

  const printOutDatas = booking.map((data) => {
    return (
      <tr key={data.id}>
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
