import React from "react";

const Register = () => {
  return (
    <div className="bg-white border rounded-2xl w-96 h-full shadow-xl">
      <div className="p-4 mx-auto">
        <h1 className="text-2xl font-bold mb-5">Login</h1>
        <form className="flex flex-col gap-3">
          <div className="flex flex-col items-start justify-center gap-1">
            <h1 className="text-gray-600">Email</h1>
            <input
              type="text"
              placeholder="you@example.com"
              className="w-full border border-black rounded-xl py-3 px-4"
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-1">
            <h1 className="text-gray-600">Password</h1>
            <input
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
  );
};

export default Register;
