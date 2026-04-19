"use client"
import logo from "@/public/images/resumeiq-logo.png"
import LoginForm from "@/components/auth/loginFrom";
import Image from "next/image";
import Link from "next/link";


export default function Page(){


    return(
        <main className="min-h-dvh overflow-hidden bg-[#111111] text-white md:bg-black">
            <div className="flex min-h-dvh flex-col md:flex-row">
                <section className="flex w-full flex-col justify-start border-r border-white/10 bg-[#111111] px-8 py-6 md:w-[43.7%] md:px-12 md:py-5 md:flex-none lg:px-14">
                    <div className="mx-auto w-full max-w-sm md:pt-2">
                        <div className="flex items-center">
                            <Image 
                                src={logo}
                                alt="ResumeIQ logo"
                                width={150}
                                height={150}
                                className="h-auto w-28 object-contain md:w-32"
                            />
                        </div>
                        <div className="mt-6 w-full">
                            <h1 className="mb-1 text-xl font-semibold tracking-tight md:text-2xl">Welcome back</h1>
                            <p className="mb-4 text-sm text-white/60">Sign in to your account</p>
                            <LoginForm />
                        </div>
                        <div>
                    <p className="mt-4 text-center text-sm text-white/60">
                        Create an account?{" "}
                        <Link href="/signup" className="text-white/60 underline underline-offset-2">
                            Sign up
                        </Link>
                    </p>
           </div>
                    </div>
                </section>   
            </div>                
        </main>
    )
}
