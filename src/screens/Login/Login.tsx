import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, View } from "moti"
import { MainStackParamList } from "../../navigators/MainStack";
import { Controller, useForm } from "react-hook-form";
import { Button, TextInput } from "react-native-paper";
import Colors from "../../constants/Colors";
import { Linking, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { PointerType } from "react-native-gesture-handler";
import { useFirebaseContext } from "../../firebase/FirebaseContext";
import Icon from 'react-native-vector-icons/AntDesign'

type FormState = {
    email: string,
    password: string
}
const Login = () => {
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<FormState>({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const { setIsLoggedIn, firebase } = useFirebaseContext();
    const onSubmit = (data: FormState) => {
        try {
            firebase.login(data)
                .then((response) => {
                    if (response) {
                        setIsLoggedIn(true)
                        navigation.navigate("HomeTabs");
                    }
                })
                .catch(error => { throw error })
        } catch (error) {
            console.log(error)
        }
    }
    const handlePress = handleSubmit(onSubmit);
    const theme = useTheme();
    const goToSignUp = () => {
        navigation.navigate("SignUp")
    }
    const loginWithGoogle = async () => {
        try {
            const response = await firebase.loginWithGoogle();
            setIsLoggedIn(true);
            navigation.navigate("HomeTabs")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View style={[styles.container, { backgroundColor: theme.colors.backgroundColor }]}>
            <View style={styles.input}>
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Enter a valid email address',
                        },
                    }}
                    render={({ field: { onChange, value, onBlur } }) => (
                        <TextInput
                            label="Email"
                            mode="outlined"
                            value={value}
                            onChangeText={onChange}
                            activeOutlineColor={Colors.primary}
                            onBlur={onBlur}
                            keyboardType='email-address'
                        />
                    )}
                />
                {errors?.email && <Text style={{ color: 'red' }}>{errors.email?.message}</Text>}
            </View>

            <View style={styles.input}>
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters long',
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
                            message: 'Password must have 1 lowercase, 1 uppercase, 1 digit, and 1 special character',
                        },
                    }}
                    render={({ field: { onChange, value, onBlur } }) => (
                        <TextInput
                            label="Password"
                            mode="outlined"
                            value={value}
                            onChangeText={onChange}
                            activeOutlineColor={Colors.primary}
                            onBlur={onBlur}
                            secureTextEntry={true}
                        />
                    )}
                />
                {errors?.password && <Text style={{ color: 'red' }}>{errors.password?.message}</Text>}
            </View>

            <Button
                buttonColor={Colors.primary}
                textColor={Colors.white}
                mode="elevated"
                onPress={handlePress}
            >
                Login
            </Button>
            <TouchableOpacity onPress={goToSignUp}>
                <Text style={styles.text_link}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={loginWithGoogle}>
                <View style={styles.sigin_button}>
                    <Icon name="google" color={Colors.primary} size={30} />
                    <Text style={styles.icon_text}>Sign in with google</Text>
                </View>
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        gap: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    input: {
        maxWidth: 400,
        width: '80%',
    },
    text_link: {
        textDecorationLine: 'underline',
        textDecorationColor: Colors.primary,
        color: Colors.primary
    },
    icon_text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.primary
    },
    sigin_button: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 25,
        alignItems: 'center',
        gap: 10,
        paddingVertical: 7,
        paddingHorizontal: 10
    }
});
export default Login;