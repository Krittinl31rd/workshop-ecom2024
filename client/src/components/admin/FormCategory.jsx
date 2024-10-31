import React, { useState, useEffect } from "react";
import {
  createCategory,
  listCategoty,
  deleteCategoty,
} from "../../api/Category";
import { SaveAll } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import TableCategory from "../../components/admin/TableCategory";

const FormCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const { token } = useEcomStore((state) => state);

  useEffect(() => {
    getCategory(token);
  }, []);

  const getCategory = async (token) => {
    try {
      const res = await listCategoty(token);
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (name == "") {
      return toast.error("Category name is requied.");
    }
    try {
      const res = await createCategory(token, { name });
      toast.success(res.data?.message);
      setName("");
      getCategory(token);
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };

  const handelDelete = async (id) => {
    try {
      const res = await deleteCategoty(token, id);
      toast.success(res.data?.message);
      getCategory(token);
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };

  return (
    <>
      <TableCategory data={categories} handelDelete={handelDelete} />
      <div className="w-[35%] mx-auto h-full p-4 bg-white shadow-md">
        <h1 className="font-semibold mb-4">Category Management</h1>
        <form onSubmit={handelSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col items-start justify-center gap-1">
            <h1 className="text-gray-600">Category name</h1>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              type="text"
              placeholder="Enter your category"
              className="w-full border border-black rounded-xl py-3 px-4"
            />
          </div>

          <button className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white w-full h-12 rounded-xl mt-2">
            <SaveAll />
          </button>
        </form>
      </div>
    </>
  );
};

export default FormCategory;
