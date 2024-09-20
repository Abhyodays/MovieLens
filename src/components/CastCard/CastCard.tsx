import { memo } from "react"
import { Dimensions, Image, StyleSheet, Text, View } from "react-native"
import { useTheme } from "../../contexts/ThemeContext"

type CastCardProp = {
    name: string,
    character?: string,
    profile_path: string
}
const CastCard = ({ name, character, profile_path }: CastCardProp) => {
    const theme = useTheme();
    return (
        <View style={[styles.container, theme.colors]}>
            <Image source={{ uri: `${process.env.IMAGE_URI}${profile_path}` }} resizeMode="cover" style={styles.profile} />
            <Text style={[styles.name, { color: theme.colors.color }]}>{name}</Text>
            <Text style={[{ color: theme.colors.color }]} numberOfLines={1}>{character}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: Math.floor((Dimensions.get('screen').width - 60) / 3),
    },
    profile: {
        width: '100%',
        height: '70%',
        borderRadius: 5
    },
    name: {
        fontWeight: 'bold'
    }

})

export default memo(CastCard)