import axios from "axios";
import { Show } from "../types/Show";
import { client } from "../axios/axiosClient";
import { ApiResponse } from "../types/Response";




export const movieService = {
    getTrendingShows :async():Promise<ApiResponse>=>{
        try{
            const response = await client.get(`/trending/all/week?language=en-US`)
            return response.data;
        }catch(err){
            console.log(err);
            throw err;
        }
    },
    getPopularMovies:async(page=1):Promise<ApiResponse>=>{
        try{
            const response = await client.get(`movie/popular?language=en-US&page=${page}`)
            return response.data;
        }catch(err){
            console.log(err);
            throw err;
        }
    },
    getTopRatedMovies:async(page:number):Promise<ApiResponse>=>{
        try{
            const response = await client.get(`/movie/top_rated?language=en-US&page=${page}`)
            return response.data;
        }catch(err){
            console.log(err);
            throw err;
        }
    },
    getUpcomingMovies:async(page=1):Promise<ApiResponse>=>{
        try{
            const response = await client.get(`movie/upcoming?language=en-US&page=${page}`)
            return response.data;
        }catch(err){
            console.log(err);
            throw err;
        }
    },


}
