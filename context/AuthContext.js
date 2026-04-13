"use client"
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import { signup, login, loginWithGithub, loginWithGoogle, logout } from "@/firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }){
    const [ user, setUser] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return  () => unsubscribe()
    },[])

    return (
        <AuthContext.Provider value={{user, signup, login,loginWithGoogle, loginWithGithub,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext);
    if (context === undefined){
        throw new Error (
            "Context Error:  use auth must be used within auth provider"
        );
    }
    return context;
}