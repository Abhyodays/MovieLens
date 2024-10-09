import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useTheme } from "../../contexts/ThemeContext"
import Styles from "../../Styles"
import Colors from "../../constants/Colors"
import { Button } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { MainStackParamList } from "../../navigators/MainStack"
import Loader from "../../components/Loader/Loader"

const Profile = () => {
    const { toggleTheme, colors } = useTheme();
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const handleLogin = () => {
        navigation.navigate("SignUp")
    }

    return (
        <View style={[Styles.container, colors]}>
            <TouchableOpacity onPress={toggleTheme}>
                <View style={styles.card}>
                    <Text style={[{ color: colors.color }, styles.card_text]}>Change Theme</Text>
                </View>
            </TouchableOpacity>
            <Button title="Login" onPress={handleLogin} />
            <Loader.ShowCard />
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