import { Dimensions, Text, View } from "react-native"
import { Skeleton } from 'moti/skeleton'
import { MotiView } from 'moti'
import { useTheme } from "../../contexts/ThemeContext"


export const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />
const Loader = () => {
    return (
        <View></View>
    )
}
Loader.ShowCard = () => {
    const theme = useTheme();
    const colorMode = theme.theme
    return (
        <MotiView
            transition={{
                type: 'timing'
            }}
            style={{ height: 200, width: 100 }}
            animate={{ backgroundColor: theme.colors.backgroundColor }}
        >
            <Skeleton colorMode={colorMode} radius="square" height={170} width={160} />
            <Spacer height={10} />
            <Skeleton colorMode={colorMode} radius="square" height={16} width={160} />
        </MotiView>
    )
}

Loader.Carousel = ({ height }: { height?: number }) => {
    const theme = useTheme();
    const colorMode = theme.theme
    return (
        <MotiView
            transition={{
                type: 'timing'
            }}
            style={{ height: height ? height : 400, width: Dimensions.get("screen").width }}
            animate={{ backgroundColor: theme.colors.backgroundColor }}
        >
            <Skeleton colorMode={colorMode} radius="square" height={"100%"} width={"100%"} />
        </MotiView>
    )
}
export default Loader;