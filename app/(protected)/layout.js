"use client"

import { useContext } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedLayout({ children }) {
    const {user, loading } = useAuth();

    if (loading){
        return <div>Loading...</div>
    }

    if(!user) {
        redirect("/login");
    }
    return <>{children}</>
}