import React from "react";

const About = () => {
  return (
    <div className="container about-container d-flex justify-content-center align-items-center">
      <div className="row d-fex justify-content-center align-items-center">
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-start flex-column">
          <h2>About Me</h2>
          <hr className="w-25 fw-bold" />
          <h3>Nafees Ur Rehman</h3>
          <p>I am a web developer.</p>
          <p>
            I made this beautiful todo app using bootstrap, scss, react.js,
            firebase.
          </p>
        </div>
        <div className="col-12 col-md-6">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/about-us-1805547-1537820.png"
            className="img-fluid"
            alt="about image"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
