"use client"
import SignupForm from "@/components/auth/signupForm"
import logo from "@/public/images/resumeiq-logo.png"
import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
         <main className="min-h-dvh overflow-hidden bg-black text-white">
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
                                    <h1 className="mb-1 text-xl font-semibold tracking-tight md:text-2xl">Lets get started</h1>
                                    <p className="mb-4 text-sm text-white/60">Create an new account</p>
                                    <SignupForm />
                                </div>
                                <div>
                    <p className="mt-4 text-center text-sm text-white/60">
                        Create an account?{" "}
                        <Link href="/login" className="text-white/60 underline underline-offset-2">
                            Sign in
                        </Link>
                    </p>
           </div>
                            </div>
                        </section>
                    </div>     
                </main>
    )
}