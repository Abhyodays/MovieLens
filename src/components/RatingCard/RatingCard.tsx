import { Animated, Dimensions, Easing, LayoutChangeEvent, Pressable, StyleSheet, Text, View } from "react-native";
import { Rating } from "../../types/Rating";
import { memo, useEffect, useMemo, useRef } from "react";
import AvatarIcon from "../AvatarIcon/AvatarIcon";
import { useTheme } from "../../contexts/ThemeContext";
import Icon from 'react-native-vector-icons/AntDesign'
import Colors from "../../constants/Colors";

type RatingCardPropType = {
    data: Rating,
    expand: string,
    onPress: (id: string) => void
}

const RatingCard = ({ data, expand, onPress }: RatingCardPropType) => {
    const isExpand = useMemo(() => { return data.id === expand }, [expand]);
    const heightRef = useRef(new Animated.Value(0)).current;
    const textHeightRef = useRef(0);
    const theme = useTheme();
    const minHeight = 150

    const handleLayoutChange = (event: LayoutChangeEvent) => {
        textHeightRef.current = Math.max(minHeight, event.nativeEvent.layout.height)
    }
    useEffect(() => {
        if (isExpand) {
            Animated.timing(heightRef, {
                toValue: 1,
                useNativeDriver: false,
                duration: 1000,
            }).start()
        }
    }, [isExpand])

    return (
        <Pressable onPress={() => onPress(data.id)}>
            <Animated.View style={[styles.animated_container, {
                height: heightRef.interpolate({
                    inputRange: [0, 1],
                    outputRange: [minHeight, textHeightRef.current]
                }),
                borderColor: theme.colors.color
            }]}>

                <View onLayout={handleLayoutChange} style={styles.text_container}>
                    <View style={styles.header}>
                        <AvatarIcon style={styles.avatar} />
                        <View>
                            <Text style={[{ color: theme.colors.color }, styles.header_name]}>{data.author_details.username}</Text>
                            <View style={styles.flex_row}>
                                <Icon name="star" color={Colors.primary} size={16} />
                                <Text style={{ color: theme.colors.color }}> <Text style={styles.rating}>{data.author_details.rating ?? '_'}</Text>/10</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={[styles.content, { color: theme.colors.color }]}>{data.content}</Text>
                </View>
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    animated_container: {
        width: Math.floor(Dimensions.get('window').width),
        minHeight: 100,
        overflow: 'hidden',
        borderBottomWidth: 0.5,
    },
    text_container: {
        position: 'absolute',
        left: 20,
        right: 20,
        top: 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 25
    },
    header_name: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    content: {
        fontSize: 18
    },
    flex_row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rating: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})
export default memo(RatingCard);