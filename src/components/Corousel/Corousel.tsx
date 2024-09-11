import { View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { Data } from "../../constants/Data"
import Slide from "../Slide/Slide"

const Corousel = () => {
    return (
        <View>
            <FlatList
                data={Data.results}
                renderItem={({ item }) => <Slide data={item} />}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                initialNumToRender={3}
                maxToRenderPerBatch={3}
            />
        </View>
    )
}
export default Corousel;