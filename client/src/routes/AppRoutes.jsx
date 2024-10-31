import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Pages/Home";
import Shop from "../Pages/Shop";
import Cart from "../Pages/Cart";
import History from "../Pages/History";
import CheckOut from "../Pages/CheckOut";
import Login from "../Pages/auth/Login";
import Register from "../Pages/auth/Register";
import Layout from "../layouts/Layout";
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutUser from "../layouts/LayoutUser";
import Dashboard from "../Pages/Admin/Dashboard";
import Category from "../Pages/Admin/Category";
import Product from "../Pages/Admin/Product";
import Manage from "../Pages/Admin/Manage";
import HomeUser from "../Pages/User/HomeUser";
import ProtectRouteUser from "./ProtectRouteUser";
import ProtectRouteAdmin from "./ProtectRouteAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
      { path: "history", element: <History /> },
      { path: "check-out", element: <CheckOut /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/admin",
    // element: <LayoutAdmin />,
    element: <ProtectRouteAdmin element={<LayoutAdmin />} />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "category", element: <Category /> },
      { path: "product", element: <Product /> },
      { path: "manage", element: <Manage /> },
    ],
  },
  {
    path: "/user",
    // element: <LayoutUser />,
    element: <ProtectRouteUser element={<LayoutUser />} />,
    children: [{ index: true, element: <HomeUser /> }],
  },
]);

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRoutes;
