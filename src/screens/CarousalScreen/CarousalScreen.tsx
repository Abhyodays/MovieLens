import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { MainStackParamList } from "../../navigators/MainStack"
import Carousel from "../../components/Carousel/Carousel"
import { useMovieImages } from "../../hooks/useMovieQueries"
import ImageSlide from "../../components/ImageSlide/ImageSlide"

type ScreenProps = {
    route: {
        params: {
            title?: string,
            id?: number | string,
            movieId: number,
        }
    }
}

const CarousalScreen = ({ route }: ScreenProps) => {
    const { id, title, movieId } = route.params;
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const { data: imagesData } = useMovieImages(movieId);
    const images: any[] = imagesData?.backdrops.map((image: any) => ({ path: image.file_path, id: image.file_path }))
    let index = images.findIndex(i => i.path === id);
    index = index === -1 ? 0 : index;


    useEffect(() => {
        navigation.setOptions({
            title
        })
    }, [])

    return (
        <View>
            <Carousel
                data={images}
                index={index}
                CardComponent={ImageSlide}
            />
        </View>
    )
}

export default CarousalScreen;