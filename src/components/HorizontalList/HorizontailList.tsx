import { StyleSheet, Text, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import ShowCard from "../ShowCard/ShowCard"
import { useTheme } from "../../contexts/ThemeContext"

type HorizontalListPropType = {
    data: any[]

}
const HorizontalList = ({ data }: HorizontalListPropType) => {
    const theme = useTheme();
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <ShowCard data={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            contentContainerStyle={[styles.container, theme.colors]}
            showsHorizontalScrollIndicator={false}
        />
    )
}
const styles = StyleSheet.create(
    {
        container: {
            gap: 20,
            paddingLeft: 20
        }
    }
)
export default HorizontalList;