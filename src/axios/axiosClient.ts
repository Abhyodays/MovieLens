import axios from "axios";

export const client = axios.create({
    baseURL: process.env.TMDB_BASE_URI,
    headers:{
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
    }
})

