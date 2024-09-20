import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native"
import { MainStackParamList } from "../../navigators/MainStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme } from "../../contexts/ThemeContext";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import ListHeader from "../../components/ListHeader/ListHeader";
import ListPlaceholder from "../../components/ListPlaceholder/ListPlaceholder";
import HorizontalList from "../../components/HorizontalList/HorizontailList";
import { useMovies, useTrendingShows } from "../../hooks/useMovieQueries";
import { POPULAR_MOVIES, TOP_RATED, UPCOMING_MOVIES } from "../../constants/QueryType";
import ShowCard from "../../components/ShowCard/ShowCard";
import Carousel from "../../components/Carousel/Carousel";
import Slide from "../../components/Slide/Slide";

const Home = () => {
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const gotoPopularMovies = () => {
        navigation.navigate("ShowGrid", { title: "Popular Movies", query: POPULAR_MOVIES })
    }
    const gotoUpcomingMovies = () => {
        navigation.navigate("ShowGrid", { title: "Upcoming Movies", query: UPCOMING_MOVIES })
    }
    const gotoTopRatedMovies = () => {
        navigation.navigate("ShowGrid", { title: "Top Rated Movies", query: TOP_RATED })
    }

    const {
        data: trendingShows
    } = useTrendingShows();

    const { data: popularMoviesData,
        loadMore: loadMorePopularMovies
    } = useMovies(POPULAR_MOVIES)
    const popularMovies = popularMoviesData?.pages.flatMap(page => page.results) || [];
    const {
        data: upcomingMoviesData,
        loadMore: loadMoreUpcomingMovies
    } = useMovies(UPCOMING_MOVIES);

    const upcomingMovies = upcomingMoviesData?.pages.flatMap(page => page.results) || [];
    const theme = useTheme();

    const {
        data: topRatedMoviesData,
        loadMore: loadMoreTopRated,
        isLoading,
        isSuccess
    } = useMovies(TOP_RATED);
    const topRatedMovies = topRatedMoviesData?.pages.flatMap(page => page.results) || [];

    return (
        <ScrollView style={[styles.home_container, theme.colors]}>
            <Carousel data={trendingShows ? trendingShows.results : []} CardComponent={Slide} />
            <ListHeader title="Popular Movies" onSeeMore={gotoPopularMovies} />
            {popularMovies.length > 0 ? <HorizontalList data={popularMovies} onEnd={loadMorePopularMovies} CardComponent={ShowCard} /> : <ListPlaceholder />}
            <ListHeader title="Upcoming Movies" onSeeMore={gotoUpcomingMovies} />
            {upcomingMovies.length > 0 ? <HorizontalList data={upcomingMovies} onEnd={loadMoreUpcomingMovies} CardComponent={ShowCard} /> : <ListPlaceholder />}
            <ListHeader title="Top Rated Movies" onSeeMore={gotoTopRatedMovies} />
            {topRatedMovies.length > 0 ? <HorizontalList data={topRatedMovies} onEnd={loadMoreTopRated} CardComponent={ShowCard} /> : <ListPlaceholder />}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    home_container: {
        flex: 1,
        paddingBottom: 100,
    },
    header: {
        paddingVertical: 10,
    },
    brand: {
        fontSize: 24,
        color: Colors.primary
    },

})

export default Home;