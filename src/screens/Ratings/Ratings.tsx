import { Text, View } from "react-native"
import { useMovieReviews } from "../../hooks/useMovieQueries";
import { FlatList } from "react-native-gesture-handler";
import RatingCard from "../../components/RatingCard/RatingCard";
import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";

type RatingsPropType = {
    route: {
        params: {
            id: string
        }
    }
}
const Ratings = ({ route }: RatingsPropType) => {
    const { data } = useMovieReviews(route.params.id);
    const [expand, setExpand] = useState<string>("");

    const handlePress = (id: string) => {
        setExpand(id);
    }
    const theme = useTheme();

    return (
        <View>
            <FlatList
                data={data?.results}
                renderItem={({ item }) => <RatingCard data={item} expand={expand} onPress={handlePress} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={[{ alignItems: 'center' }, theme.colors]}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default Ratings;