import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useEcomStore from "../store/ecom-store";

const LoadingToRedirect = () => {
  const { user } = useEcomStore((state) => state);
  const [count, setCount] = useState(3);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((current) => {
        if (current == 1) {
          clearInterval(interval);
          setRedirect(true);
        }
        return current - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (redirect) {
    if (user?.role == "User") {
      return <Navigate to={"/user"} />;
    } else {
      return <Navigate to={"/"} />;
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <h1 className="text-4xl text-blue-600 font-semibold">
          Sorry, you cannot view the page.
        </h1>
        <h1 className="text-red-500 text-xl">
          No permisson to access this page, Redirect in {count}
        </h1>
      </div>
    </div>
  );
};

export default LoadingToRedirect;
