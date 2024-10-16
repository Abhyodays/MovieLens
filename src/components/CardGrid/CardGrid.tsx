import { Dimensions, FlatList, StyleSheet, View } from "react-native"
import ShowCard from "../ShowCard/ShowCard";
import { Show } from "../../types/Show";


type CardGridPropType = {
    data: Show[],
    loadMore?: () => void,
}
const CardGrid = ({ data, loadMore }: CardGridPropType) => {

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <ShowCard data={item} customStyles={styles.card_style} />}
            numColumns={3}
            contentContainerStyle={[styles.container]}
            columnWrapperStyle={styles.row}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            keyExtractor={(item) => `${item.id}`}
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

export default CardGrid;