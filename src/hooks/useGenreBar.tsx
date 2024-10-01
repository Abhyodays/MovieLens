import { useMemo, useState } from "react";
import { useMovieGenres } from "./useMovieQueries";
import GenresBar from "../components/GenresBar/GenresBar";

const useGenreBar = () => {
    const { data } = useMovieGenres();
    const [selectedGenres, setSelectedGeneres] = useState<Set<number>>(new Set())
    const genres = useMemo(() => data?.genres || [], [data])
    const handlePress = (id: number) => {
        if (selectedGenres.has(id)) {
            selectedGenres.delete(id)
        } else {
            selectedGenres.add(id);
        }
        setSelectedGeneres(new Set(selectedGenres))
    }

    const GenresComponent = () => {
        return (<GenresBar genres={genres} handlePress={handlePress} selectedGenres={selectedGenres} />)
    }
    const genresQuery = Array.from(selectedGenres).join(',')


    return { GenresComponent, genresQuery }
}

export default useGenreBar;