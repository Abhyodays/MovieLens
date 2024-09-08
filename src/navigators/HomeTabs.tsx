import Home from "../screens/Home/Home";
import Discover from "../screens/Discover/Discover";
import Profile from "../screens/Profile/Profile";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from "../constants/Colors";
export type HomeTabsParamList = {
    Home: undefined,
    Discover: undefined,
    Profile: undefined
}
const HomeTabs = () => {
    const Tabs = createMaterialBottomTabNavigator<HomeTabsParamList>();
    return (
        <Tabs.Navigator initialRouteName="Home"
            activeColor={Colors.primary}
            inactiveColor={Colors.white}
            barStyle={{ backgroundColor: Colors.black }}
            activeIndicatorStyle={{ backgroundColor: Colors.black, height: 50 }}
        >
            <Tabs.Screen name="Home" component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home-outline" color={color} size={30} />
                    ),
                }} />
            <Tabs.Screen name="Discover" component={Discover}
                options={{
                    tabBarLabel: 'Discover',
                    tabBarIcon: ({ color }) => (
                        <Icon name="albums-outline" color={color} size={30} />
                    ),
                }} />
            <Tabs.Screen name="Profile" component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Icon name="person-outline" color={color} size={30} />
                    ),
                }} />
        </Tabs.Navigator>
    )
}

export default HomeTabs;