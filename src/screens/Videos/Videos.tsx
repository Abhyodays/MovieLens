import { StackScreenProps } from "@react-navigation/stack"
import React, { FC, useEffect, useState } from "react"
import { AppState, FlatList, NativeModules, StyleSheet, Text, View } from "react-native"
import { MainStackParamList } from "../../navigators/MainStack"
import { useTheme } from "../../contexts/ThemeContext"
import YoutubePlayer from 'react-native-youtube-iframe'
import { useMovieVideos } from "../../hooks/useMovieQueries"
import { Video } from "../../types/Video"
import PlaylistItem from "../../components/PlaylistItem/PlaylistItem"
import Colors from "../../constants/Colors"

type VideosPropType = StackScreenProps<MainStackParamList, "Videos">

const Videos: FC<VideosPropType> = ({ route }) => {
    const { moviedId } = route.params
    const { data: videos, isLoading } = useMovieVideos(moviedId);
    const playlist = videos?.map(v => v.key);
    const [selectedVideo, setSelectedVideo] = useState<Video>();
    const theme = useTheme();
    const onPressItem = (video: Video) => {
        setSelectedVideo(video);
    }
    useEffect(() => {
        if (videos?.length) {
            setSelectedVideo(videos[0])
        }
    }, [videos])

    return (
        <View style={[styles.container, theme.colors]}>
            <YoutubePlayer
                height={240}
                videoId={selectedVideo?.key}
                play={true}
                mute={true}
            />
            <View style={[styles.details_card, theme.colors]}>
                <Text style={[styles.title, { color: theme.colors.color }]}>{selectedVideo?.name}</Text>
                <Text style={styles.date}>{new Date(selectedVideo?.published_at!).toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" })}</Text>
            </View>
            <FlatList
                data={videos}
                renderItem={({ item }) => <PlaylistItem data={item} onPressItem={onPressItem} selectedItem={selectedVideo} />}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    details_card: {
        padding: 10,
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1,
        paddingBottom: 20,
    },
    title: {
        fontSize: 18
    },
    date: {
        color: Colors.gray,
        fontSize: 14
    }
})
export default Videos;