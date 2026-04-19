"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function NavBar(){
    const {user, logout} = useAuth();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    const handlelogout = async () => {
        const {error} = await logout();

        if (!error){
            setMenuOpen(false);
            router.push("/login")
        }
    }

    return (
        <header className="border-b border-white/10 bg-[#111111] text-white">
            <nav className="mx-auto w-full max-w-7xl px-6 md:px-10">
                <div className="flex h-12 items-center justify-between">
                    <div className="hidden items-center gap-5 md:flex">
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

                    <Link href="/dashboard" className="text-xs font-semibold uppercase tracking-[0.2em] text-white md:hidden">
                        ResumeIQ
                    </Link>

                    <div className="hidden items-center gap-3 md:flex">
                        <p className="text-xs text-white/70">
                            {user?.email || "User"}
                        </p>
                        <button
                            type="button"
                            onClick={handlelogout}
                            className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 transition-colors hover:bg-white/8 hover:text-white"
                        >
                            Log out
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white/80 transition-colors hover:bg-white/8 md:hidden"
                        aria-label="Toggle navigation menu"
                        aria-expanded={menuOpen}
                    >
                        <span className="flex flex-col gap-1">
                            <span className="block h-px w-4 bg-current" />
                            <span className="block h-px w-4 bg-current" />
                            <span className="block h-px w-4 bg-current" />
                        </span>
                    </button>
                </div>

                {menuOpen && (
                    <div className="border-t border-white/10 py-4 md:hidden">
                        <div className="flex flex-col gap-1 text-sm text-white/70">
                            <Link
                                href="/dashboard"
                                onClick={() => setMenuOpen(false)}
                                className="rounded-md px-3 py-2 transition-colors hover:bg-white/8 hover:text-white"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/evaluation/new"
                                onClick={() => setMenuOpen(false)}
                                className="rounded-md px-3 py-2 transition-colors hover:bg-white/8 hover:text-white"
                            >
                                Evaluation
                            </Link>
                            <Link
                                href="/history"
                                onClick={() => setMenuOpen(false)}
                                className="rounded-md px-3 py-2 transition-colors hover:bg-white/8 hover:text-white"
                            >
                                History
                            </Link>
                            <div className="mt-2 border-t border-white/10 pt-3">
                                <p className="px-3 text-xs text-white/50">
                                    {user?.email || "User"}
                                </p>
                                <button
                                    type="button"
                                    onClick={handlelogout}
                                    className="mt-3 w-full rounded-md border border-white/10 px-3 py-2 text-left text-sm text-white/70 transition-colors hover:bg-white/8 hover:text-white"
                                >
                                    Log out
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}
