import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const UnAuth = ({ auth }) => {
  const location = useLocation();

  return (
    <>
      {auth ? (
        <Navigate to="/home" state={{ from: location }} replace />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default UnAuth;
