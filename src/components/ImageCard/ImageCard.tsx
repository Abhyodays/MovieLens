import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { memo, useState } from "react"
import { StyleSheet, Image, StyleProp, ViewStyle, View, Touchable, TouchableOpacity, ActivityIndicator } from "react-native"
import { SnackbarProps } from "react-native-paper"
import { MainStackParamList } from "../../navigators/MainStack"
import Colors from "../../constants/Colors"
import Loader from "../Loader/Loader"
import { useTheme } from "../../contexts/ThemeContext"
export type ImageCardPropType = {
    data: {
        path: string,
        movieId: number
    }
}
const ImageCard = ({ data }: ImageCardPropType) => {
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const [loading, setLoading] = useState(true);

    const openCarousel = (id: string) => {
        navigation.navigate("CarousalScreen", { id, title: "Images", movieId: data.movieId })
    }
    const theme = useTheme();
    return (
        <TouchableOpacity onPress={() => openCarousel(data.path)}>
            <View style={styles.container}>
                {
                    loading &&
                    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                        <ActivityIndicator size={"large"} color={theme.colors.color} />
                    </View>
                }
                <Image style={styles.image} source={{ uri: `${process.env.IMAGE_URI}${data?.path}` }} resizeMode="cover" onLoad={() => setLoading(false)} />
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