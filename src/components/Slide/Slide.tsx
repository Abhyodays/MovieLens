import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Colors from "../../constants/Colors"
import { Show } from "../../types/Show"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { MainStackParamList } from "../../navigators/MainStack"

type SlidePropType = {
    data: Show
}

const Slide = ({ data }: SlidePropType) => {
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const gotoDetails = () => {
        navigation.navigate("ShowDetails", { id: data.id })
    }
    return (
        <View style={{ height: 400, width: Dimensions.get("screen").width }}>
            <ImageBackground source={{ uri: `${process.env.IMAGE_POSTER_URI}${data.poster_path}` }} style={{ flex: 1, width: '100%', justifyContent: 'flex-end' }}>
                <View style={styles.poster_details}>
                    <Text style={styles.poster_title}>{data.name || data.title}</Text>
                    <Text numberOfLines={3} style={styles.poster_text}>{data.overview}</Text>
                    <TouchableOpacity style={styles.poster_button} activeOpacity={0.6} onPress={gotoDetails}>
                        <Text style={styles.poster_button_text}>See More</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    poster_text: {
        color: Colors.white,
        fontWeight: '500'
    },
    poster_details: {
        margin: 20,
        flex: .5,
        justifyContent: 'flex-end'
    },
    poster_title: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    poster_button: {
        padding: 7,
        borderRadius: 10,
        backgroundColor: Colors.primary,
        alignSelf: 'flex-start',
        marginTop: 5
    },
    poster_button_text: {
        color: Colors.black,
        fontSize: 16
    }
})

export default Slide;