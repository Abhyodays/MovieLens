import { Image, StyleProp, Text, TouchableOpacity, View, ViewStyle } from "react-native"
import { Show } from "../../types/Show"
import { StyleSheet } from "react-native"
import { useTheme } from "../../contexts/ThemeContext"
import { memo } from "react"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { MainStackParamList } from "../../navigators/MainStack"

type ShowCardPropType = {
    data: Show,
    customStyles?: StyleProp<ViewStyle>
}
const ShowCard = ({ data, customStyles }: ShowCardPropType) => {
    const theme = useTheme();
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>()
    const gotoDetails = () => {
        navigation.navigate("ShowDetails", { id: data.id })
    }
    return (
        <TouchableOpacity onPress={gotoDetails} activeOpacity={0.7}>
            <View style={[styles.container, customStyles]}>
                <Image source={{ uri: `${process.env.IMAGE_URI}${data.poster_path}` }} style={styles.card_image} resizeMode="cover" />
                <Text numberOfLines={2} style={[styles.card_title, theme.colors]}>{data.name || data.title}</Text>
            </View>
        </TouchableOpacity>
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

export default memo(ShowCard)