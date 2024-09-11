import { createStackNavigator } from "@react-navigation/stack"
import HomeTabs from "./HomeTabs"
import ShowDetails from "../screens/ShowDetails/ShowDetails"
import Cast from "../screens/Cast/Cast"
import Ratings from "../screens/Ratings/Ratings"
import Watchlist from "../screens/Watchlist/Watchlist"
import ShowGrid from "../screens/ShowGrid/ShowGrid"
import { useTheme } from "../contexts/ThemeContext"

export type MainStackParamList = {
    HomeTabs: undefined,
    ShowDetails: { id: number },
    Ratings: undefined,
    Cast: undefined,
    Watchlist: undefined,
    ShowGrid: { title?: string, query?: string }

}
const MainStack = () => {
    const Stack = createStackNavigator<MainStackParamList>();
    const theme = useTheme();
    return (
        <Stack.Navigator initialRouteName="HomeTabs" screenOptions={{ headerTintColor: theme.colors.color, headerStyle: { backgroundColor: theme.colors.backgroundColor } }}>
            <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
            <Stack.Screen name="ShowDetails" component={ShowDetails} options={{ headerShown: false }} />
            <Stack.Screen name="Cast" component={Cast} />
            <Stack.Screen name="Ratings" component={Ratings} />
            <Stack.Screen name="Watchlist" component={Watchlist} />
            <Stack.Screen name="ShowGrid" component={ShowGrid} />
        </Stack.Navigator>
    )
}

export default MainStack;