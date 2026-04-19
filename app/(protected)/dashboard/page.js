"use client"
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { getUserEvaluations } from "@/services/evaluation";

export default function Page(){

    const { user } = useAuth();

    const [evaluations, setEvaluations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadEvaluations() {
            if (!user?.uid) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");
                const data = await getUserEvaluations(user.uid);
                setEvaluations(data);
            }
            catch (error) {
                setError("Failed to load evaluations.");
            }
            finally {
                setLoading(false);
            }
        }
        loadEvaluations();
    }, [user]);

    const totalEvaluations = evaluations.length;

    const averageScore = evaluations.length > 0 ? Math.round(
        evaluations.reduce((sum, evaluation) => sum + (evaluation.score || 0), 0) / evaluations.length
    ): null;

    const latestScore = evaluations.length > 0 ? evaluations[0].score ?? "--" : null;

    if (loading) {
        return <div className="rounded-3xl border border-white/10 bg-[#111111] px-6 py-10 text-sm text-white/60">Loading dashboard...</div>;
    }
    if (error){
        return <div className="rounded-3xl border border-red-400/20 bg-[#111111] px-6 py-10 text-sm text-red-300">{error}</div>
    }


    return (
        <section className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">Welcome, {user?.displayName || user?.email || "User"}</h1>
                    <p className="mt-2 max-w-xl text-sm text-white/60">Track your resume performance and start a new evaluation.</p>
                </div>
                <Link
                    href="/evaluation/new"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-500 md:w-auto"
                >
                    New Evaluation
                </Link>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
               <div className="rounded-md border border-white/10 bg-[#111111] px-3.5 py-2.5">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">Total Evaluations</p>
                    <h2 className="mt-2 text-xl font-semibold text-white">{totalEvaluations}</h2>
               </div>
               <div className="rounded-md border border-white/10 bg-[#111111] px-3.5 py-2.5">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">Average Score</p>
                    <h2 className="mt-2 text-xl font-semibold text-white">{averageScore ?? "--"}</h2>
               </div>
               <div className="rounded-md border border-white/10 bg-[#111111] px-3.5 py-2.5">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">Latest Score</p>
                    <h2 className="mt-2 text-xl font-semibold text-white">{latestScore ?? "--"}</h2>
               </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#111111] p-6 md:p-7">
                {evaluations.length === 0 ? (
                    <div className="flex flex-col items-start gap-4">
                        <div>
                            <h3 className="text-xl font-semibold text-white">No evaluations yet</h3>
                            <p className="mt-2 text-sm text-white/60">Start your first resume evaluation to see results here.</p>
                        </div>
                        <Link
                            href="/evaluation/new"
                            className="inline-flex items-center justify-center rounded-[12px] border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                        >
                            Start Evaluation
                        </Link>
                    </div>
                ): (
                    <div>
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-white">Recent Evaluations</h3>
                            <p className="text-xs uppercase tracking-[0.18em] text-white/40">Latest 5</p>
                        </div>

                        {evaluations.slice(0, 5).map((evaluation) => (
                        <Link key={evaluation.id} href={`/evaluation/${evaluation.id}`} className="block">
                            <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-[#171717] px-4 py-4 transition-colors hover:bg-[#1d1d1d]">
                                <div>
                                    <p className="text-sm font-medium text-white">{evaluation.companyName || "Untitled Evaluation"}</p>
                                    <p className="mt-1 text-xs text-white/50">
                                        {evaluation.createdAt?.toDate
                                        ? evaluation.createdAt.toDate().toLocaleDateString()
                                        : "No date"}
                                    </p>
                                </div>
                                <p className="text-sm font-semibold text-white/80">{evaluation.score +"%"?? "--"}</p>
                            </div>
                        </Link>
                            ))}
                    </div>
            )}
            </div>
        </section> 
    );
}
