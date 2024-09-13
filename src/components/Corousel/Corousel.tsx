import { View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { Data } from "../../constants/Data"
import Slide from "../Slide/Slide"
import { Show } from "../../types/Show"

type CorouselPropType = {
    data: Show[]
}
const Corousel = ({ data }: CorouselPropType) => {
    return (
        <View>
            <FlatList
                data={data}
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