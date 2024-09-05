import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../screens/Home/Home";
import Discover from "../screens/Discover/Discover";
import Profile from "../screens/Profile/Profile";

export type HomeTabsParamList = {
    Home: undefined,
    Discover: undefined,
    Profile: undefined
}
const HomeTabs = () => {
    const Tabs = createBottomTabNavigator<HomeTabsParamList>();
    return (
        <Tabs.Navigator initialRouteName="Home">
            <Tabs.Screen name="Home" component={Home} />
            <Tabs.Screen name="Discover" component={Discover} />
            <Tabs.Screen name="Profile" component={Profile} />
        </Tabs.Navigator>
    )
}

export default HomeTabs;