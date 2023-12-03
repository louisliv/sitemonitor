import axios from "axios";

const baseLocation = window.location.origin;

// axios.defaults.withCredentials = true;

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const api = axios.create({
  baseURL: `${baseLocation}/sitemonitor/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
