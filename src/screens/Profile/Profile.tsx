import { Button, Text, View } from "react-native"
import { useTheme } from "../../contexts/ThemeContext"

const Profile = () => {
    const { toggleTheme } = useTheme()
    return (
        <View>
            <Text>Profile</Text>
            <Button title="toggle theme" onPress={() => toggleTheme()} />
        </View>
    )
}

export default Profile;