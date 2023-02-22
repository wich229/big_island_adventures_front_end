import "../App.css";
import SecNav from "../components/SecNav";
import "./Client.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import LogInCard from "../components/LogInCard";
// import SignUpCard from "../components/SignUpCard";
import axios from "axios";
import * as constants from '../Constants';

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
  const [tour, setTourState] = useState({});
  const [price, setPrice] = useState(0);
  const [bookingData, setBookingData] = useState({});
  const [loginFields, setLoginFields] = useState({
    email: "",
    password: "",
  });
  // if isLogin is true procress to the booking
  // if isLogin is false showing the LogInCard (add <a> link to the SignUpCard)
  const [isLogin, setIsLogin] = useState(false);
  const date = new Date(tour.time);
  const formattedDate = date.toLocaleString("en-US", options);

  useEffect(() => {
    axios
      .get(`${constants.kBaseUrl}/tours/${param.id}`)
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
        {!isLogin && (
          <LogInCard
            page={page}
            setIsLogin={setIsLogin}
            loginFields={loginFields}
            setLoginFields={setLoginFields}
          />
        )}
        {/* <SignUpCard
          signupFields={signupFields}
          setSignupFields={setSignupFields}
        /> */}
        <section>
          <BookingForm
            tour={tour}
            formattedDate={formattedDate}
            param={param}
            price={price}
            setPrice={setPrice}
            bookingData={bookingData}
            setBookingData={setBookingData}
            setIsLogin={setIsLogin}
          ></BookingForm>
        </section>
      </section>
    </main>
  );
};

export default Client;
