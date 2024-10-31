import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handelOnChage = (e) => {
    setForm({
      ...form, // copy obj
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault(); // secure refresh
    if (form.password != form.confirmPassword) {
      toast.error("Password not match.");
      return;
    }
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/register",
        form
      );
      toast.success(res.data?.message);
      setForm({
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };

  return (
    <main className=" bg-gray-100 flex items-center justify-center h-[calc(100vh-4rem)]">
      <div className="bg-white border rounded-2xl w-96 shadow-xl">
        <div className="p-4 mx-auto">
          <h1 className="text-2xl font-bold mb-5">Register</h1>
          <form className="flex flex-col gap-3" onSubmit={handelSubmit}>
            <div className="flex flex-col items-start justify-center gap-1">
              <h1 className="text-gray-600">Email</h1>
              <input
                onChange={handelOnChage}
                value={form.email}
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
                value={form.password}
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full border border-black rounded-xl py-3 px-4"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-1">
              <h1 className="text-gray-600">Confirm Password</h1>
              <input
                onChange={handelOnChage}
                value={form.confirmPassword}
                name="confirmPassword"
                type="password"
                placeholder="Enter your password again"
                className="w-full border border-black rounded-xl py-3 px-4"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white w-full h-12 rounded-xl mt-2">
              Register
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
