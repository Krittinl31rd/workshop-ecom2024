import React, { useState, useEffect } from "react";
import useEcomStore from "../store/ecom-store";
import { currentAdmin } from "../api/auth";
import LoadingToRedirect from "../routes/LoadingToRedirect";

const ProtectRouteAdmin = ({ element }) => {
  const [status, setStatus] = useState(false);
  const { user, token } = useEcomStore((state) => state);

  useEffect(() => {
    if (user && token) {
      currentAdmin(token)
        .then((res) => setStatus(true))
        .catch((err) => setStatus(false));
    }
  }, []);

  return status ? element : <LoadingToRedirect />;
};

export default ProtectRouteAdmin;
