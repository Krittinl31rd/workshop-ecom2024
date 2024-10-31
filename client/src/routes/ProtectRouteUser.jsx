import React, { useState, useEffect } from "react";
import useEcomStore from "../store/ecom-store";
import { currentUser } from "../api/auth";
import LoadingToRedirect from "../routes/LoadingToRedirect";

const ProtectRouteUser = ({ element }) => {
  const [status, setStatus] = useState(false);
  const { user, token } = useEcomStore((state) => state);

  useEffect(() => {
    if (user && token) {
      currentUser(token)
        .then((res) => setStatus(true))
        .catch((err) => setStatus(false));
    }
  }, []);

  return status ? element : <LoadingToRedirect />;
};

export default ProtectRouteUser;
