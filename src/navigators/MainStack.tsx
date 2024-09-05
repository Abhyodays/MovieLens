import { createStackNavigator } from "@react-navigation/stack"
import HomeTabs from "./HomeTabs"
import ShowDetails from "../screens/ShowDetails/ShowDetails"
import Cast from "../screens/Cast/Cast"
import Ratings from "../screens/Ratings/Ratings"
import Watchlist from "../screens/Watchlist/Watchlist"

export type MainStackParamList = {
    HomeTabs: undefined,
    ShowDetails: undefined,
    Ratings: undefined,
    Cast: undefined,
    Watchlist: undefined
}
const MainStack = () => {
    const Stack = createStackNavigator<MainStackParamList>()
    return (
        <Stack.Navigator initialRouteName="HomeTabs">
            <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
            <Stack.Screen name="ShowDetails" component={ShowDetails} />
            <Stack.Screen name="Cast" component={Cast} />
            <Stack.Screen name="Ratings" component={Ratings} />
            <Stack.Screen name="Watchlist" component={Watchlist} />
        </Stack.Navigator>
    )
}

export default MainStack;