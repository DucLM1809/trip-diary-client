import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const location = useLocation();
  const auth = localStorage.getItem("auth");
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
