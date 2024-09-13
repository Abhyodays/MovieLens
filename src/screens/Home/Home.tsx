import { useNavigation } from "@react-navigation/native";
import { Button, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { MainStackParamList } from "../../navigators/MainStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme } from "../../contexts/ThemeContext";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import ListHeader from "../../components/ListHeader/ListHeader";
import { Data } from "../../constants/Data";
import ListPlaceholder from "../../components/ListPlaceholder/ListPlaceholder";
import HorizontalList from "../../components/HorizontalList/HorizontailList";
import Corousel from "../../components/Corousel/Corousel";
import { useMovies, useTrendingShows } from "../../hooks/useMovieQueries";
import { POPULAR_MOVIES, TOP_RATED, UPCOMING_MOVIES } from "../../constants/QueryType";
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
        hasNextPage: hasNextPagePopularMovies,
        fetchNextPage: fetchNextPagePopularMovies,
        isFetchingNextPage: isFetchingNextPagePopularMovies } =
        useMovies(POPULAR_MOVIES)
    const popularMovies = popularMoviesData?.pages.flatMap(page => page.results) || [];
    const loadMorePopularMovies = () => {
        if (hasNextPagePopularMovies && !isFetchingNextPagePopularMovies) {
            fetchNextPagePopularMovies();
        }
    };
    const { data: upcomingMoviesData,
        hasNextPage: hasNextPageUpcomingMovies,
        fetchNextPage: fetchNextPageUpcomingMovies,
        isFetchingNextPage: isFetchingNextPageUpcomingMovies } =
        useMovies(UPCOMING_MOVIES);

    const upcomingMovies = upcomingMoviesData?.pages.flatMap(page => page.results) || [];
    const loadMoreUpcomingMovies = () => {
        if (hasNextPageUpcomingMovies && !isFetchingNextPageUpcomingMovies) {
            fetchNextPageUpcomingMovies();
        }
    };


    return (
        <ScrollView style={styles.home_container}>

            <Corousel data={trendingShows ? trendingShows.results : []} />
            <ListHeader title="Popular Movies" onSeeMore={gotoPopularMovies} />
            {<HorizontalList data={popularMovies} onEnd={loadMorePopularMovies} />}
            <ListHeader title="Upcoming Movies" onSeeMore={gotoUpcomingMovies} />
            {Data ? <HorizontalList data={upcomingMovies} onEnd={loadMoreUpcomingMovies} /> : <ListPlaceholder />}
            <ListHeader title="Top Rated Movies" onSeeMore={gotoTopRatedMovies} />
            {Data ? <HorizontalList data={Data.results} /> : <ListPlaceholder />}
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