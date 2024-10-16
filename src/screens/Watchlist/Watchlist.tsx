import { FlatList, Text, View } from "react-native"
import { useTheme } from "../../contexts/ThemeContext";
import Styles from "../../Styles";
import WatchlistItem from "../../components/WatchlistItem/WatchlistItem";
import useWatchlist from "../../firebase/useWatchlist";

const Watchlist = () => {
    const { watchlist, removeFromWatchlist } = useWatchlist();

    const handlePress = async (id: string) => {
        await removeFromWatchlist(id)
    }
    const theme = useTheme();
    return (
        <View style={[Styles.container, theme.colors]}>
            <FlatList
                data={watchlist}
                renderItem={({ item }) => <WatchlistItem data={item} onPress={() => handlePress(item.id)} />}
                numColumns={3}
                columnWrapperStyle={{ gap: 10 }}
            />
        </View>
    )
}

export default Watchlist;