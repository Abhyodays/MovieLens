import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { TextInput, Button } from 'react-native-paper';
import Colors from '../../constants/Colors';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Snackbar from 'react-native-snackbar';
import { useAppwriteContext } from '../../appwrite/AppwriteContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../../navigators/MainStack';
import { useFirebaseContext } from '../../firebase/FirebaseContext';

type FormData = {
    name: string;
    email: string;
    password: string;
};

/**
 * 
 * @returns provides SignIn screen
 */
const SignUp = () => {
    const theme = useTheme();
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        defaultValues: {
            name: "",
            password: "",
            email: ""
        }
    });

    const { firebase, setIsLoggedIn } = useFirebaseContext();
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const onSubmit = async (data: FormData) => {
        try {
            firebase.createAccount(data)
                .then((response) => {
                    if (response) {
                        setIsLoggedIn(true);
                        navigation.navigate("HomeTabs")
                    }
                })
                .catch(_ => { })
        } catch (error) {

        }
    };

    const goToSignIn = () => {
        navigation.navigate("SignIn");
    }
    const handlePress = handleSubmit(onSubmit)
    return (
        <View style={[styles.container, { backgroundColor: theme.colors.backgroundColor }]}>
            <View style={styles.input}>
                <Controller
                    name="name"
                    control={control}
                    rules={{
                        required: 'Name is required',
                        minLength: {
                            value: 5,
                            message: 'Name must be at least 5 characters long'
                        }
                    }}
                    render={({ field: { onChange, value, onBlur } }) => (
                        <TextInput
                            label="Name"
                            mode="outlined"
                            value={value}
                            onChangeText={onChange}
                            activeOutlineColor={Colors.primary}
                            onBlur={onBlur}
                        />
                    )}
                />
                {errors?.name && <Text style={{ color: 'red' }}>{errors?.name?.message}</Text>}
            </View>
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
                Sign Up
            </Button>

            <TouchableOpacity onPress={goToSignIn}>
                <Text style={styles.text_link}>Already a user?</Text>
            </TouchableOpacity>
        </View >
    );
};

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
    }
});


export default SignUp;
