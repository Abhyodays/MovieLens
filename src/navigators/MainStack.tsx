import { createStackNavigator } from "@react-navigation/stack"
import HomeTabs from "./HomeTabs"
import ShowDetails from "../screens/ShowDetails/ShowDetails"
import Cast from "../screens/Cast/Cast"
import Ratings from "../screens/Ratings/Ratings"
import Watchlist from "../screens/Watchlist/Watchlist"
import ShowGrid from "../screens/ShowGrid/ShowGrid"
import { useTheme } from "../contexts/ThemeContext"
import { MediaType } from "../types/MediaType"
import CarousalScreen from "../screens/CarousalScreen/CarousalScreen"
import Search from "../screens/Search/Search"
import SignUp from "../screens/SignUp/SignUp"
import Login from "../screens/Login/Login"

export type MainStackParamList = {
    HomeTabs: undefined,
    ShowDetails: { id: string },
    Ratings: { id: string },
    Cast: { id: string },
    Watchlist: undefined,
    ShowGrid: { title?: string, query?: string },
    CarousalScreen: { title?: string, id: string, movieId: string }
    Search: undefined,
    SignIn: undefined,
    SignUp: undefined
}
const MainStack = () => {
    const Stack = createStackNavigator<MainStackParamList>();
    const theme = useTheme();
    return (
        <Stack.Navigator initialRouteName="HomeTabs" screenOptions={{ headerTintColor: theme.colors.color, headerStyle: { backgroundColor: theme.colors.backgroundColor } }}>
            <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
            <Stack.Screen name="ShowDetails" component={ShowDetails} options={{ headerShown: false }} />
            <Stack.Screen name="Cast" component={Cast} />
            <Stack.Screen name="Ratings" component={Ratings} options={{ title: 'User Reviews' }} />
            <Stack.Screen name="Watchlist" component={Watchlist} />
            <Stack.Screen name="ShowGrid" component={ShowGrid} />
            <Stack.Screen name="CarousalScreen" component={CarousalScreen} />
            <Stack.Screen name="Search" component={Search} options={{ headerShown: false, animationEnabled: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ title: "Sign Up" }} />
            <Stack.Screen name="SignIn" component={Login} options={{ title: "Login" }} />
        </Stack.Navigator>
    )
}

export default MainStack;