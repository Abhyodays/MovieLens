import { useEffect } from "react"
import { Text, View } from "react-native"
const Discover = () => {
    useEffect(() => {
        const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2UyY2EzZmU1NmM1Y2EzMzk4NWZiNWVjYTk0ZjVkMyIsIm5iZiI6MTcyNjEyOTg3My41NTM2ODIsInN1YiI6IjY2ZDk4MDgzMTY1NWRhZTA0MTAxOTJlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pyyWati1Pnsg6FPAISuqSGsuLd5ZAv_bXc0okGU-UKE'
            }
        };

        async function loadData() {
            try {
                const res = await fetch(url, options);
                const data = await res.json();
                console.log(data)
            } catch (err) {
                console.log(err);
            }

        }
        loadData();
    }, [])
    return (
        <View><Text>Discover</Text></View>
    )
}

export default Discover