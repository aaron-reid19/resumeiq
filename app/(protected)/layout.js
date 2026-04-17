"use client"

import { useAuth } from "@/context/AuthContext";
import NavBar from "@/components/navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({ children }) {
    const router = useRouter();
    const {user, loading } = useAuth();

    useEffect (() => {
        if (!loading && !user){
            router.replace("/login")
        }
    }, [ loading, user, router ]);

    if (loading || !user){
        return <div>Loading...</div>
    }

    if(!user) {
        re("/login");
    }
    return (
        <div className="min-h-dvh bg-black text-white">
            <NavBar />
            <main className="mx-auto w-full max-w-7xl px-6 py-8 md:px-10">
                {children}
            </main>
        </div>
        
    )
}
