import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native"
import { MainStackParamList } from "../../navigators/MainStack";
import { StackNavigationProp } from "@react-navigation/stack";

const Home = () => {
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    return (
        <View>
            <Text>Home</Text>
            <Button title="Details" onPress={() => navigation.push('ShowDetails')} />
            <Button title="Cast" onPress={() => navigation.push('Cast')} />
            <Button title="Ratings" onPress={() => navigation.push('Ratings')} />
            <Button title="Watchlist" onPress={() => navigation.push('Watchlist')} />
        </View>
    )
}

export default Home;