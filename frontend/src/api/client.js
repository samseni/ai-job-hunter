import axios from "axios";
// Backend base URL comes from frontend/.env (VITE_API_URL). No secrets here.
const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});
export default client;
