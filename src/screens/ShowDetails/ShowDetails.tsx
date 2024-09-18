
import { ImageBackground, StatusBar, StyleSheet, Text, View, ScrollView } from "react-native"

import { useMovieCredits, useMovieDetails } from "../../hooks/useMovieQueries"
import Colors from "../../constants/Colors"
import Icon from 'react-native-vector-icons/AntDesign'
import NavigationButton from "../../components/NavigationButton/NavigationButton"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { MainStackParamList } from "../../navigators/MainStack"

type ShowDetailsPropType = {
    route: {
        params: {
            id: number
        }
    }
}
const ShowDetails = ({ route }: ShowDetailsPropType) => {
    const { id } = route.params;
    const { data } = useMovieDetails(id);
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const release_date = new Date(data?.release_date).toLocaleDateString('en-US', { year: "numeric", month: "long", day: "numeric" })
    const gotoAwards = () => {

    }
    const gotoCast = () => {
        navigation.navigate('Cast');
    }
    const gotoRatings = () => {
        navigation.navigate('Ratings');
    }
    const credits = useMovieCredits(id);
    console.log("credits:", credits.data?.cast)
    return (
        <ScrollView style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.blur} translucent={true} />
            <ImageBackground source={{ uri: `${process.env.IMAGE_POSTER_URI}${data?.poster_path}` }} style={styles.posterImage} resizeMode="cover">
                <View style={styles.overlay}>
                    <Text style={styles.title}>{data?.title}</Text>
                    <View style={[styles.flex_row, { gap: 20 }]}>
                        <View style={styles.flex_row}>
                            <Icon name="clockcircleo" color={Colors.primary} size={15} />
                            <Text style={styles.gold_text}>{data?.runtime} minutes</Text>
                        </View>
                        <View style={styles.flex_row}>
                            <Icon name="star" color={Colors.primary} />
                            <Text style={styles.gold_text}>{data?.vote_average.toFixed(1)}</Text>
                        </View>
                    </View>
                    <Text style={styles.overview}>{data?.overview}</Text>
                </View>
            </ImageBackground>
            <View style={styles.container}>
                <View style={[styles.flex_row, styles.navigation_button_container]}>
                    <NavigationButton title="Rating" handlePress={gotoRatings} />
                    <NavigationButton title="Awards" handlePress={gotoAwards} />
                    <NavigationButton title="Cast" handlePress={gotoCast} />
                </View>
                <View >
                    <Text style={styles.heading}>Release date</Text>
                    <Text>{release_date}</Text>
                    <Text style={styles.heading}>Director:</Text>
                    <Text>{release_date}</Text>
                    <Text style={styles.heading}>Cast:</Text>
                    <Text>{release_date}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    posterImage: {
        paddingTop: StatusBar.currentHeight,
        height: 400,
        width: '100%'
    },
    overlay: {
        backgroundColor: Colors.blur,
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
        paddingBottom: 20
    },
    title: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5
    },
    overview: {
        color: Colors.white,
        fontSize: 15
    },
    flex_row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    gold_text: {
        color: Colors.primary
    },
    navigation_button_container: {
        justifyContent: 'center',
        marginTop: 15,
        gap: 40,
        marginHorizontal: 20
    },
    container: {
        paddingHorizontal: 20
    },
    heading: {
        fontSize: 16,
        color: Colors.black,
        fontWeight: '500',
        marginTop: 10
    },
    value: {
        fontSize: 16,
        color: Colors.gray
    }
})
export default ShowDetails;