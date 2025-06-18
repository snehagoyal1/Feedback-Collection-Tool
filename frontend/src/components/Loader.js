import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-top-bar">
      <div className="loader-small"></div>
      <span className="loader-text">
        Please Wait...
      </span>
    </div>
  );
};

export default Loader;