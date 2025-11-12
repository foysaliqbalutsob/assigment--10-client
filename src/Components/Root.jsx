import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router";
import Footer from "./Footer";

const Root = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="max-w-7xl mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
