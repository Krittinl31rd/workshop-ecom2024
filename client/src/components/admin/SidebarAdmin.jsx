import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UserCog,
  List,
  Package,
  LogOut,
  MonitorCog,
} from "lucide-react";

const SidebarAdmin = () => {
  return (
    <div className="bg-white flex flex-col w-60 h-screen">
      <div className="border-r border-gray-300 w-full">
        <div className="flex items-center justify-start h-24 border-b border-gray-300 py-1 px-4 w-full">
          <MonitorCog className="mr-2" />
          <h1 className="font-bold text-2xl">Admin Panel</h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between flex-1 px-4 py-6">
        <div className="flex flex-col gap-3 items-center justify-center w-full">
          <NavLink
            to={"/admin"}
            end
            className={({ isActive }) =>
              isActive
                ? "flex w-full justify-start py-3 px-5 font-semibold text-white bg-black"
                : "flex w-full justify-start py-3 px-5 font-semibold text-gray-500 hover:bg-black hover:text-white"
            }
          >
            <LayoutDashboard className="mr-2" />
            Dashboard
          </NavLink>
          <NavLink
            to={"manage"}
            className={({ isActive }) =>
              isActive
                ? "flex w-full justify-start py-3 px-5 font-semibold text-white bg-black"
                : "flex w-full justify-start py-3 px-5 font-semibold text-gray-500 hover:bg-black hover:text-white"
            }
          >
            <UserCog className="mr-2" />
            Manage
          </NavLink>
          <NavLink
            to={"category"}
            className={({ isActive }) =>
              isActive
                ? "flex w-full justify-start py-3 px-5 font-semibold text-white bg-black"
                : "flex w-full justify-start py-3 px-5 font-semibold text-gray-500 hover:bg-black hover:text-white"
            }
          >
            <List className="mr-2" />
            Categories
          </NavLink>
          <NavLink
            to={"product"}
            className={({ isActive }) =>
              isActive
                ? "flex w-full justify-start py-3 px-5 font-semibold text-white bg-black"
                : "flex w-full justify-start py-3 px-5 font-semibold text-gray-500 hover:bg-black hover:text-white"
            }
          >
            <Package className="mr-2" />
            Products
          </NavLink>
        </div>

        <div className="flex flex-col items-center justify-center w-full">
          <NavLink
            to={"/logout"}
            className={({ isActive }) =>
              isActive
                ? "flex w-full justify-start py-3 px-5 font-semibold text-white bg-black"
                : "flex w-full justify-start py-3 px-5 font-semibold text-gray-500 hover:bg-black hover:text-white"
            }
          >
            <LogOut className="mr-2" />
            Logout
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdmin;
