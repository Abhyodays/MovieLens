import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Colors from "../../constants/Colors"
import { useTheme } from "../../contexts/ThemeContext"

type NavigationButtonPropType = {
    title: string,
    handlePress: () => void,
    disabled?: boolean
}
const NavigationButton = ({ title, handlePress, disabled = false }: NavigationButtonPropType) => {
    const theme = useTheme();
    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={[styles.container, { backgroundColor: disabled ? Colors.white : Colors.primary }]}>
                <Text style={[styles.text, { color: disabled ? Colors.primary : Colors.white }]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        minWidth: Dimensions.get('screen').width / 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.primary
    },
    text: {
        fontSize: 16,
        color: Colors.black,
        fontWeight: 'bold'
    }
})
export default NavigationButton;