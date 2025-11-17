import React from "react";
import error from '/error.jpg'

const Error = () => {
  return (
    <div>
      <h1>Error</h1>
      <div>
        <img src={error} alt="" />
      </div>
    </div>
  );
};

export default Error;
