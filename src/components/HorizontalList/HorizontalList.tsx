import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native"
import { FlatList, ScrollView } from "react-native-gesture-handler"
import { useTheme } from "../../contexts/ThemeContext"
import React from "react"
import Loader from "../Loader/Loader";

type HorizontalListPropType<T> = {
    data: T[];
    onEnd?: () => void;
    CardComponent: (props: { data: T, customStyles: object }) => React.ReactNode;
    isFetching?: boolean,
    isLoading?: boolean
};

const HorizontalList = <T,>({ data, onEnd, CardComponent, isLoading, isFetching }: HorizontalListPropType<T>) => {
    const screenWidth = Math.round(Dimensions.get("screen").width / 2.5);
    const theme = useTheme();
    if (isLoading) {
        return (
            <View style={{ flexDirection: 'row', marginLeft: 20, gap: 80 }}>
                {Array.from({ length: 3 }).map((_, index) => <Loader.ShowCard key={index} />)}
            </View>
        )
    }
    return (
        <View style={theme.colors}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <CardComponent data={item} customStyles={{ width: screenWidth }} />
                )}
                keyExtractor={(item: any) => item.unique_id}
                horizontal
                contentContainerStyle={styles.content_container}
                showsHorizontalScrollIndicator={false}
                onEndReached={onEnd}
                onEndReachedThreshold={0.5}
                initialNumToRender={5}
                windowSize={20}
                ListFooterComponent={() => {
                    if (isFetching) {
                        return (
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <ActivityIndicator color={theme.colors.color} size={40} />
                            </View>
                        )
                    }
                }}
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