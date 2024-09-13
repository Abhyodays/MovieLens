import axios from "axios";
import { Show } from "../types/Show";
import { client } from "../axios/axiosClient";
import { ApiResponse } from "../types/ApiResponse";




export const movieService = {
    getTrendingShows :async():Promise<ApiResponse>=>{
        try{
            const response = await client.get("/trending/all/day?language=en-US")
            return response.data;
        }catch(err){
            console.log(err);
            throw err;
        }
    },
    getTrendingMovies:async({pageParam=1})=>{
        try{
            const response = await client.get(`/movie/popular?language=en-US&page=${pageParam}`)
            return response.data.results;
        }catch(err){
            console.log(err);
            throw err;
        }
    },
    getTopRatedMovies:async()=>{
        try{
            const response = await client.get("/trending/all/day?language=en-US")
            return response.data.results;
        }catch(err){
            console.log(err);
            throw err;
        }
    },
    getUpcomingMovies:async()=>{
        try{
            const response = await client.get("/trending/all/day?language=en-US")
            return response.data.results;
        }catch(err){
            console.log(err);
            throw err;
        }
    },


}
