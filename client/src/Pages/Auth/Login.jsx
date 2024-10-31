import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { user, token, actionLogin } = useEcomStore((state) => state);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handelOnChage = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      roleRedirect(role);
      toast.success("Welcome back.");
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };

  const roleRedirect = (role) => {
    if (role == "Admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };
  return (
    <main className=" bg-gray-100 flex items-center justify-center h-[calc(100vh-4rem)]">
      <div className="bg-white border rounded-2xl w-96 shadow-xl">
        <div className="p-4 mx-auto">
          <h1 className="text-2xl font-bold mb-5">Login</h1>
          <form className="flex flex-col gap-3" onSubmit={handelSubmit}>
            <div className="flex flex-col items-start justify-center gap-1">
              <h1 className="text-gray-600">Email</h1>
              <input
                onChange={handelOnChage}
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full border border-black rounded-xl py-3 px-4"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-1">
              <h1 className="text-gray-600">Password</h1>
              <input
                onChange={handelOnChage}
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full border border-black rounded-xl py-3 px-4"
              />
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white w-full h-12 rounded-xl mt-2">
              Login
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
