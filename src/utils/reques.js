import axios from "axios"
const request = axios.create({
    // baseURL:"http://localhost:8000"

    baseURL:"https://blog-5g3k.onrender.com"

})

export default request;