import axios from "axios";

const API = "http://localhost:5000/api";

export const getReports = () => axios.get(`${API}/reports`);
export const addReport = (data) => axios.post(`${API}/report`, data);
