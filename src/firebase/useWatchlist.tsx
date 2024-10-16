import { useCallback, useEffect, useState } from "react"
import { ShowDetail } from "../types/ShowDetail"
import { useFirebaseContext } from "./FirebaseContext";
import firestore from '@react-native-firebase/firestore'
import Snackbar from "react-native-snackbar";


const useWatchlist = () => {
    const [watchlist, setWatchlist] = useState<ShowDetail[]>([]);
    const { firebase, isLoggedIn } = useFirebaseContext();
    const user = firebase.account.currentUser;

    const getWatchlistMovies = useCallback(async (): Promise<void> => {
        try {
            if (!user) {
                console.log("User not logged in");
                return;
            }

            const userDoc = await firestore().collection('User').doc(user.email!).get();

            if (!userDoc.exists) {
                console.log("User document does not exist");
                return;
            }

            const data = userDoc.data();
            if (!data || !data.movies) {
                console.log("No movies in wishlist");
                return;
            }
            setWatchlist(data.movies as ShowDetail[])
            return;

        } catch (error) {
            console.error("Error fetching wishlist movies:", error);
            return;
        }
    }, [firebase, isLoggedIn])

    useEffect(() => {
        getWatchlistMovies()
    }, [getWatchlistMovies])

    const addToWatchlist = async (movie: ShowDetail) => {
        if (!user) {
            console.log("User not logged in");
            return;
        }
        try {
            const userDocs = firestore().collection("User").doc(user.email!);
            await userDocs.set(
                {
                    movies: firestore.FieldValue.arrayUnion(movie)
                },
                { merge: true }
            );

            console.log("Added to wishlist.");
            Snackbar.show({
                text: "Added to wishlist.",
                duration: Snackbar.LENGTH_SHORT,
            });
            await getWatchlistMovies();
        } catch (error) {
            console.error("Error adding to wishlist: ", error);
            Snackbar.show({
                text: "Failed to add to wishlist.",
                duration: Snackbar.LENGTH_SHORT,
            });
        }
    }
    const removeFromWatchlist = async (movieId: string) => {
        if (!user) {
            console.log("User not logged in");
            return;
        }

        try {
            const userDocRef = firestore().collection("User").doc(user.email!);
            const userDoc = await userDocRef.get();
            const userData = userDoc.data();

            if (userData && userData.movies) {
                const currentMovies: ShowDetail[] = userData.movies;
                const movieToRemove = currentMovies.find((movie) => movie.id === movieId);

                if (movieToRemove) {
                    await userDocRef.set(
                        {
                            movies: firestore.FieldValue.arrayRemove(movieToRemove)
                        },
                        { merge: true }
                    );
                    Snackbar.show({
                        text: "Removed from wishlist.",
                        duration: Snackbar.LENGTH_SHORT,
                    });
                    await getWatchlistMovies();
                } else {
                    console.log("Movie not found in wishlist.");
                    Snackbar.show({
                        text: "Movie not found in wishlist.",
                        duration: Snackbar.LENGTH_SHORT,
                    });
                }
            }
        } catch (error) {
            console.error("Error removing from wishlist: ", error);
            Snackbar.show({
                text: "Failed to remove from wishlist.",
                duration: Snackbar.LENGTH_SHORT,
            });
        }
    };


    return { watchlist, addToWatchlist, removeFromWatchlist }
}

export default useWatchlist;