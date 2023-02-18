import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import SecNav from "../components/SecNav";
import { Card, Button, Table } from "react-bootstrap";
const kBaseUrl = process.env.REACT_APP_BACKEND_URL;
const page = "confirm";

const Dashboard = () => {
  return (
    <main>
      <section>
        <SecNav page={page} />
      </section>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th colSpan={4}>Customer info</th>
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
              {" "}
              <Link to="/">
                <Button variant="secondary" className="go-back-btn">
                  Go Back
                </Button>
              </Link>
            </th>
          </tr>
        </tbody>
      </Table>
    </main>
  );
};

export default Dashboard;
