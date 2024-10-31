import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";

const Layout = () => {
  return (
    <>
      <MainNav />
      <main className="flex items-center justify-center flex-1">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
