import React, { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, useLocation } from "react-router";
import Loading from "../Components/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  // console.log(location);

  if (loading) return <Loading></Loading>;

  if (!user) {
    return <Navigate to={"/signin"} state={{ from: location }}></Navigate>;
  }

  return children;
};

export default PrivateRoute;
