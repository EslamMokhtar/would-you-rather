import * as React from "react";
import { useLocation, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
const RequireAuth = ({ children }) => {
  const auth = useSelector((state) => state.auth.isAauth);
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
