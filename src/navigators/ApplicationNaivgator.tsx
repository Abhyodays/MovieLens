import { NavigationContainer } from "@react-navigation/native"
import MainStack from "./MainStack"
import { StatusBar } from "react-native";
import Colors from "../constants/Colors";
import { useTheme } from "../contexts/ThemeContext";

const ApplicationNavigator = () => {
    const theme = useTheme();
    return (
        <NavigationContainer>
            <StatusBar barStyle={theme.theme === "dark" ? "light-content" : "dark-content"} backgroundColor={theme.colors.backgroundColor} />
            <MainStack />
        </NavigationContainer>
    )
}

export default ApplicationNavigator;