import React, { useContext } from "react";
import { Link, NavLink } from "react-router";

import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import logo from "../assets/logo.jpg";
import { CgProfile } from "react-icons/cg";
import { ScaleLoader } from "react-spinners";
import profile from "../assets/istockphoto-1495088043-612x612.jpg";
import MyLink from "./MyLink";

const NavBar = () => {
  const { user, setUser, signOutFunc, loading } = useContext(AuthContext);
  // console.log(user, loading);

  const handleLogOut = () => {
    signOutFunc()
      .then(() => {
        toast("Logged out successfully!");
        setUser(null);
      })
      .catch((error) => {
        toast(error.message);
      });
  };
  const links = (
    <>
      <li>
        <MyLink to={"/home"}>Home</MyLink>
      </li>

      <li>
        <MyLink to={"/models/Latest-updates"}>Latest Products</MyLink>
      </li>

      <li>
        <MyLink to={"/AddModel"}>Add Model </MyLink>
      </li>
      <li>
        <MyLink to={"/myModels"}>My Model </MyLink>
      </li>
      <li>
        <MyLink to={"/MyContribution"}>My Contribution </MyLink>
      </li>

      <li>
        <MyLink to={"/myProfile"}>My profile</MyLink>
      </li>

       
    </>
  );

  return (
    <div className="bg-yellow-400">
      <div className="navbar  shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>

          <div className="flex lg:justify-center items-center gap-5 ml-4">
            <div className="hidden  justify-center  lg:flex">
              <img src={logo} className="h-15 rounded-full" alt="" />
              <Link to={"/"} className="btn btn-ghost text-xl ">
                <span className="text-orange-600">Pet</span>
                <span className="text-brown-700 font-bold">Warm</span>

                <span className="text-purple-600 font-extrabold italic">
                  WOW
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {loading ? (
            <ScaleLoader />
          ) : user ? (
            <div className="flex ">
              <div className="relative group">
                <img
                  src={user?.photoURL || profile}
                  alt=""
                  className="h-10 w-10 mr-4 rounded-full border-2 border-purple-500 cursor-pointer"
                />

                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 
               bg-gray-800 text-white text-sm px-3 py-2 rounded-md 
               opacity-0 group-hover:opacity-100 transition-opacity duration-200
               text-center z-10"
                >
                  <p className="font-semibold">{user.displayName || "User"}</p>
                  <p className="text-gray-300 text-xs">{user?.email}</p>
                </div>
              </div>

              <button onClick={handleLogOut} className="btn btn-outline btn-sm">
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex gap-5">
              <Link to="/signin" className="btn btn-outline btn-sm">
                Sign In
              </Link>
              <Link to="/signup" className="btn btn-outline btn-sm">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
