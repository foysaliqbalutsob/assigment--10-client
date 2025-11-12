import React from "react";
import logo from "../assets/logo.jpg";

const Errorpage = () => {
  return (
    <div>
      <div className="flex justify-center items-center">
        <img className="h-[50vh] rounded-full" src={logo} alt="" />
      </div>
      <div>
        <h2 className="text-center text-4xl font-bold text-red-600">
          404 Not Found
        </h2>
      </div>
    </div>
  );
};

export default Errorpage;
