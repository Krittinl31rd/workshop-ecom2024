import React, { useState, useEffect } from "react";
import { Edit, Trash } from "lucide-react";

const TableCategory = ({ data, handelDelete }) => {
  return (
    <div className="w-[65%] mx-auto h-[calc(100vh-9rem)] p-4 bg-white shadow-md overflow-x-auto">
      <h1 className="font-semibold mb-4">Category List</h1>
      <table className="w-full text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Manage
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-100">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {item.name}
              </th>
              <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                  <button className="bg-yellow-400 text-black w-7 h-7 rounded-full flex justify-center items-center">
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => handelDelete(item.id)}
                    className="bg-red-400 text-black w-7 h-7 rounded-full flex justify-center items-center"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableCategory;
