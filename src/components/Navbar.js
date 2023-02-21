import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
// import logo1 from '../images/Big Island Adventures(4)(1).png'
import logo2 from "../images/Big Island Adventures(5)(1).png";
import "./Navbar.css";
const user = JSON.parse(localStorage.getItem('user'));


function TopNav() {
  const signedIn = () =>{
    if (user){
    return (
      <section> 
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
        Signed in as: <a href="#login">{user.name}</a>
      </Navbar.Text>
    </Navbar.Collapse>
    </section>    
    )
    }
    else{
      return (
        <section>
        <Link to="/about">
          <Button variant="outline-secondary">About</Button>
        </Link>{" "}

        <Link to="/signup">
          <Button variant="outline-secondary">Sign Up</Button>
        </Link>{" "}
        </section>
        )
    }
  }

  return (
    <header>
      <Navbar className="Nav">
        <Container className="navbar-container">
          <Link className="BIA-logo-link" to="/">
            <Navbar.Brand href="#home" className="BIA-logo-text">
              <img className="turtle-logo" src={logo2} alt="Turtle logo" />
            </Navbar.Brand> 
            </Link>
            <Navbar.Text className="header-links">
            {signedIn()}

          </Navbar.Text>
        </Container>
      </Navbar>
    </header>
  );
}

export default TopNav;
