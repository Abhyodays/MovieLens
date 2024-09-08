import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Colors from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const themes: Record<ThemeType, ThemeColors> = {
    dark: {
        backgroundColor: Colors.black,
        color: Colors.white
    },
    light: {
        backgroundColor: Colors.white,
        color: Colors.black
    }
}

type ThemeType = "dark" | "light"
type ThemeColors = {
    backgroundColor: string,
    color: string
}
type ThemeContextType = {
    theme: ThemeType,
    colors: ThemeColors,
    toggleTheme: () => void
}
const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("Component must be wrapped inside ThemeProvider to use Theme context.");
    }
    return context;
}

export const ThemeProvider = ({ children }: any) => {
    const [theme, setTheme] = useState<ThemeType>('dark');

    const toggleTheme = async () => {
        try {
            const nextTheme: ThemeType = theme === 'light' ? 'dark' : 'light';
            setTheme(nextTheme);
            await AsyncStorage.setItem('theme', nextTheme);
        } catch (error) {
            console.log("Failed to save theme:", error)
        }
    }
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem('theme');
                if (savedTheme) {
                    setTheme(savedTheme as ThemeType);
                } else {
                    await AsyncStorage.setItem('theme', 'dark');
                    setTheme('dark');
                }
            } catch (error) {
                console.log("Failed to load theme", error)
                setTheme('dark');
            }
        }
        loadTheme();
    }, [])

    return (
        <ThemeContext.Provider value={{ colors: themes[theme], theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}