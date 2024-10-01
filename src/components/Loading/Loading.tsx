import { ActivityIndicator, View } from "react-native"
import { useTheme } from "../../contexts/ThemeContext"

const Loading = () => {
    const theme = useTheme();
    return (
        <ActivityIndicator color={theme.colors.color} size={40} />
    )
}

export default Loading;