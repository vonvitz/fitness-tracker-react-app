import React from "react";

import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";

const Logout = () => {
  const { setUser, unsetUser } = useContext(UserContext);

  // To clear the contents of the localStorage
  // localStorage.clear();

  unsetUser();

  useEffect(() => {
    setUser({
      // access : null
      id: null,
    });
  });

  return <Navigate to="/login" />;
};

export default Logout;
