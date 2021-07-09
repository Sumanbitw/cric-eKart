import React from "react"
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export function PrivateRoute({ path, ...props }) {
  const { user } = useAuth();
  
  return user ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}
