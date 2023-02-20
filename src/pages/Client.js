import "../App.css";
import SecNav from "../components/SecNav";
import "./Client.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import LogInCard from "../components/LogInCard";
import SignUpCard from "../components/SignUpCard";
import axios from "axios";

const kBaseUrl = process.env.REACT_APP_BACKEND_URL;

const Client = () => {
  const param = useParams();
  const page = "client";
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  };

  // --------STATE------
  const [numTickets, setNumTickets] = useState(1);
  const [tour, setTourState] = useState({});
  const [price, setPrice] = useState(0);
  const [bookingData, setBookingData] = useState({});
  const [loginFields, setLoginFields] = useState({
    email: "",
    password: "",
  });
  const [signupFields, setSignupFields] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const date = new Date(tour.time);
  const formattedDate = date.toLocaleString("en-US", options);

  useEffect(() => {
    axios
      .get(`${kBaseUrl}/tours/${param.id}`)
      .then((response) => {
        setTourState(response.data);
        setPrice(response.data.price);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [param.id]);

  return (
    <main>
      <section>
        <SecNav page={page} />
      </section>
      <section className="client-page-container">
        <LogInCard loginFields={loginFields} setLoginFields={setLoginFields} />
        <SignUpCard
          signupFields={signupFields}
          setSignupFields={setSignupFields}
        />
        <section>
          <BookingForm
            tour={tour}
            formattedDate={formattedDate}
            param={param}
            numTickets={numTickets}
            setNumTickets={setNumTickets}
            price={price}
            setPrice={setPrice}
            bookingData={bookingData}
            setBookingData={setBookingData}
          ></BookingForm>
        </section>
      </section>
    </main>
  );
};

export default Client;
