import { Image, StyleProp, Text, View, ViewStyle } from "react-native"
import { Show } from "../../types/Show"
import { StyleSheet } from "react-native"
import Colors from "../../constants/Colors"
import { Dimensions } from "react-native"
import { useTheme } from "../../contexts/ThemeContext"

type ShowCardPropType = {
    data: Show,
    customStyles?: StyleProp<ViewStyle>
}
const ShowCard = ({ data, customStyles }: ShowCardPropType) => {
    const theme = useTheme();
    return (
        <View style={[styles.container, customStyles]}>
            <Image source={{ uri: `${process.env.IMAGE_URI}${data.poster_path}` }} style={styles.card_image} resizeMode="cover" />
            <Text numberOfLines={2} style={[styles.card_title, theme.colors]}>{data.name || data.title}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    card_image: {
        borderRadius: 10,
        width: '100%',
        aspectRatio: 3 / 4,
        marginBottom: 5,
    },
    container: {
        width: 200,
    },
    card_title: {
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: '500',
        marginTop: 10
    }
})

export default ShowCard