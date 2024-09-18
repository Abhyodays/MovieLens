import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Colors from "../../constants/Colors"

type NavigationButtonPropType = {
    title: string,
    handlePress: () => void
}
const NavigationButton = ({ title, handlePress }: NavigationButtonPropType) => {
    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.container}>
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.gray,
        padding: 10,
        minWidth: Dimensions.get('screen').width / 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    text: {
        fontSize: 16,
        color: Colors.black
    }
})
export default NavigationButton;