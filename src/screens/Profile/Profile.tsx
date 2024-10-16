import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useTheme } from "../../contexts/ThemeContext"
import Styles from "../../Styles"
import Colors from "../../constants/Colors"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { MainStackParamList } from "../../navigators/MainStack"
import Snackbar from "react-native-snackbar"
import { Fragment, useEffect, useState } from "react"
import { useFirebaseContext } from "../../firebase/FirebaseContext"




type User = {
    name: string,
    email: string
}
const Profile = () => {
    const { toggleTheme, colors } = useTheme();
    const [user, setUser] = useState<User | null>()
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const { isLoggedIn, setIsLoggedIn, firebase } = useFirebaseContext()
    const handleLogin = () => {
        navigation.navigate("SignIn")
    }
    const logout = () => {
        firebase.logout()
            .then(() => {
                setIsLoggedIn(false);
                setUser(null)
                Snackbar.show({
                    text: "Logged out successfully",
                    duration: Snackbar.LENGTH_SHORT
                })
            })
            .catch(_ => { })
    }

    const goToWishlist = () => {
        navigation.navigate("Watchlist")
    }
    useEffect(() => {
        firebase.getUser()
            .then(response => {
                if (response) {
                    const user: User = {
                        email: response.email!,
                        name: response.displayName!
                    }
                    setUser(user)
                }
            })
    }, [firebase, isLoggedIn])


    return (
        <View style={[Styles.container, colors]}>
            {
                user ?
                    <Fragment>
                        <View style={styles.card}>
                            <Text style={[{ color: colors.color }, styles.card_text]}>{user.name}</Text>
                        </View>
                        <TouchableOpacity onPress={goToWishlist}>
                            <View style={styles.card}>
                                <Text style={[{ color: colors.color }, styles.card_text]}>Wishlist</Text>
                            </View>
                        </TouchableOpacity>
                    </Fragment>
                    :
                    <TouchableOpacity onPress={handleLogin}>
                        <View style={styles.card}>
                            <Text style={[{ color: colors.color }, styles.card_text]}>Login</Text>
                        </View>
                    </TouchableOpacity>
            }
            <TouchableOpacity onPress={toggleTheme}>
                <View style={styles.card}>
                    <Text style={[{ color: colors.color }, styles.card_text]}>Change Theme</Text>
                </View>
            </TouchableOpacity>

            {user &&
                <TouchableOpacity onPress={logout}>
                    <View style={styles.card}>
                        <Text style={[styles.card_text, { color: 'red', fontWeight: 'bold' }]}>Logout</Text>
                    </View>
                </TouchableOpacity>}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 55,
        borderBottomWidth: 1,
        borderColor: Colors.gray,
        justifyContent: 'center'
    },
    card_text: {
        fontSize: 16
    }
})
export default Profile;