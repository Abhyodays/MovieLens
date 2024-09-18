import { Dimensions, StyleSheet, Text, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import ShowCard from "../ShowCard/ShowCard"
import { useTheme } from "../../contexts/ThemeContext"

type HorizontalListPropType = {
    data: any[],
    onEnd?: () => void
}
const HorizontalList = ({ data, onEnd }: HorizontalListPropType) => {

    const screenWidth = Math.round(Dimensions.get('screen').width / 2.5);
    const theme = useTheme()
    return (
        <View style={theme.colors}>
            <FlatList
                data={data}
                renderItem={({ item }) => <ShowCard data={item} customStyles={{ width: screenWidth }} />}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                contentContainerStyle={[styles.content_container]}
                showsHorizontalScrollIndicator={false}
                onEndReached={onEnd}
                onEndReachedThreshold={0.5}
                initialNumToRender={3}
                maxToRenderPerBatch={3}
                windowSize={5}
                getItemLayout={(data, index) => ({
                    length: screenWidth,
                    offset: screenWidth * index,
                    index
                })}
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