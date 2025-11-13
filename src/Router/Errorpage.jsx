import React from "react";
import logo from "../assets/Error.jpg";
import { Link } from "react-router";
import { IoArrowBackOutline } from "react-icons/io5";

const Errorpage = () => {
  return (
    <div>
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

    <div className="flex mb-10 items-center justify-center">
      <Link to="/" className="btn btn-primary mt-4">
        <IoArrowBackOutline />Back to Home
      </Link>
    </div>
    </div>
  );
};

export default Errorpage;
