import { NavigationContainer } from "@react-navigation/native"
import MainStack from "./MainStack"

const ApplicationNavigator = () => {
    return (
        <NavigationContainer>
            <MainStack />
        </NavigationContainer>
    )
}

export default ApplicationNavigator;