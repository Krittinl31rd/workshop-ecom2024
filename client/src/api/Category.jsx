import axios from "axios";

export const createCategory = async (token, name) => {
  return await axios.post(import.meta.env.VITE_API_URL + "/category", name, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listCategoty = async (token) => {
  return await axios.get(import.meta.env.VITE_API_URL + "/category", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCategoty = async (token, id) => {
  return await axios.delete(import.meta.env.VITE_API_URL + `/category/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
