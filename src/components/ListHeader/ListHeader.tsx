import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Styles from "../../Styles"
import Colors from "../../constants/Colors"
import { useTheme } from "../../contexts/ThemeContext"

type ListHeaderPropType = {
    title: string,
    onSeeMore: () => void
}
const ListHeader = ({ title, onSeeMore }: ListHeaderPropType) => {
    const theme = useTheme();
    return (
        <View style={[Styles.container, styles.container, theme.colors]}>
            <Text style={[styles.title, styles.text, theme.colors]}>{title}</Text>
            <TouchableOpacity onPress={onSeeMore}>
                <Text style={[styles.text, styles.link]}>See More</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
    },
    title: {
        color: Colors.black,
        fontWeight: 'bold'
    },
    link: {
        color: Colors.primary,
        fontSize: 18
    }
})
export default ListHeader;