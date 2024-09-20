import { StyleSheet, Text, View } from "react-native"
import { useMovieCredits } from "../../hooks/useMovieQueries";
import { FlatList } from "react-native-gesture-handler";
import CastCard from "../../components/CastCard/CastCard";
import { useTheme } from "../../contexts/ThemeContext";

type CastPropType = {
    route: {
        params: {
            id: number
        }
    }
}
const Cast = ({ route }: CastPropType) => {
    const { data } = useMovieCredits(route.params.id)
    const theme = useTheme();
    return (
        <View>
            <FlatList
                data={data.cast}
                renderItem={({ item }) => <CastCard {...item} />}
                numColumns={3}
                keyExtractor={(item) => item.credit_id}
                columnWrapperStyle={styles.row}
                contentContainerStyle={[styles.container, theme.colors]}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: 20
    },
    row: {
        gap: 10,
        justifyContent: 'flex-start'
    }
})

export default Cast;