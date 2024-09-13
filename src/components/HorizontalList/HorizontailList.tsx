import { Dimensions, StyleSheet, Text, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import ShowCard from "../ShowCard/ShowCard"
import { useTheme } from "../../contexts/ThemeContext"

type HorizontalListPropType = {
    data: any[],
    onEnd?: () => void

}
const HorizontalList = ({ data, onEnd }: HorizontalListPropType) => {
    return (
        <View >
            <FlatList
                data={data}
                renderItem={({ item }) => <ShowCard data={item} customStyles={{ width: Dimensions.get('screen').width / 2.5 }} />}
                keyExtractor={(item) => item.name}
                horizontal
                contentContainerStyle={[styles.content_container]}
                showsHorizontalScrollIndicator={false}
                onEndReached={onEnd}
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