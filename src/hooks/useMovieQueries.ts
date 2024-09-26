import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { movieService } from "../services/movieService"
import { POPULAR_MOVIES, TOP_RATED, UPCOMING_MOVIES } from "../constants/QueryType"

export const useTrendingShows = ()=>{
    return useQuery({
        queryKey:['trendingShows'],
        queryFn:()=> movieService.getTrendingShows()
    })
}

export const useMovieDetails = (id:number)=>{
  return useQuery({
    queryKey:['movie',id],
    queryFn:()=> movieService.getMovieDetails(id)
  })
}

const getQueryFn = (query: string, pageParam: number) => {
    switch (query) {
      case POPULAR_MOVIES:
        return movieService.getPopularMovies(pageParam);
      case UPCOMING_MOVIES:
        return movieService.getUpcomingMovies(pageParam);
      case TOP_RATED:
        return movieService.getTopRatedMovies(pageParam);
      default:
        return movieService.getPopularMovies(pageParam); 
    }
  };
  
  export const useMovies = (query: string, page = 1) => {
    const res = useInfiniteQuery({
      queryKey: [query, page], 
      queryFn: ({ pageParam = page }) => getQueryFn(query, pageParam), 
      initialPageParam: 1, 
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined, 
      staleTime:Infinity
    });

    const loadMore = ()=>{
        if(res.hasNextPage && !res.isFetchingNextPage){
            res.fetchNextPage();
        }
    }
    return {...res,loadMore};
  };
  
  export const useMovieCredits = (id:number)=>{
      return useQuery({
        queryKey: ["movie", id, "credits"],
        queryFn:()=> movieService.getMovieCredits(id)
      })
  }

  export const useMovieImages = (id:number)=>{
    return useQuery({
      queryKey:['movie', id, 'images'],
      queryFn: ()=> movieService.getMovieImages(id)
    })
  }

  export const useMovieReviews = (id:number)=>{
    return useQuery({
      queryKey:['movie','reviews', id],
      queryFn:()=> movieService.getMovieReviews(id)
    })
  }



