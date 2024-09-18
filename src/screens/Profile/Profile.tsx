import { Button, Text, View } from "react-native"
import { useTheme } from "../../contexts/ThemeContext"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { MainStackParamList } from "../../navigators/MainStack"

const Profile = () => {
    const { toggleTheme } = useTheme()
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    return (
        <View>
            <Text>Profile</Text>
            <Button title="toggle theme" onPress={() => toggleTheme()} />

            <Button title="Go to details" onPress={() => navigation.navigate("ShowDetails", { id: 5 })} />
        </View>
    )
}

export default Profile;