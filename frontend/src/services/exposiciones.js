import axios from "axios";

const API_URL = "http://localhost:3001/exposiciones"; // Ajusta si tu backend usa otro nombre

export const getExposiciones = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createExposicion = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateExposicion = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteExposicion = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
