import { Dimensions, Image, Text, View } from "react-native";

type ImageSlidePropType = {
    data: {
        path: string
    }
}
const ImageSlide = ({ data }: ImageSlidePropType) => {
    const width = Dimensions.get('screen').width
    return (
        <View style={{ width }}>
            <Image source={{ uri: `${process.env.IMAGE_POSTER_URI}${data.path}` }} style={{ height: '100%', width: '100%' }} resizeMode="contain" />
        </View>
    )
}

export default ImageSlide;