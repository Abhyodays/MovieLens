import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { movieService } from "../services/movieService"
import { POPULAR_MOVIES, UPCOMING_MOVIES } from "../constants/QueryType"

export const useTrendingShows = ()=>{
    return useQuery({
        queryKey:['trendingShows'],
        queryFn:()=> movieService.getTrendingShows()
    })
}
const getQueryFn = (query: string, pageParam: number) => {
    switch (query) {
      case POPULAR_MOVIES:
        return movieService.getPopularMovies(pageParam);
      case UPCOMING_MOVIES:
        return movieService.getUpcomingMovies(pageParam);
      default:
        return movieService.getPopularMovies(pageParam); 
    }
  };
  
  export const useMovies = (query: string, page = 1) => {
    return useInfiniteQuery({
      queryKey: [query, page], 
      queryFn: ({ pageParam = page }) => getQueryFn(query, pageParam), 
      initialPageParam: 1, 
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined, 
    });
  };



