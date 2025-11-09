import axios from "axios";

const API_URL = "http://localhost:3001/obras";
export const getObras = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createObra = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateObra = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteObra = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
