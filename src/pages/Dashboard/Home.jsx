import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container pt-5">
      <div className="row pt-5">
        <div className="col d-flex flex-column">
          <h2 className="text-center fw-bolder">DASHBOARD</h2>
          <hr className="w-25 align-self-center" />
        </div>
      </div>
      <div className="row pt-5">
        <div className="col">
            <div className="row">
              <div className="col">
                <div className="d-flex justify-content-around align-items-center">
                <Link to="/" className="texr-center text btn btn-outline-primary btn-1 px-4 py-2">Home</Link>
                <Link to="/todos" className="texr-center text btn btn-outline-primary btn-1 px-4 py-2">Todos</Link>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
