"use client"
import { useState } from "react";
import { login, loginWithGoogle, loginWithGithub } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function LoginForm(){
    const router = useRouter();

    const [ email, setEmail ] = useState("");
    const [password, setPassword ] = useState("");
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        

        const { user, error } = await login(email, password)
        if (error){
            setError(error);
            setLoading(false);
        }

        if (user){
            setError(null);
            setLoading(false);
            setEmail("");
            setPassword("");
            router.push("/dashboard")
        }
    }

    const handleGoogleLogin = async () => {
        setError(null)
        setLoading(true)

        const { user, error } = await loginWithGoogle();

        if (error){
            setError(error);
            setLoading(false);
            return;
        }

        if (user){
            setLoading(false);
            router.push("/dashboard")
        }
    }

    const handleGithubLogin = async () => {
        setError(null);
        setLoading(true);

        const { user, error } = await loginWithGithub();

        if (error) {
            setError(error);
            setLoading(false);
            return;
        }

        if (user) {
            setLoading(false);
            router.push("/dashboard");
        }
        
    }
    return(
        <div className="w-full">
           <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                <label htmlFor="login-email">Email</label>
                <input 
                className="rounded-[10px] border border-white/20 bg-[#1D1D1D] px-4 py-3 text-white outline-none"
                value={email}
                name="email"
                placeholder="example@example.com"
                id="login-email"
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                </div>

                <div className="flex flex-col gap-1">
                <label htmlFor="login-password">Password</label>
                <input 
                className="rounded-[10px] border border-white/20 bg-[#1D1D1D] px-4 py-3 text-white outline-none"
                value={password}
                name="password"
                placeholder="password"
                id="login-password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                />
                </div>
            </div>
            {error && (
                <div>{error}</div>
            )}
            
            <button 
                className="mt-4 flex w-full items-center justify-center rounded-[10px] bg-blue-600 px-4 py-3 text-center font-medium text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
                type="submit"
                disabled={loading}
            >
                {loading ? "Logging in" : "Log in"}
            </button>


           </form>
           
           <div className="mt-4 h-px w-full bg-white/10" />

           <div className="mt-4 flex flex-col gap-3">
                <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="flex w-full items-center justify-center rounded-[10px] border border-white/20 bg-[#1D1D1D] px-4 py-3 text-white transition-colors hover:bg-[#252525] disabled:cursor-not-allowed disabled:opacity-70"
                >
                    Continue with Google
                </button>

                <button
                type="button"
                onClick={handleGithubLogin}
                disabled={loading}
                className="flex w-full items-center justify-center rounded-[10px] border border-white/20 bg-[#1D1D1D] px-4 py-3 text-white transition-colors hover:bg-[#252525] disabled:cursor-not-allowed disabled:opacity-70"
                >
                    Continue with GitHub
                </button>
           </div>
           
        </div>
    )
}
