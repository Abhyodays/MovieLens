import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native"
import { MainStackParamList } from "../../navigators/MainStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme } from "../../contexts/ThemeContext";
import Styles from "../../Styles";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import ListHeader from "../../components/ListHeader/ListHeader";
import { Data } from "../../constants/Data";
import ListPlaceholder from "../../components/ListPlaceholder/ListPlaceholder";
import HorizontalList from "../../components/HorizontalList/HorizontailList";
const Home = () => {
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const theme = useTheme();
    const gotoTrendingMovies = () => {
        console.log("Trending movies here")
    }
    const gotoUpcomingMovies = () => {
        console.log("Popular movies here")
    }
    return (
        <ScrollView style={styles.home_container}>
            <View style={[Styles.container, styles.header, { backgroundColor: theme.colors.backgroundColor }]}>
                <Text style={[styles.brand, Styles.fontOswaldBold]}>MovieLens</Text>
            </View>
            <View style={{ height: 250, backgroundColor: 'gray' }}>
                <Text>Poster</Text>
            </View>
            <ListHeader title="Trending Movies" onSeeMore={gotoTrendingMovies} />
            {Data ? <HorizontalList data={Data.results} /> : <ListPlaceholder />}
            <ListHeader title="Upcoming Movies" onSeeMore={gotoUpcomingMovies} />
            {Data ? <HorizontalList data={Data.results} /> : <ListPlaceholder />}
            <ListHeader title="Top Rated Movies" onSeeMore={gotoUpcomingMovies} />
            {Data ? <HorizontalList data={Data.results} /> : <ListPlaceholder />}
            {/* <Button title="Details" onPress={() => navigation.push('ShowDetails')} />
            <Button title="Cast" onPress={() => navigation.push('Cast')} />
            <Button title="Ratings" onPress={() => navigation.push('Ratings')} />
            <Button title="Watchlist" onPress={() => navigation.push('Watchlist')} />*/}
            <Button title="toggle theme" onPress={() => theme.toggleTheme()} />
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    home_container: {
        paddingBottom: 20
    },
    header: {
        paddingVertical: 10,
    },
    brand: {
        fontSize: 24,
        color: Colors.primary
    }
})

export default Home;