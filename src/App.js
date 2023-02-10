import React from "react";
import TopNav from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <TopNav />
      </Router>
    </div>
  );
}

export default App;
