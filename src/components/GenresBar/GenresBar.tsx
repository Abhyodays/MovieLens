import { Text, View } from "react-native";
import { useMovieGenres } from "../../hooks/useMovieQueries";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import HorizontalList from "../HorizontalList/HorizontalList";
import NavigationButton from "../NavigationButton/NavigationButton";
import { useMemo, useState } from "react";
import { ColorSpace } from "react-native-reanimated";
import { Genre } from "../../types/Genre";
import React from "react";

export type GenreBarPropType = {
    genres: Genre[],
    selectedGenres: Set<number>,
    handlePress: (id: number) => void

}
const GenresBar = ({ genres, selectedGenres, handlePress }: GenreBarPropType) => {
    return (
        <View>
            <FlatList
                horizontal={true}
                data={genres}
                renderItem={({ item }) => <NavigationButton title={item.name} handlePress={() => handlePress(item.id)} disabled={selectedGenres.has(item.id)} />}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ gap: 10, marginBottom: 10 }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )

}

export default React.memo(GenresBar);