import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const UnAuth = () => {
  const location = useLocation();
  const auth = localStorage.getItem("auth");

  return (
    <>
      {auth ? (
        <Navigate to={"/home"} state={{ from: location }} replace />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default UnAuth;
