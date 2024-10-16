import { View } from "moti"
import { ShowDetail } from "../../types/ShowDetail"
import ShowCard from "../ShowCard/ShowCard"
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Dimensions, StyleSheet } from "react-native"
import Colors from "../../constants/Colors"

type WatchlistItemPropType = {
    data: ShowDetail,
    onPress?: () => void
}
const WatchlistItem = ({ data, onPress }: WatchlistItemPropType) => {
    const width = Math.floor(Dimensions.get('window').width / 3 - 20)
    return (
        <View>
            <Icon name="cancel" style={styles.cancel_icon} onPress={onPress} />
            <ShowCard data={data} customStyles={{ width }} />
        </View>
    )
}
const styles = StyleSheet.create({
    cancel_icon: {
        color: Colors.white,
        fontSize: 24,
        position: 'absolute',
        right: 5,
        top: 2,
        zIndex: 100
    }
})
export default WatchlistItem;