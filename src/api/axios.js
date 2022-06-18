import axios from "axios"

const api = axios.create({
    // baseURL: "http://ttq186.xyz:8000/"
    baseURL: "https://triparis.work/api/v1"
}) 

export default api