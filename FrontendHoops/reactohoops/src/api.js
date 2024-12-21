import axios from "axios";

const api = axios.create({
    baseURL: "https://shark-app-l2nyb.ondigitalocean.app/", // Replace with your backend URL
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
