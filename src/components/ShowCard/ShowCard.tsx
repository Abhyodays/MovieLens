import { Image, Text, View } from "react-native"
import { Show } from "../../types/Show"
import { StyleSheet } from "react-native"
import Colors from "../../constants/Colors"
import { Dimensions } from "react-native"

type ShowCardPropType = {
    data: Show
}
const ShowCard = ({ data }: ShowCardPropType) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: `${process.env.IMAGE_URI}${data.poster_path}` }} style={styles.card_image} resizeMode="cover" />
            <Text>{data.original_name || data.original_title}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    card_image: {
        borderRadius: 10,
        aspectRatio: 3 / 4,
        width: '100%'
    },
    container: {
        width: 165
    }
})

export default ShowCard