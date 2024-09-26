import axios, { AxiosError } from "axios";
import { Show } from "../types/Show";
import { client } from "../axios/axiosClient";
import { ApiResponse, RatingResponse } from "../types/Response";




export const movieService = {
    getTrendingShows :async():Promise<ApiResponse>=>{
        try{
            const response = await client.get(`/trending/movie/week?language=en-US`)
            return response.data;
            

        }catch(err){
            const message = (err instanceof AxiosError ? err.message: "Error in fetching trending shows" );
            throw new Error(message);
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
    getMovieDetails:async(id:number)=>{
        try{
            const response =  await client.get(`/movie/${id}?language=en-US`);
            return response.data;
        }catch(err){
            console.log("Error in fetching movie details:", err);
            throw err;
        }
    },
    getMovieCredits:async(id:number)=>{
        try{
            const response =  await client.get(`/movie/${id}/credits?language=en-US`);
            return response.data;
        }catch(error){
            console.log("Error in fetching movie credits:", error)
            throw error;
        }
    },
    getMovieImages: async(id:number)=>{
        try{
            const response = await client.get(`/movie/${id}/images`);
            return response.data;
        }catch(error){
            console.log("Error while fetching images.");
            throw error;
        }
    },
    getMovieReviews: async(id:number):Promise<RatingResponse>=>{
        try{
            const response = await client.get(`/movie/533535/reviews`);
            return response.data;
        }catch(error){
            console.log("Error while fetching images.");
            throw error;
        }
    }


}
