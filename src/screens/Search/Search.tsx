import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { InteractionManager, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { MainStackParamList } from "../../navigators/MainStack";
import { useTheme } from "../../contexts/ThemeContext";
import Colors from "../../constants/Colors";
import Icon from "react-native-vector-icons/AntDesign";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { useSearchMovies } from "../../hooks/useMovieQueries";
import CardGrid from "../../components/CardGrid/CardGrid";
import { ActivityIndicator } from "react-native-paper";

const Search = () => {
    const theme = useTheme();
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const inputRef = useRef<TextInput>(null);
    const [input, setInput] = useState<string>("");
    const [debouncedInput, setDebouncedInput] = useState<string>("");
    // debounced input search
    useEffect(() => {
        const id = setTimeout(() => {
            setDebouncedInput(input);
        }, 300);
        return (() => clearTimeout(id))
    }, [input]);

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            inputRef.current?.focus();
        });
    }, []);
    const handleChangeText = (text: string) => {
        setInput(text)
    }
    const handleCancel = () => {
        navigation.goBack();
    }
    const { data, loadMore, isLoading } = useSearchMovies(debouncedInput);
    const movies = data?.pages.flatMap(p => p.results) || [];

    return (
        <View style={[theme.colors, { flex: 1 }]}>
            <View style={styles.header}>
                <View style={styles.search_bar}>
                    <View style={styles.search_sub}>
                        <Icon name="search1" size={24} color={Colors.black} />
                        <TextInput style={styles.search_input} placeholder="Search movies here..." ref={inputRef} onChangeText={handleChangeText} />
                    </View>
                    {isLoading && <ActivityIndicator style={styles.activity} color={Colors.gray} />}
                </View>
                <TouchableOpacity activeOpacity={0.5} onPress={handleCancel}>
                    <Text style={styles.cancel_text}>Cancel</Text>
                </TouchableOpacity>
            </View>
            <CardGrid data={movies} loadMore={loadMore} />
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        height: 70,
        marginBottom: 30,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    search_bar: {
        flex: 1,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        borderRadius: 30,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        justifyContent: 'space-between'
    },
    search_sub: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    search_input: {
        fontSize: 16,
        marginLeft: 5,
        flex: 0.8,
        color: Colors.black
    },
    cancel_text: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10
    },
    activity: {
        flex: 0.2,
    }
});
export default Search;