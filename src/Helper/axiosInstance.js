import axios from "axios";

const BaseUrl = "http://localhost:8080";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: BaseUrl,
});


export default axiosInstance;