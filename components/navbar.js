"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

import { useRouter } from "next/navigation";

export default function NavBar(){
    const {user, logout} = useAuth();
    const router = useRouter();

    const handlelogout = async () => {
        const {error} = await logout();

        if (!error){
            router.push("/login")
        }
    }

    return (
        <header className="border-b border-white/10 bg-[#111111] text-white">
            <nav className="mx-auto flex h-12 w-full max-w-7xl items-center justify-between px-6 md:px-10">
                <div className="flex items-center gap-5">
                    <Link href="/dashboard" className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
                        ResumeIQ
                    </Link>

                    <ul className="flex items-center gap-1 text-xs text-white/70">
                        <li>
                            <Link
                                href="/dashboard"
                                className="rounded-full px-3 py-1.5 transition-colors hover:bg-white/8 hover:text-white"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/evaluation/new"
                                className="rounded-full px-3 py-1.5 transition-colors hover:bg-white/8 hover:text-white"
                            >
                                Evaluation
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/history"
                                className="rounded-full px-3 py-1.5 transition-colors hover:bg-white/8 hover:text-white"
                            >
                                History
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center gap-3">
                <p className="text-xs text-white/70">
                    {user?.displayName || user?.email || "User"}
                </p>
                <button type="button" onClick={handlelogout}
                className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 transition-colors hover:bg-white/8 hover:text-white"
                >
                    Log out
                </button>
                </div>
                
            </nav>
        </header>
    )
}
