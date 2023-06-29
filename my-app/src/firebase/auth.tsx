"use client";

import { useContext, createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";

const AuthUserContext = createContext({
    authUser: {},
    isLoading: true
});


export default function useFirebaseAuth(){
    const [authUser, setAuthUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const clear = () => {
        setAuthUser({});
        setIsLoading(false);
    }

    const authStateChanged = async (user: any) => {
        setIsLoading(true);
        if(!user){
            clear();
            return;
        }
        setAuthUser({
            uid: user.uid,
            email: user.email,
            username: user.displayName
        })
        setIsLoading(false);
    }

    const signOut = () => {
        authSignOut(auth).then(() => clear())
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, authStateChanged);
        return () => unsubscribe();
    }, [])

    return {
        authUser,
        isLoading,
        setAuthUser,
        signOut
    }
}
export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
    const authorization = useFirebaseAuth();

    return(
        <AuthUserContext.Provider value={authorization}>
            {children}
        </AuthUserContext.Provider>
    );
}
export const useAuth = () => useContext(AuthUserContext);
