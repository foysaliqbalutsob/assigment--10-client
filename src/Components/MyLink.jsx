import React from "react";
import { NavLink } from "react-router";

const MyLink = ({ to, className, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "text-[#FFD700]  text-xl " : `${className} font-semibold`
      }
    >
      {children}
    </NavLink>
  );
};

export default MyLink;
