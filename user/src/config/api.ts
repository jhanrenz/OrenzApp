import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
    },
})

export const setAuthToken = (token : string | null) => {
    if(token){
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }else{
        delete api.defaults.headers.common['Authorization']
    }
}

const token = localStorage.getItem('token')
if(token){
    setAuthToken(token)
}