import axios from "axios"

const request = axios.create({

    // baseURL:"https://blog-5g3k.onrender.com",
    baseURL:"http://localhost:8000/",

   
})

export default request;
