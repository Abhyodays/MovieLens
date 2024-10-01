import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useTheme } from "../../contexts/ThemeContext"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { MainStackParamList } from "../../navigators/MainStack"
import Styles from "../../Styles"
import Colors from "../../constants/Colors"

const Profile = () => {
    const { toggleTheme, colors } = useTheme()
    return (
        <View style={[Styles.container, colors]}>
            <TouchableOpacity onPress={toggleTheme}>
                <View style={styles.card}>
                    <Text style={[{ color: colors.color }, styles.card_text]}>Change Theme</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 55,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.gray,
        justifyContent: 'center'
    },
    card_text: {
        fontSize: 16
    }
})
export default Profile;