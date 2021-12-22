import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:17303/api",
  headers: {
    "Content-type": "application/json"
  }
});