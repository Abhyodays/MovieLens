import { Image, ImageStyle, StyleProp, StyleSheet } from "react-native"

type AvatarIconPropType = {
    height?: number,
    width?: number,
    style: StyleProp<ImageStyle>
}
const AvatarIcon = ({ height, width, style }: AvatarIconPropType) => {
    return (
        <Image source={require('../../../assets/images/review_placeholder.jpg')} style={[{ height, width }, style]} />
    )
}

export default AvatarIcon