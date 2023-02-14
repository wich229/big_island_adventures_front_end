import React from "react";
import { Link } from "react-router-dom";
import '../App.css'
import './Home.css'
import Button from "react-bootstrap/Button";
import bg from "../images/pexels-photo-416676.jpeg"

const Home = () => (
  <main>
    <article className="image-with-bookingButton text-center">
    <img className="home-image" src={bg} alt="surfer riding a huge wave"/>
    <h1 className="home-title mb-5 mt-5">Are you ready for a Big Island Adventure?
    <Link to="/events">
      <Button className="book-now-button" variant="secondary">
        Book Now!
      </Button>
    </Link>
    </h1>
    </article>
  </main>
);

export default Home;
