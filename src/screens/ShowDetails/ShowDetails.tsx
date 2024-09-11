import { Dimensions, Image, ImageBackground, StatusBar, Text, View } from "react-native"

type ShowDetailsPropType = {
    route: {
        params: {
            id: number
        }
    }
}
const ShowDetails = ({ route }: ShowDetailsPropType) => {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
        </View>
    )
}

export default ShowDetails;