import dayjs from "dayjs";
import React, { useState, useEffect } from "react";

const Topbar = () => {
  const [CurrentTime, setCurrentTime] = useState("");
  const [CurrentDate, setCurrentDate] = useState("");
  

  useEffect(() => {
    setInterval(() => {
      setCurrentDate(dayjs().format("dddd,MMMM D YYYY"))
      setCurrentTime(dayjs().format("h:mm:ss A"));
    });
  }, []);

  return (
    <header className="bg-dark py-1">
      <div className="container">
        <div className="row">
          <div className="col text-start">
            <p className="mb-0 text-white">{CurrentDate}</p>
          </div>
          <div className="col text-end">
            <p className="mb-0 text-white">{CurrentTime}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
