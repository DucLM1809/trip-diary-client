import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ auth }) => {
  const location = useLocation();

  return (
    <>
      {auth ? (
        <Outlet />
      ) : (
        <Navigate to="/sign-in" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireAuth;
