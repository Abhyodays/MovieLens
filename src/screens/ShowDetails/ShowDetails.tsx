
import { ImageBackground, StatusBar, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native"

import { useMovieCredits, useMovieDetails, useMovieImages } from "../../hooks/useMovieQueries"
import Colors from "../../constants/Colors"
import Icon from 'react-native-vector-icons/AntDesign'
import NavigationButton from "../../components/NavigationButton/NavigationButton"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { MainStackParamList } from "../../navigators/MainStack"
import { useTheme } from "../../contexts/ThemeContext"
import ListHeader from "../../components/ListHeader/ListHeader"
import HorizontalList from "../../components/HorizontalList/HorizontalList"
import ImageCard from "../../components/ImageCard/ImageCard"
import Loader from "../../components/Loader/Loader"

type ShowDetailsPropType = {
    route: {
        params: {
            id: string
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
        navigation.navigate('Cast', { id });
    }
    const gotoRatings = () => {
        navigation.navigate('Ratings', { id });
    }
    const gotoImageCarousel = () => {
        navigation.navigate("CarousalScreen", { movieId: id, title: 'Images', id })
    }
    const { data: credits } = useMovieCredits(id);
    const actors = credits?.cast.filter((c: any) => c.known_for_department.toLowerCase() === "acting").slice(0, 2).map((a: any) => a.name)?.join(", ")
    const director = credits?.crew.find((c: any) => c.department === "Directing");
    const { data: imagesData, isLoading: isImagesLoading } = useMovieImages(id);
    const images = imagesData?.backdrops.map((image: any) => ({ path: image.file_path, id: image.file_path, movieId: id }));
    const theme = useTheme();
    return (
        <ScrollView style={[{ flex: 1 }, theme.colors]}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.blur} translucent={true} />
            {
                isImagesLoading
                    ? <View style={styles.posterImage}>
                        <Loader.Carousel height={200} />
                    </View>
                    : <ImageBackground source={{ uri: `${process.env.IMAGE_POSTER_URI}${data?.poster_path}` }} style={styles.posterImage} resizeMode="cover">
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
            }
            <View style={styles.container}>
                <View style={[styles.flex_row, styles.navigation_button_container]}>
                    <NavigationButton title="Rating" handlePress={gotoRatings} />
                    <NavigationButton title="Cast" handlePress={gotoCast} />
                    <NavigationButton title="Videos" handlePress={gotoAwards} />
                </View>
                <Text style={[styles.heading, styles.text, theme.colors]}>Release date</Text>
                <Text style={[styles.text]}>{release_date}</Text>
                <Text style={[styles.heading, styles.text, theme.colors]}>Director:</Text>
                <Text style={[styles.text]}>{director?.name}</Text>
                <View style={[styles.flex_row, styles.flex_center]}>
                    <View>
                        <Text style={[styles.heading, styles.text, theme.colors]}>Cast:</Text>
                        <Text style={styles.text}>{actors}</Text>
                    </View>
                    <Icon name="right" style={[styles.right_icon, { color: theme.colors.color }]} onPress={gotoCast} />
                </View>
            </View>
            <ListHeader title="Photos" onSeeMore={gotoImageCarousel} />
            <HorizontalList data={images} CardComponent={ImageCard} isLoading={isImagesLoading} />


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
    text: {
        fontSize: 16,
        color: Colors.gray
    },
    heading: {
        fontWeight: '500',
        marginTop: 10
    },
    value: {
        fontSize: 16,
        color: Colors.gray
    },
    right_icon: {
        fontSize: 24,
        color: Colors.black
    },
    flex_center: {
        justifyContent: 'space-between'
    }
})
export default ShowDetails;