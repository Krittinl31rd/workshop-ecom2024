import axios from "axios";

export const currentUser = async (token) =>
  await axios.post(
    import.meta.env.VITE_API_URL + "/current-user",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const currentAdmin = async (token) =>
  await axios.post(
    import.meta.env.VITE_API_URL + "/current-admin",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );