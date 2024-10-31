import React from "react";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <>
      <h1>sidebar</h1>
      <h1>header</h1>
      <hr />
      <Outlet />
    </>
  );
};

export default LayoutAdmin;
