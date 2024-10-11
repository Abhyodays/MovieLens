import { Children, createContext, FC, PropsWithChildren, useContext, useState } from "react";
import Firebase from './service'
type FirebaseContextType = {
    isLoggedIn: boolean,
    setIsLoggedIn: (isLoggedIn: boolean) => void,
    firebase: Firebase
}
const FirebaseContext = createContext<FirebaseContextType>(
    {
        firebase: new Firebase(),
        isLoggedIn: false,
        setIsLoggedIn: (isLoggedIn: boolean) => { }
    }
)

export const useFirebaseContext = () => useContext(FirebaseContext);

export const FirebaseContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const defaultValues: FirebaseContextType = {
        firebase: new Firebase(),
        isLoggedIn,
        setIsLoggedIn
    }
    return (
        <FirebaseContext.Provider value={defaultValues}>
            {children}
        </FirebaseContext.Provider>
    )
}