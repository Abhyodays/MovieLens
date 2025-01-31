import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { movieService } from "../services/movieService"
import { POPULAR_MOVIES, TOP_RATED, UPCOMING_MOVIES } from "../constants/QueryType"
import { Video } from "../types/Video"

export const useTrendingShows = ()=>{
    return useQuery({
        queryKey:['trendingShows'],
        queryFn:()=> movieService.getTrendingShows()
    })
}

export const useMovieDetails = (id:string)=>{
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
    });

    const loadMore = ()=>{
        if(res.hasNextPage && !res.isFetchingNextPage){
            res.fetchNextPage();
        }
    }
    return {...res,loadMore};
  };
  
  export const useMovieCredits = (id:string)=>{
      return useQuery({
        queryKey: ["movie", id, "credits"],
        queryFn:()=> movieService.getMovieCredits(id)
      })
  }

  export const useMovieImages = (id:string)=>{
    return useQuery({
      queryKey:['movie', id, 'images'],
      queryFn: ()=> movieService.getMovieImages(id)
    })
  }

  export const useMovieReviews = (id:string)=>{
    return useQuery({
      queryKey:['movie','reviews', id],
      queryFn:()=> movieService.getMovieReviews(id)
    })
  }

  export const useDiscoverQuery = (query:string, page:number)=>{
    const res = useInfiniteQuery({
      queryKey: [query, page], 
      queryFn: ({ pageParam = page }) => movieService.discoverMovies(query,pageParam), 
      initialPageParam: 1, 
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined, 
    });

    const loadMore = ()=>{
        if(res.hasNextPage && !res.isFetchingNextPage){
            res.fetchNextPage();
        }
    }
    return {...res,loadMore};
  }

  export const useSearchMovies = (query:string,page=1)=>{
    const res = useInfiniteQuery({
      queryKey:['search','movies',query,page],
      queryFn: ({pageParam=page})=> movieService.searchMovies(query, pageParam),
      initialPageParam:1,
      getNextPageParam: (lastPage)=>
        lastPage.page< lastPage.total_pages?lastPage.page+1:undefined,
      enabled: !!query
    })

    const loadMore = ()=>{
      if(res.hasNextPage && !res.isFetchingNextPage){
          res.fetchNextPage();
      }
    }
    return {...res,loadMore};
  }
  export const useMovieGenres = ()=>{
    return useQuery({
      queryKey:['movie', 'genres'],
      queryFn: ()=>movieService.getAllMovieGenres()
    })
  }

  export const useMovieVideos = (id:string) =>{
    return useQuery({
      queryKey:['movie', 'videos', id],
      queryFn: ()=> movieService.getAllVideos(id)
    })
  }


