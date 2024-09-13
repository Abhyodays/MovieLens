import axios from "axios";
import { useEffect } from "react"
import { Text, View } from "react-native"
import { movieService } from "../../services/movieService";

const Discover = () => {
    useEffect(() => {

        console.log('====================================');
        console.log("fetching data");
        console.log('====================================');
        movieService.getTrendingShows();
    }, [])
    return (
        <View><Text>Discover</Text></View>
    )
}

export default Discover