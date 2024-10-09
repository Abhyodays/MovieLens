import { Dimensions, View, FlatList, StyleSheet } from "react-native"
import { useTheme } from "../../contexts/ThemeContext"

type CarouselPropType<T> = {
    data: T[],
    index?: number,
    CardComponent: (props: { data: T }) => React.ReactNode
}
const Carousel = <T,>({ data, index = 0, CardComponent }: CarouselPropType<T>) => {
    const screenWidth = Dimensions.get('screen').width
    const theme = useTheme();
    return (
        <View style={theme.colors}>
            <FlatList
                data={data}
                renderItem={({ item, index }) => <CardComponent data={item} />}
                keyExtractor={(item: any) => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                initialNumToRender={3}
                maxToRenderPerBatch={3}
                initialScrollIndex={index}
                getItemLayout={(_, index) => ({
                    length: screenWidth,
                    offset: screenWidth * index,
                    index
                })}
            />
        </View>
    )
}

export default Carousel;