import axios from "axios";

const API_URL = "http://localhost:3001/obras-expuestas";

export const getObrasExpuestas = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createObraExpuesta = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const deleteObraExpuesta = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
