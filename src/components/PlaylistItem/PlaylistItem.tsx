import { Text, View } from "moti"
import { FC, useMemo } from "react"
import { Video } from "../../types/Video"
import { Image, StyleSheet, TouchableOpacity } from "react-native"
import Colors from "../../constants/Colors"
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from "../../contexts/ThemeContext"

type PlaylistItemPropType = {
    data: Video,
    onPressItem: (video: Video) => void,
    selectedItem?: Video
}
const PlaylistItem: FC<PlaylistItemPropType> = ({ data, onPressItem, selectedItem }) => {
    const isSelectedItem = selectedItem?.key === data.key
    const theme = useTheme()
    const style = useMemo(() => {
        if (theme.theme === "dark") {
            return {
                backgroundColor: isSelectedItem ? Colors.dark_blue : Colors.black,
                color: theme.colors.color
            }
        }
        return {
            backgroundColor: isSelectedItem ? Colors.peach : Colors.white,
            color: Colors.dark_gray
        }
    }, [theme, isSelectedItem])

    return (
        <TouchableOpacity onPress={() => onPressItem(data)}>
            <View style={[styles.container, { backgroundColor: style.backgroundColor }]}>
                <View style={styles.flex_row}>
                    <Image source={{ uri: `${process.env.YOUTUBE_THUMBNAIL_URI}/${data.key}/0.jpg` }} style={styles.thumbnail} resizeMode="cover" />
                    <Text style={[styles.card_text, { color: style.color }]} numberOfLines={1}>{data.name}</Text>
                </View>
                {
                    isSelectedItem && <Icon name="play" color={style.color} size={24} />
                }
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: Colors.gray,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    card_text: {
        fontSize: 18,
        width: '65%'
    },
    thumbnail: {
        height: 70,
        aspectRatio: 4 / 3,
        borderRadius: 10
    },
    flex_row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    }
})

export default PlaylistItem;