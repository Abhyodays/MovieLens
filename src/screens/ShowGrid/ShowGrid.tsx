import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native"
import { MainStackParamList } from "../../navigators/MainStack"
import { useEffect, useMemo } from "react"
import ShowCard from "../../components/ShowCard/ShowCard"
import { useTheme } from "../../contexts/ThemeContext"
import { useMovies } from "../../hooks/useMovieQueries"

type ShowGridRouteType = {
    route: {
        params: {
            title?: string,
            query?: string
        }
    }
}
const ShowGrid = ({ route }: ShowGridRouteType) => {
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const theme = useTheme()

    const { data, loadMore } = useMovies(route.params.query || "");

    const results = data?.pages.flatMap(page => page.results) || [];

    useEffect(() => {
        navigation.setOptions({ title: route.params.title })
    }, [])
    return (
        <FlatList
            data={results}
            renderItem={({ item }) => <ShowCard data={item} customStyles={styles.card_style} />}
            numColumns={3}
            contentContainerStyle={[{ backgroundColor: theme.colors.backgroundColor }, styles.container]}
            columnWrapperStyle={styles.row}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            keyExtractor={(item) => item.id.toString() + (route.params.query || "popular")}
        />
    )
}

const styles = StyleSheet.create({
    row: {
        gap: 20,
        paddingHorizontal: 20,
        marginBottom: 10
    },
    container: {
        alignItems: 'center',
        paddingTop: 10
    },
    card_style: {
        width: Dimensions.get('screen').width / 3.5
    }
})
export default ShowGrid;