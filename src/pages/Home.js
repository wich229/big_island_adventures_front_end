import React from "react";
import { Link } from "react-router-dom";
import '../App.css'
import Button from "react-bootstrap/Button";

const Home = () => (
  <main>
    <h1 className="home-title">This is the Home Page</h1>
    <section className="image-with-bookingButton">
      <Link to="/events">
        <Button variant="secondary" size="lg">
          Booking Now
        </Button>
      </Link>
    </section>

    <section className="home-body">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque dolorum
        aperiam quasi voluptates rem cupiditate animi natus porro perspiciatis?
        Sint vero tempora, sed nobis quos nemo molestiae sit quidem incidunt?
      </p>
    </section>
  </main>
);

export default Home;
