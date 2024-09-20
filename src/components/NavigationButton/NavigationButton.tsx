import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Colors from "../../constants/Colors"
import { useTheme } from "../../contexts/ThemeContext"

type NavigationButtonPropType = {
    title: string,
    handlePress: () => void
}
const NavigationButton = ({ title, handlePress }: NavigationButtonPropType) => {
    const theme = useTheme();
    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.container}>
                <Text style={[styles.text, { color: theme.colors.color }]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        padding: 10,
        minWidth: Dimensions.get('screen').width / 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    text: {
        fontSize: 16,
        color: Colors.black,
        fontWeight: 'bold'
    }
})
export default NavigationButton;