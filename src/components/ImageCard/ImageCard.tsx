import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { memo } from "react"
import { StyleSheet, Image, StyleProp, ViewStyle, View, Touchable, TouchableOpacity } from "react-native"
import { SnackbarProps } from "react-native-paper"
import { MainStackParamList } from "../../navigators/MainStack"
export type ImageCardPropType = {
    data: {
        path: string,
        movieId: number
    }
}
const ImageCard = ({ data }: ImageCardPropType) => {
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();

    const openCarousel = (id: string) => {
        navigation.push("CarousalScreen", { id, title: "Images", movieId: data.movieId })
    }
    return (
        <TouchableOpacity onPress={() => openCarousel(data.path)}>
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: `${process.env.IMAGE_URI}${data?.path}` }} resizeMode="cover" />
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 125,
        width: 200,
        borderRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    }
})

export default memo(ImageCard)