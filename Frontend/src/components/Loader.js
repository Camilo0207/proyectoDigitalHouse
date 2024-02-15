import React from "react";
import "../styles/Loader.css";

const Loader = () => {
  
  return (
    <div className="container_loader">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
