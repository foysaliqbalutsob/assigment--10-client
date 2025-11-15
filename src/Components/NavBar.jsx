import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import logo from "../assets/Gemini_Generated_Image_h5x2pyh5x2pyh5x2.png";
import profile from "../assets/istockphoto-1495088043-612x612.jpg";
import { ScaleLoader } from "react-spinners";
import MyLink from "./MyLink";

const NavBar = () => {
  const { user, setUser, signOutFunc, loading } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

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

  const beforeLogInLinks = (
    <>
      <li>
        <MyLink className={"text-white text-xl"} to={"/"}>
          Home
        </MyLink>
      </li>
      <li>
        <MyLink className={"text-white text-xl"} to={"/allIssue"}>
          All Issue
        </MyLink>
      </li>
      <li>
        <MyLink className={"text-white text-xl"} to={"/signin"}>
          Log In
        </MyLink>
      </li>
      <li>
        <MyLink className={"text-white text-xl"} to={"/signup"}>
          Register
        </MyLink>
      </li>
    </>
  );

  const afterLogIn = (
    <>
      <li>
        <MyLink className={"text-white text-xl"} to={"/"}>
          Home
        </MyLink>
      </li>
      <li>
        <MyLink className={"text-white text-xl"} to={"/allIssue"}>
          All Issue
        </MyLink>
      </li>
      <li>
        <MyLink className={"text-white text-xl"} to={"/AddModel"}>
          Add Issues
        </MyLink>
      </li>
      <li>
        <MyLink className={"text-white text-xl"} to={"/myModels"}>
          My Issues
        </MyLink>
      </li>
      <li>
        <MyLink className={"text-white text-xl"} to={"/MyContribution"}>
          My Contribution
        </MyLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="bg-gray-800 sticky top-0 z-50">
        <div className="navbar shadow-sm container mx-auto text-white">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
              >
                {user ? afterLogIn : beforeLogInLinks}
              </ul>
            </div>

            <div className="flex items-center gap-3 ml-4">
              <img src={logo} className="h-10 w-10 rounded-full" alt="logo" />
              <Link to={"/"} className=" text-xl">
                <span className="text-[#FFD700]">Fix</span>
                <span className="text-white font-bold">Issue</span>
                <span className="text-[#FFD700] font-extrabold italic">
                  City
                </span>
              </Link>
            </div>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {user ? afterLogIn : beforeLogInLinks}
            </ul>
          </div>

          <div className="navbar-end">
            <div>
              <div>
                <div className="navbar">
        <input 
           onChange={(e) => handleTheme(e.target.checked)}
           type="checkbox"
           defaultChecked={localStorage.getItem('theme') === "dark"}
           className="toggle bg-amber-400"/>
   </div>
              </div>
            </div>
            {loading ? (
              <ScaleLoader />
            ) : user ? (
              <div className="relative">

                <img
                  onClick={() => setMenuOpen(!menuOpen)}
                  src={user?.photoURL || profile}
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full border-2 border-yellow-400 cursor-pointer"
                />

                {menuOpen && (
                  <div className=" ">
                    <div>
                      
                    </div>
                    <div className="absolute right-0 mt-3 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg text-white z-50">
                      <div></div>
                      <div className="px-4 py-2 border-b border-gray-700 text-center">
                        <p className="font-semibold">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                        <div></div>
                      </div>
                      <div className="flex flex-col p-2">
                        <Link
                          to="/myProfile"
                          onClick={() => setMenuOpen(false)}
                          className="btn btn-sm btn-outline mb-2"
                        >
                          Update Profile
                        </Link>
                        <button
                          onClick={() => {
                            handleLogOut();
                            setMenuOpen(false);
                          }}
                          className="btn btn-sm btn-outline btn-error"
                        >
                          Logout
                        </button>

                      
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default NavBar;
