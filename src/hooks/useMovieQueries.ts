import { useQuery } from "@tanstack/react-query"
import { movieService } from "../services/movieService"

export const useTrendingShows = ()=>{
    return useQuery({
        queryKey:['trendingShows'],
        queryFn:()=> movieService.getTrendingShows()
    })
}