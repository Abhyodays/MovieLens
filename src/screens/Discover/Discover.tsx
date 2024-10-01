import { StyleSheet, Text, View, TextInput, Pressable } from "react-native"
import { useTheme } from "../../contexts/ThemeContext"
import Icon from 'react-native-vector-icons/AntDesign'
import Colors from "../../constants/Colors";
import { useDiscoverQuery, useMovies } from "../../hooks/useMovieQueries";
import CardGrid from "../../components/CardGrid/CardGrid";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../../navigators/MainStack";
import useGenreBar from "../../hooks/useGenreBar";
const Discover = () => {
    const theme = useTheme();
    const { GenresComponent, genresQuery } = useGenreBar();
    const str = `/discover/movie?include_adult=false&include_video=false&language=en-US&&${!!genresQuery ? `with_genres=${genresQuery}` : ""}`;
    const { data, loadMore } = useDiscoverQuery(str, 1);
    const results = data?.pages.flatMap(page => page.results) || [];
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const handleSearchPress = () => {
        navigation.navigate("Search");
    }

    return (
        <View style={[theme.colors, { flex: 1 }]}>
            <Pressable onPress={handleSearchPress}>
                <View style={styles.header}>
                    <View style={styles.search_bar}>
                        <Icon name="search1" size={24} color={Colors.black} />
                        <TextInput style={styles.search_input} placeholder="Search movies here..." editable={false} />
                    </View>
                </View>
            </Pressable>
            <GenresComponent />
            <View>
                <CardGrid data={results} loadMore={loadMore} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 70,
        justifyContent: 'center'
    },
    search_bar: {
        flex: 0.8,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        marginHorizontal: 10,
        borderRadius: 30,
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    search_input: {
        fontSize: 16,
        marginLeft: 5,
        color: Colors.black
    }
});
export default Discover