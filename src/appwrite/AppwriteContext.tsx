import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';
import Appwrite from '../appwrite/service'
type AppwriteContextType = {
    isLoggedIn: boolean,
    setIsLoggedIn: (isLoggedIn: boolean) => void
    appwrite: Appwrite
}

const AppwriteContext = createContext<AppwriteContextType>({
    isLoggedIn: false,
    setIsLoggedIn: (isLoggedIn: boolean) => { },
    appwrite: new Appwrite()
});

export const useAppwriteContext = () => useContext(AppwriteContext);

export const AppwriteContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const defaultValues = {
        isLoggedIn,
        setIsLoggedIn,
        appwrite: new Appwrite()
    }
    return (
        <AppwriteContext.Provider value={defaultValues} >
            {children}
        </AppwriteContext.Provider>
    )
}


