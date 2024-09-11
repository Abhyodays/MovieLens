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
const Home = () => {
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const theme = useTheme();
    const gotoTrendingMovies = () => {
        navigation.navigate("ShowGrid", { title: "Trending Movies", query: "/trending" })
    }
    const gotoUpcomingMovies = () => {
        navigation.navigate("ShowGrid", { title: "Upcoming Movies", query: "/upcoming" })
    }
    const gotoTopRatedMovies = () => {
        navigation.navigate("ShowGrid", { title: "Top Rated Movies", query: "/top-rated" })
    }
    return (
        <ScrollView style={styles.home_container}>
            {/* <View style={[Styles.container, styles.header, { backgroundColor: theme.colors.backgroundColor }]}>
                <Text style={[styles.brand, Styles.fontOswaldBold]}>MovieLens</Text>
            </View> */}
            <Corousel />
            <ListHeader title="Trending Movies" onSeeMore={gotoTrendingMovies} />
            {Data ? <HorizontalList data={Data.results} /> : <ListPlaceholder />}
            <ListHeader title="Upcoming Movies" onSeeMore={gotoUpcomingMovies} />
            {Data ? <HorizontalList data={Data.results} /> : <ListPlaceholder />}
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