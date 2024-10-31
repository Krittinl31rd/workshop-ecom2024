import React from "react";
import { Link } from "react-router-dom";

const MainNav = () => {
  return (
    <nav className="bg-white shadow-xl">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to={"/"} className="text-2xl font-bold mr-4">
              IMGs
            </Link>
            <Link to={"/"}>Home</Link>
            <Link to={"shop"}>Shop</Link>
            <Link to={"cart"}>Cart</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to={"register"}
              className="flex justify-center items-center w-24 h-9 border border-black rounded-md hover:bg-black hover:text-white"
            >
              Register
            </Link>
            <Link
              to={"login"}
              className="flex justify-center items-center w-24 h-9 border border-black rounded-md hover:bg-black hover:text-white"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
