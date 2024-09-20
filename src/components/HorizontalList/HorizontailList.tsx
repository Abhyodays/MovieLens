import { Dimensions, StyleSheet, Text, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { useTheme } from "../../contexts/ThemeContext"
import React from "react"

type HorizontalListPropType<T> = {
    data: T[];
    onEnd?: () => void;
    CardComponent: (props: { data: T, customStyles: object }) => React.ReactNode;
};

const HorizontalList = <T,>({ data, onEnd, CardComponent }: HorizontalListPropType<T>) => {
    const screenWidth = Math.round(Dimensions.get("screen").width / 2.5);
    const theme = useTheme();
    return (
        <View style={theme.colors}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <CardComponent data={item} customStyles={{ width: screenWidth }} />
                )}
                keyExtractor={(item: any) => item.id.toString()}
                horizontal
                contentContainerStyle={styles.content_container}
                showsHorizontalScrollIndicator={false}
                onEndReached={onEnd}
                onEndReachedThreshold={0.5}
                initialNumToRender={3}
                maxToRenderPerBatch={3}
                windowSize={5}
                getItemLayout={(data, index) => ({
                    length: screenWidth,
                    offset: screenWidth * index,
                    index,
                })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    content_container: {
        gap: 20,
        paddingLeft: 20,
    },
});

export default HorizontalList;