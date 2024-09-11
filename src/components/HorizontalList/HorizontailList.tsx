import { Dimensions, StyleSheet, Text, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import ShowCard from "../ShowCard/ShowCard"
import { useTheme } from "../../contexts/ThemeContext"

type HorizontalListPropType = {
    data: any[]

}
const HorizontalList = ({ data }: HorizontalListPropType) => {
    const theme = useTheme();
    return (
        <View>
            <FlatList
                data={data}
                renderItem={({ item }) => <ShowCard data={item} customStyles={{ width: Dimensions.get('screen').width / 2.5 }} />}
                keyExtractor={(item) => item.id}
                horizontal
                contentContainerStyle={[styles.content_container, theme.colors]}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}
const styles = StyleSheet.create(
    {
        content_container: {
            gap: 20,
            paddingLeft: 20
        }
    }
)
export default HorizontalList;